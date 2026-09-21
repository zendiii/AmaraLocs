import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center sm:px-6">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 text-4xl">This page took a day off.</h1>
      <Link to="/" className="mt-8 inline-block font-semibold text-clay hover:text-clay-hover">
        Back home →
      </Link>
    </div>
  )
}
