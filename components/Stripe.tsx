/* eslint-disable prettier/prettier */
import { StripeProvider } from "@stripe/stripe-react-native"

export default function Stripe({ children }: { children: React.ReactElement }) {

	return (
		<StripeProvider
			publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
			merchantIdentifier="merchant.uber.com"
			urlScheme="myapp" 
		>
			{children}
		</StripeProvider>
	)
}
