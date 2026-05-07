/**
 * Quick Kalshi API test — run with: node test-kalshi.mjs
 */
import crypto from 'crypto'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const raw   = readFileSync(join(__dir, '.env'), 'utf8')

const KEY_ID  = raw.match(/^VITE_KALSHI_API_KEY_ID=(.+)$/m)?.[1]?.trim()
const KEY_B64 = raw.match(/^VITE_KALSHI_PRIVATE_KEY_B64=(.+)$/m)?.[1]?.trim()

const BASE_URL = 'https://api.elections.kalshi.com/trade-api/v2'

if (!KEY_ID || KEY_ID === 'your_api_key_id_here') {
  console.error('❌  Fill in VITE_KALSHI_API_KEY_ID in .env first.')
  process.exit(1)
}
if (!KEY_B64) {
  console.error('❌  Missing VITE_KALSHI_PRIVATE_KEY_B64 in .env.')
  process.exit(1)
}

// Reconstruct PEM from base64
const PRIV_KEY = `-----BEGIN RSA PRIVATE KEY-----\n${KEY_B64.match(/.{1,64}/g).join('\n')}\n-----END RSA PRIVATE KEY-----`

function makeHeaders(method, path) {
  const timestamp   = Date.now().toString()
  const pathNoQuery = path.split('?')[0]
  const message     = timestamp + method.toUpperCase() + pathNoQuery
  const signer      = crypto.createSign('SHA256')
  signer.update(message)
  const signature = signer.sign(
    { key: PRIV_KEY, padding: crypto.constants.RSA_PKCS1_PSS_PADDING, saltLength: 32 },
    'base64'
  )
  return {
    'Content-Type':            'application/json',
    'KALSHI-ACCESS-KEY':       KEY_ID,
    'KALSHI-ACCESS-TIMESTAMP': timestamp,
    'KALSHI-ACCESS-SIGNATURE': signature,
  }
}

async function get(path) {
  const res = await fetch(BASE_URL + path, { headers: makeHeaders('GET', '/trade-api/v2' + path) })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`)
  return res.json()
}

console.log('🔑  Key ID:', KEY_ID)
console.log('Testing Kalshi API...\n')

try {
  const balance = await get('/portfolio/balance')
  console.log('✅  Balance:', JSON.stringify(balance, null, 2))

  const fills = await get('/portfolio/fills?limit=5')
  console.log('\n✅  Last 5 fills:', JSON.stringify(fills, null, 2))

  const positions = await get('/portfolio/positions?limit=20')
  console.log('\n✅  Positions:', JSON.stringify(positions, null, 2))
} catch (e) {
  console.error('❌  API error:', e.message)
}
