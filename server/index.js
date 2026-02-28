require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Stripe = require('stripe')

const app = express()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const PORT = process.env.PORT || 3001
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(cors({ origin: CLIENT_URL }))
app.use(express.json())

// ── POST /api/create-checkout-session ──────────────────────────────────────
// Body: { amount: number (in dollars), description: string }
app.post('/api/create-checkout-session', async (req, res) => {
  const { amount, description } = req.body

  if (!amount || isNaN(amount) || amount < 1) {
    return res.status(400).json({ error: 'Invalid amount.' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: description || 'Payment to Nevan',
              description: 'Freelance / project payment',
            },
            unit_amount: Math.round(amount * 100), // cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${CLIENT_URL}/pay/success`,
      cancel_url:  `${CLIENT_URL}/pay`,
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
