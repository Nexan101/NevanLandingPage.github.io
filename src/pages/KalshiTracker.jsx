import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, TrendingUp, TrendingDown, DollarSign,
  BarChart2, CheckCircle, XCircle, Activity, RefreshCw,
} from 'lucide-react'

// ─── Kalshi API (proxied through Vite dev server — signing happens server-side) ─
async function kalshiGet(path) {
  const res = await fetch('/api/kalshi' + path)
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`${res.status} ${res.statusText}${body ? ': ' + body : ''}`)
  }
  return res.json()
}

// Fetch all pages of a paginated endpoint using cursor
async function kalshiGetAll(path, key) {
  const results = []
  let cursor = ''
  do {
    const sep  = path.includes('?') ? '&' : '?'
    const url  = path + sep + 'limit=100' + (cursor ? `&cursor=${encodeURIComponent(cursor)}` : '')
    const data = await kalshiGet(url)
    results.push(...(data[key] ?? []))
    cursor = data.cursor ?? ''
  } while (cursor)
  return results
}
// ─────────────────────────────────────────────────────────────────────────────

const NO_KEY = false

function StatCard({ label, value, sub, icon: Icon, accent, loading }) {
  const cls = {
    indigo: { wrap: 'text-[#6366f1] bg-indigo-50',   val: 'text-[#18181b]' },
    green:  { wrap: 'text-emerald-600 bg-emerald-50', val: 'text-emerald-600' },
    red:    { wrap: 'text-rose-500 bg-rose-50',       val: 'text-rose-500' },
    amber:  { wrap: 'text-amber-600 bg-amber-50',     val: 'text-[#18181b]' },
  }[accent]

  return (
    <div className="rounded-2xl border border-[#e4e4e7] bg-white p-6 flex flex-col gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cls.wrap}`}>
        <Icon size={20} />
      </div>
      <div>
        {loading
          ? <div className="h-7 w-24 bg-[#f4f4f5] rounded-lg animate-pulse mb-1" />
          : <p className={`text-2xl font-bold tabular-nums ${cls.val}`}>{value}</p>}
        <p className="text-sm text-[#71717a] mt-0.5">{label}</p>
        {sub && !loading && <p className="text-xs text-[#a1a1aa] mt-1">{sub}</p>}
      </div>
    </div>
  )
}

// Ghost curve for when no trade data exists yet
const GHOST = '5,32 15,28 25,22 35,26 45,18 55,13 65,16 75,9 95,7'

function PnlChart({ pnlPoints, loading }) {
  const hasData = pnlPoints.length > 1

  // Scale pnlPoints (cumulative $ values) to SVG coords
  let svgPts = GHOST
  if (hasData) {
    const vals = pnlPoints.map(p => p.cum)
    const minV = Math.min(...vals)
    const maxV = Math.max(...vals)
    const range = maxV - minV || 1
    svgPts = pnlPoints.map((p, i) => {
      const x = 5 + (i / (pnlPoints.length - 1)) * 90
      const y = 35 - ((p.cum - minV) / range) * 28
      return `${x.toFixed(1)},${y.toFixed(1)}`
    }).join(' ')
  }

  return (
    <div className="rounded-2xl border border-[#e4e4e7] bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-[#18181b]">P&amp;L Over Time</h3>
          <p className="text-xs text-[#a1a1aa] mt-0.5">Cumulative profit / loss across trades</p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#f4f4f5] text-[#71717a] text-xs font-medium">All time</span>
      </div>

      <div className="relative h-52 select-none">
        <div className="absolute left-0 inset-y-2 flex flex-col justify-between text-[10px] text-[#d4d4d8] w-8 pointer-events-none">
          <span>High</span><span></span><span>$0</span><span>Low</span>
        </div>
        <div className="absolute left-8 right-0 inset-y-0 flex flex-col justify-between pointer-events-none">
          {[0,1,2,3].map(i => <div key={i} className="border-t border-dashed border-[#f0f0f0]" />)}
        </div>
        <svg
          className={`absolute left-8 right-0 inset-y-0 w-[calc(100%-2rem)] h-full transition-opacity ${!hasData ? 'opacity-15' : ''}`}
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`5,40 ${svgPts} 95,40`} fill="url(#pnlGrad)" />
          <polyline points={svgPts} fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {!hasData && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <BarChart2 size={22} className="text-[#d4d4d8]" />
            <p className="text-sm font-medium text-[#a1a1aa]">No closed trades yet</p>
            <p className="text-xs text-[#c4c4c8]">Your P&amp;L curve will appear here</p>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-[#e4e4e7] border-t-[#6366f1] rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}

function TradesTable({ trades, loading }) {
  return (
    <div className="rounded-2xl border border-[#e4e4e7] bg-white overflow-hidden">
      <div className="px-6 py-5 border-b border-[#f4f4f5]">
        <h3 className="font-semibold text-[#18181b]">Recent Fills</h3>
        <p className="text-xs text-[#a1a1aa] mt-0.5">Your 10 most recent executions</p>
      </div>

      {loading ? (
        <div className="p-6 flex flex-col gap-3">
          {[1,2,3].map(i => <div key={i} className="h-10 bg-[#f4f4f5] rounded-lg animate-pulse" />)}
        </div>
      ) : trades.length === 0 ? (
        <div className="py-16 flex flex-col items-center gap-3 text-center px-6">
          <Activity size={26} className="text-[#d4d4d8]" />
          <p className="text-sm font-medium text-[#a1a1aa]">No fills yet</p>
          <p className="text-xs text-[#c4c4c8] max-w-xs">Your executed Kalshi orders will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-[#a1a1aa] font-medium border-b border-[#f4f4f5] bg-[#fafafa]">
                <th className="px-6 py-3">Market</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Side</th>
                <th className="px-4 py-3">Contracts</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Fee</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((t, i) => (
                <tr key={i} className="border-b border-[#f4f4f5] last:border-0 hover:bg-[#fafafa] transition-colors">
                  <td className="px-6 py-3.5 font-mono text-xs text-[#52525b] max-w-[200px] truncate">{t.ticker}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${t.action === 'buy' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
                      {t.action.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${t.side === 'yes' ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'}`}>
                      {t.side.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-[#52525b] tabular-nums">{parseFloat(t.count).toFixed(0)}</td>
                  <td className="px-4 py-3.5 text-[#52525b] tabular-nums">{t.price}</td>
                  <td className="px-4 py-3.5 text-rose-500 tabular-nums text-xs">-${parseFloat(t.fee).toFixed(3)}</td>
                  <td className="px-4 py-3.5 text-[#a1a1aa] text-xs whitespace-nowrap">{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function KalshiTracker() {
  const navigate = useNavigate()

  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [balance,   setBalance]   = useState(null)
  const [trades,    setTrades]    = useState([])
  const [wins,      setWins]      = useState(0)
  const [losses,    setLosses]    = useState(0)
  const [totalPnl,  setTotalPnl]  = useState(0)
  const [pnlPoints, setPnlPoints] = useState([])

  async function fetchData() {
    if (NO_KEY) { setLoading(false); return }
    setLoading(true)
    setError(null)
    try {
      const [balRes, fillsRes, mktPos] = await Promise.all([
        kalshiGet('/portfolio/balance'),
        kalshiGet('/portfolio/fills?limit=10'),
        kalshiGetAll('/portfolio/positions', 'market_positions'),
      ])
      const fills = fillsRes.fills ?? []

      // Balance (cents → dollars)
      setBalance((balRes.balance ?? 0) / 100)

      // Fills → trade rows (already the full array)
      setTrades(fills.slice(0, 10).map(f => ({
        ticker: f.market_ticker ?? f.ticker ?? '—',
        action: f.action,
        side:   f.side,
        count:  f.count_fp ?? '0',
        price:  f.side === 'yes' ? `${f.yes_price_dollars}` : `${f.no_price_dollars}`,
        fee:    f.fee_cost ?? '0',
        time:   new Date(f.created_time).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      })))

      // Positions → P&L, wins, losses (BTC 15M only)
      const btcPos = mktPos.filter(p => p.ticker?.startsWith('KXBTC15M'))
      let pnl = 0, w = 0, l = 0, cumPts = []
      let cum = 0
      for (const p of btcPos) {
        const r = parseFloat(p.realized_pnl_dollars ?? 0)
        pnl += r
        cum += r
        cumPts.push({ cum })
        if (r > 0) w++
        else if (r < 0) l++
      }
      setTotalPnl(pnl)
      setWins(w)
      setLosses(l)
      setPnlPoints(cumPts)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const winRate = wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0

  return (
    <div className="min-h-screen w-full bg-[#fafafa]">
      {/* Header */}
      <header className="w-full border-b border-[#e4e4e7] bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full max-w-5xl mx-auto px-6 h-14 flex items-center gap-3">
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-sm text-[#71717a] hover:text-[#18181b] transition-colors">
            <ArrowLeft size={15} /> Back
          </button>
          <div className="w-px h-4 bg-[#e4e4e7]" />
          <span className="font-semibold text-sm text-[#18181b]">Nevan&apos;s Kalshi Tracker</span>
          {NO_KEY
            ? <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wide">API key needed</span>
            : error
            ? <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold uppercase tracking-wide">Error</span>
            : <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">Live</span>
          }
          {!NO_KEY && (
            <button onClick={fetchData} className="ml-auto flex items-center gap-1.5 text-xs text-[#71717a] hover:text-[#18181b] transition-colors">
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col gap-6">
        {/* Title */}
        <div className="text-center pb-4">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6366f1] mb-2">Prediction Market Analytics</p>
          <h1 className="text-4xl font-bold tracking-tight text-[#18181b]">Kalshi Portfolio Tracker</h1>
          <p className="mt-3 text-[#71717a] max-w-md mx-auto text-sm leading-relaxed">
            Live account balance, wins &amp; losses, P&amp;L over time, and every trade — powered by the Kalshi API.
          </p>
          {error && (
            <p className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
              {error}
            </p>
          )}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Account Balance" value={balance != null ? `$${balance.toFixed(2)}` : '—'} sub="Available to trade"    icon={DollarSign}                              accent="indigo" loading={loading} />
          <StatCard label="BTC 15M P&L"      value={`${totalPnl >= 0 ? '+' : ''}$${Math.abs(totalPnl).toFixed(2)}`} sub="Realized, all time"      icon={totalPnl >= 0 ? TrendingUp : TrendingDown} accent={totalPnl >= 0 ? 'green' : 'red'} loading={loading} />
          <StatCard label="Wins / Losses"   value={`${wins} / ${losses}`}                              sub={`${winRate}% win rate · BTC 15M`} icon={winRate >= 50 ? CheckCircle : XCircle}   accent={winRate >= 50 ? 'green' : 'red'} loading={loading} />
          <StatCard label="BTC 15M Trades"  value={wins + losses}                                      sub="Closed positions"                 icon={BarChart2}                               accent="amber"  loading={loading} />
        </div>

        {/* P&L chart */}
        <PnlChart pnlPoints={pnlPoints} loading={loading} />

        {/* Trades table */}
        <TradesTable trades={trades} loading={loading} />
      </div>
    </div>
  )
}
