'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Radio, RadioGroup } from '@nextui-org/radio'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import TextInputField from '~/app/components/checkout/text-input-field'
import { api } from '~/trpc/react'
import useModal from '../shared/modal/use-modal'
import { formSchema, type FormFields } from './form-validation'
import OrderConfirmation from './order-confirmation'

export default function CheckoutForm() {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: 'United States',
      payment: 'credit-card',
    },
  })

  const router = useRouter()
  const apiUtils = api.useUtils()
  const confirmationModalId = 'order-confirmation'
  const modalProps = useModal(confirmationModalId, {
    onClose: () => {
      apiUtils.cart.getCart
        .invalidate()
        .then(() => router.replace('/'))
        .catch(console.error)
    },
  })

  const saveOrder = api.orders.saveCartAsOrder.useMutation()
  const [orderId, setOrderId] = useState<string>()
  const orderQuery = api.orders.getOrder.useQuery(
    { orderId: orderId! },
    {
      enabled: !!orderId,
    },
  )

  return (
    <>
      <form
        id="checkout-form"
        className="grid gap-8 rounded-lg bg-white p-6"
        onSubmit={handleSubmit(() => {
          saveOrder.mutate(undefined, {
            onError: console.error,
            onSuccess: (response) => {
              setOrderId(response.orderId)
              modalProps.toggle()
            },
          })
        })}
      >
        <h1 className="text-[1.75rem] font-bold uppercase leading-snug tracking-[1px]">
          Checkout
        </h1>
        <section
          aria-labelledby="billing-details-heading"
          className="grid gap-4"
        >
          <h2
            id="billing-details-heading"
            className="text-xs-plus font-bold uppercase leading-loose tracking-[1px] text-copper-canyon"
          >
            Billing Details
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInputField
              label="Name"
              error={errors.name?.message}
              {...register('name')}
            />
            <TextInputField
              label="Email"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <TextInputField
              label="Phone"
              type="tel"
              error={errors.phone?.message}
              {...register('phone')}
            />
          </div>
        </section>
        <section aria-labelledby="shipping-info-heading" className="grid gap-4">
          <h2
            id="shipping-info-heading"
            className="text-xs-plus font-bold uppercase leading-loose tracking-[1px] text-copper-canyon"
          >
            Shipping Info
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <TextInputField
              label="Your Address"
              classNames={{ base: 'md:col-span-2' }}
              error={errors.address?.message}
              {...register('address')}
            />
            <TextInputField
              label="ZIP Code"
              error={errors.zipCode?.message}
              {...register('zipCode')}
            />
            <TextInputField
              label="City"
              error={errors.city?.message}
              {...register('city')}
            />
            <TextInputField
              readOnly
              disabled
              label="Country"
              error={errors.country?.message}
              {...register('country')}
            />
          </div>
        </section>
        <section aria-labelledby="payment-info-heading" className="grid gap-4">
          <h2
            id="payment-info-heading"
            className="text-xs-plus font-bold uppercase leading-loose tracking-[1px] text-copper-canyon"
          >
            Payment Info
          </h2>
          <Controller
            name="payment"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                classNames={{
                  base: 'w-full h-fit',
                }}
              >
                <Radio
                  value="credit-card"
                  classNames={{
                    base: 'px-6 py-4 text-black/75 font-bold border rounded-lg max-w-full m-0',
                    wrapper: 'group-data-[selected=true]:border-copper-canyon',
                    control: 'bg-copper-canyon',
                  }}
                >
                  Credit Card
                </Radio>
                <Radio
                  value="paypal"
                  classNames={{
                    base: 'px-6 py-4 text-black/75 font-bold border rounded-lg max-w-full m-0',
                    wrapper: 'group-data-[selected=true]:border-copper-canyon',
                    control: 'bg-copper-canyon',
                  }}
                >
                  PayPal
                </Radio>
              </RadioGroup>
            )}
          />
        </section>
      </form>
      <OrderConfirmation
        {...modalProps}
        orderData={orderQuery.data}
        modalId={confirmationModalId}
      />
    </>
  )
}
