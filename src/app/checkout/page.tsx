'use client'

import BackButton from '../components/back-button'
import CheckoutForm from '../components/checkout/checkout-form'
import OrderSummary from '../components/checkout/order-summary'

export default function Page() {
  return (
    <main className="content-grid | bg-snow-drift">
      <div className="grid gap-6 py-4 md:py-8 lg:gap-10 lg:py-20">
        <BackButton />
        <div className="grid content-start gap-10 lg:grid-cols-[1fr_auto]">
          <CheckoutForm />
          <OrderSummary />
        </div>
      </div>
    </main>
  )
}
