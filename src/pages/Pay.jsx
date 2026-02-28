import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react'
import { personal } from '../data/content'

const presets = [50, 100, 250, 500]

function StripeWordmark() {
  return (
    <svg viewBox="0 0 60 25" className="h-5 inline-block" aria-label="Stripe">
      <path
        d="M59.64 14.28c0-4.23-2.05-7.57-5.97-7.57-3.94 0-6.33 3.34-6.33 7.54 0 4.97 2.81 7.49 6.85 7.49 1.97 0 3.46-.45 4.59-1.07v-3.3c-1.13.57-2.42.9-4.07.9-1.61 0-3.04-.57-3.22-2.53h8.12c0-.22.03-.87.03-1.46zm-8.18-1.57c0-1.88 1.15-2.66 2.19-2.66 1.01 0 2.09.78 2.09 2.66h-4.28zM37.96 6.71c-1.62 0-2.65.76-3.23 1.29l-.21-1.02h-3.63v19.1l4.12-.88.01-4.63c.6.43 1.48.96 2.93.96 2.96 0 5.66-2.38 5.66-7.62-.01-4.8-2.74-7.2-5.65-7.2zm-.99 11.07c-.97 0-1.55-.35-1.95-.78l-.02-6.16c.43-.48 1.02-.81 1.97-.81 1.51 0 2.55 1.7 2.55 3.87 0 2.21-1.02 3.88-2.55 3.88zM27.2 5.54l4.13-.89V1.06l-4.13.88v3.6zM27.2 6.98h4.13v14.7H27.2V6.98zM22.22 8.14l-.26-1.16h-3.56v14.7h4.12v-9.96c.97-1.27 2.62-1.04 3.13-.87V6.98c-.53-.19-2.46-.53-3.43 1.16zM14.7 3.76l-4.02.85-.02 13.1c0 2.42 1.82 4.2 4.24 4.2 1.34 0 2.32-.25 2.86-.54v-3.35c-.52.21-3.08.96-3.08-1.44V10.5h3.08V6.98h-3.08l.02-3.22zM4.25 10.63c0-.64.53-.89 1.4-.89 1.25 0 2.83.38 4.08 1.05V7.29c-1.37-.54-2.72-.76-4.08-.76C2.13 6.53 0 8.1 0 10.79c0 4.18 5.75 3.51 5.75 5.31 0 .76-.66 1.01-1.58 1.01-1.36 0-3.1-.56-4.48-1.31v3.55c1.52.66 3.06.93 4.48.93 3.42 0 5.77-1.69 5.77-4.41-.01-4.51-5.69-3.71-5.69-5.24z"
        fill="#635BFF"
      />
    </svg>
  )
}

export default function Pay() {
  const [amount, setAmount] = useState('')
  const [custom, setCustom] = useState(false)
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedAmount = parseFloat(amount)

  const handlePreset = (val) => {
    setAmount(String(val))
    setCustom(false)
    setError('')
  }

  const handlePay = async () => {
    setError('')
    if (!selectedAmount || selectedAmount < 1) {
      setError('Please enter an amount of at least $1.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3001/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: selectedAmount, description: description || `Payment to ${personal.name}` }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      window.location.href = data.url
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#71717a] hover:text-[#18181b] transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          Back to portfolio
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#e4e4e7] shadow-sm p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest mb-1">Secure Payment</p>
              <h1 className="text-2xl font-bold text-[#18181b] tracking-tight">Pay {personal.name}</h1>
            </div>
            <StripeWordmark />
          </div>

          <p className="text-[#71717a] text-sm mb-7">
            Select an amount or enter a custom value to send a payment securely via Stripe.
          </p>

          {/* Preset amounts */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => handlePreset(p)}
                className={`py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                  amount === String(p) && !custom
                    ? 'bg-[#6366f1] border-[#6366f1] text-white shadow-sm'
                    : 'bg-white border-[#e4e4e7] text-[#18181b] hover:border-[#6366f1] hover:text-[#6366f1]'
                }`}
              >
                ${p}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="mb-4">
            {!custom ? (
              <button
                onClick={() => { setCustom(true); setAmount('') }}
                className="w-full py-2.5 rounded-lg border border-dashed border-[#d4d4d8] text-sm text-[#71717a] hover:border-[#6366f1] hover:text-[#6366f1] transition-all"
              >
                + Custom amount
              </button>
            ) : (
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717a] text-sm font-medium">$</span>
                <input
                  type="number"
                  min="1"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setError('') }}
                  className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-[#6366f1] ring-2 ring-[#eef2ff] text-[#18181b] text-sm focus:outline-none"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* Note / description */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Note (optional — e.g. project name)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-[#e4e4e7] text-[#18181b] text-sm placeholder-[#d4d4d8] focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#eef2ff] transition-all"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-50 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Redirecting to Stripe…
              </span>
            ) : (
              <>
                <Lock size={14} />
                Pay {selectedAmount >= 1 ? `$${selectedAmount.toFixed(2)}` : ''} with Stripe
              </>
            )}
          </button>

          {/* Trust badge */}
          <p className="text-center text-[#a1a1aa] text-xs mt-4 flex items-center justify-center gap-1.5">
            <Lock size={11} />
            Payments are encrypted & processed by Stripe
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// ── Success page ──────────────────────────────────────────────────────────────
export function PaySuccess() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl border border-[#e4e4e7] shadow-sm p-10 max-w-sm w-full text-center"
      >
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={28} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#18181b] mb-2">Payment Received!</h2>
        <p className="text-[#71717a] text-sm mb-7">
          Thank you — your payment was processed successfully. I&apos;ll be in touch shortly.
        </p>
        <Link to="/" className="btn-primary inline-flex">
          Back to portfolio
        </Link>
      </motion.div>
    </div>
  )
}
