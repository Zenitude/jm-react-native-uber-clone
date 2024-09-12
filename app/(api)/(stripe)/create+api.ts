/* eslint-disable prettier/prettier */
import { Stripe } from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request, response: Response) {
  const body = await request.json()
  const { name, email, amount } = body
  if(!name || !email || !amount) {
    return new Response(
      JSON.stringify({
        error: "Please enter a valid email address", 
        status: 400
      })
    )
  }

  let customer

  const existingCustomer = await stripe.customers.list({email})

  if(existingCustomer.data.length > 0) {
    customer = existingCustomer.data[0]
  } else {
    const newCustomer = await stripe.customers.create({
      name,
      email,
    })

    customer = newCustomer
  }
}

const express = require("express")
const app = express()

app.set("trust proxy", true)
app.use(express.json())

app.post("/create-intent", async (req: Request, res: Response) => {
	try {
		const args = {
			amount: 1099,
			currency: "usd",
			automatic_payment_methods: { enabled: true },
		}

		const intent = await stripe.paymentIntents.create(args)

		res.json({
			client_secret: intent.client_secret,
		})
	} catch (err) {
		res.status(err.statusCode).json({ error: err.message })
	}
})

app.listen(3000, () => {
	console.log("Running on port 3000")
})
