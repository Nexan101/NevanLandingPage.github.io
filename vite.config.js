import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import crypto from 'crypto'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const KEY_ID  = env.VITE_KALSHI_API_KEY_ID
  const KEY_B64 = env.VITE_KALSHI_PRIVATE_KEY_B64
  const PRIV_KEY = KEY_B64
    ? `-----BEGIN RSA PRIVATE KEY-----\n${KEY_B64.match(/.{1,64}/g).join('\n')}\n-----END RSA PRIVATE KEY-----`
    : null

  function makeKalshiHeaders(method, fullPath) {
    if (!KEY_ID || !PRIV_KEY) return {}
    const timestamp   = Date.now().toString()
    const pathNoQuery = fullPath.split('?')[0]
    const signer      = crypto.createSign('SHA256')
    signer.update(timestamp + method.toUpperCase() + pathNoQuery)
    const signature = signer.sign(
      { key: PRIV_KEY, padding: crypto.constants.RSA_PKCS1_PSS_PADDING, saltLength: 32 },
      'base64'
    )
    return {
      'KALSHI-ACCESS-KEY':       KEY_ID,
      'KALSHI-ACCESS-TIMESTAMP': timestamp,
      'KALSHI-ACCESS-SIGNATURE': signature,
    }
  }

  return {
    plugins: [react(), tailwindcss()],
    base: '/NevanLandingPage.github.io/',
    server: {
      proxy: {
        '/api/kalshi': {
          target:       'https://api.elections.kalshi.com',
          changeOrigin: true,
          rewrite:      path => path.replace(/^\/api\/kalshi/, '/trade-api/v2'),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              // Strip /api/kalshi prefix to get the real Kalshi path
              const kalshiPath = req.url.replace(/^\/api\/kalshi/, '/trade-api/v2')
              const headers    = makeKalshiHeaders(req.method, kalshiPath)
              for (const [k, v] of Object.entries(headers)) {
                proxyReq.setHeader(k, v)
              }
              proxyReq.setHeader('Content-Type', 'application/json')
            })
          },
        },
      },
    },
  }
})
