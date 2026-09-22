import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { INSTAGRAM_URL, SITE } from '../config/site'
import BookButton from './BookButton.tsx'

const NAV = [
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
]

function Wordmark() {
  const [main, suffix] = SITE.businessName.split(' & ')
  return (
    <>
      {main}
      {suffix && <span className="text-clay"> &amp; {suffix}</span>}
    </>
  )
}

export default function Layout() {
  const { pathname, hash } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-clay ${isActive ? 'text-clay' : 'text-espresso'}`

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-edge bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="font-display text-2xl">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/book"
              className="rounded-full bg-clay px-5 py-2 text-sm font-semibold text-linen transition-colors hover:bg-clay-hover"
            >
              Book
            </Link>
          </nav>

          <button
            type="button"
            className="p-2 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-nav" className="flex flex-col gap-4 border-t border-edge px-4 py-5 md:hidden" aria-label="Main">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
            <Link to="/book" className="text-sm font-semibold text-clay">
              Book an appointment →
            </Link>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-edge bg-sand">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl">
              <Wordmark />
            </p>
            <p className="mt-2 max-w-xs text-sm text-mocha">{SITE.tagline}</p>
            {SITE.area && <p className="mt-1 text-sm text-mocha">{SITE.area}</p>}
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <BookButton />
            <div className="flex gap-5 text-sm">
              {INSTAGRAM_URL && (
                <a href={INSTAGRAM_URL} className="hover:text-clay" rel="noopener" target="_blank">
                  Instagram
                </a>
              )}
              {SITE.email && (
                <a href={`mailto:${SITE.email}`} className="hover:text-clay">
                  Email
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl justify-between px-4 pb-6 text-xs text-mocha sm:px-6">
          <span>
            © {new Date().getFullYear()} {SITE.businessName} · v{__APP_VERSION__}
          </span>
          <a href={SITE.builderUrl} className="hover:text-clay" rel="noopener" target="_blank">
            Site by {SITE.builderName}
          </a>
        </div>
      </footer>
    </div>
  )
}
