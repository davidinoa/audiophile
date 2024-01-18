import Button from './components/shared/button'

export default function NotFound() {
  return (
    <main className="content-grid | place-items-center text-pretty bg-white py-24 sm:py-32">
      <div className="min-h-[23rem] text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button href="/">Go back home</Button>
        </div>
      </div>
    </main>
  )
}
