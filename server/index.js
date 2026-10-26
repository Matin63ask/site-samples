import { createServer } from 'node:http'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

/**
 * Minimal JSON API for the website's forms. The frontend posts to /api/... through
 * the Vite dev proxy, so the site keeps a single public origin.
 *
 * Submissions are appended to a JSON file inside the container's data volume.
 */
const PORT = Number(process.env.PORT || 4000)
const DATA_FILE = process.env.DATA_FILE || join('/data', 'submissions.json')
const MAX_BODY = 32 * 1024

const PHONE = /^(?:\+98|0098|0)?(?:9\d{9}|[1-8]\d{8,9})$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/

const emptyDb = () => ({ collaboration: [], newsletter: [] })

async function readDb() {
  try {
    const raw = await readFile(DATA_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    return { ...emptyDb(), ...parsed }
  } catch {
    return emptyDb()
  }
}

// Serialise writes so two concurrent submissions cannot overwrite each other.
let writeQueue = Promise.resolve()
function saveDb(db) {
  writeQueue = writeQueue.then(async () => {
    await mkdir(dirname(DATA_FILE), { recursive: true })
    await writeFile(DATA_FILE, JSON.stringify(db, null, 2), 'utf8')
  })
  return writeQueue
}

const latinDigits = (value) =>
  String(value ?? '')
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))

function validateCollaboration(body = {}) {
  const errors = {}
  const fullName = String(body.fullName ?? '').trim()
  const phone = latinDigits(body.phone).replace(/[\s-()]/g, '')
  const email = String(body.email ?? '').trim()
  const subject = String(body.subject ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (fullName.length < 3) errors.fullName = 'نام و نام خانوادگی را کامل وارد کنید.'
  if (!phone) errors.phone = 'شماره تماس را وارد کنید.'
  else if (!PHONE.test(phone)) errors.phone = 'شماره تماس معتبر نیست. نمونه: ۰۹۱۲۳۴۵۶۷۸۹'
  if (email && !EMAIL.test(email)) errors.email = 'نشانی ایمیل معتبر نیست.'
  if (message.length < 10) errors.message = 'متن درخواست را کامل‌تر بنویسید (حداقل ۱۰ نویسه).'

  return { errors, payload: { fullName, phone, email, subject, message } }
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(body),
  })
  res.end(body)
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0
    const chunks = []
    req.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY) {
        reject(Object.assign(new Error('حجم درخواست بیش از حد مجاز است.'), { status: 413 }))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => {
      if (!chunks.length) return resolve({})
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch {
        reject(Object.assign(new Error('قالب درخواست معتبر نیست.'), { status: 400 }))
      }
    })
    req.on('error', reject)
  })
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost')

  if (req.method === 'GET' && pathname === '/api/health') {
    sendJson(res, 200, { ok: true })
    return
  }

  if (req.method === 'POST' && pathname === '/api/collaboration') {
    try {
      const body = await readBody(req)
      const { errors, payload } = validateCollaboration(body)
      if (Object.keys(errors).length > 0) {
        sendJson(res, 422, { message: 'اطلاعات فرم کامل نیست.', errors })
        return
      }
      const db = await readDb()
      const record = { id: `c_${Date.now()}`, createdAt: new Date().toISOString(), ...payload }
      db.collaboration.push(record)
      await saveDb(db)
      sendJson(res, 201, { id: record.id })
    } catch (error) {
      sendJson(res, error.status || 500, { message: error.message || 'ثبت درخواست انجام نشد.' })
    }
    return
  }

  if (req.method === 'POST' && pathname === '/api/newsletter') {
    try {
      const body = await readBody(req)
      const email = String(body.email ?? '').trim()
      if (!EMAIL.test(email)) {
        sendJson(res, 422, { message: 'نشانی ایمیل معتبر نیست.', errors: { email: 'نشانی ایمیل معتبر نیست.' } })
        return
      }
      const db = await readDb()
      if (!db.newsletter.some((item) => item.email === email)) {
        db.newsletter.push({ email, createdAt: new Date().toISOString() })
        await saveDb(db)
      }
      sendJson(res, 201, { ok: true })
    } catch (error) {
      sendJson(res, error.status || 500, { message: error.message || 'ثبت عضویت انجام نشد.' })
    }
    return
  }

  sendJson(res, 404, { message: 'مسیر مورد نظر وجود ندارد.' })
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`API listening on http://0.0.0.0:${PORT}`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)))
}
