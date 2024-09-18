/* eslint-disable prettier/prettier */
import { StripeProvider } from "@stripe/stripe-react-native"

export default function Stripe({ children }: { children: React.ReactElement }) {

	return (
		<StripeProvider
			publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
			merchantIdentifier="merchant.uber.com" // required for Apple Pay
			urlScheme="myapp" // required for 3D Secure and bank redirects
		>
			{children}
		</StripeProvider>
	)
}
