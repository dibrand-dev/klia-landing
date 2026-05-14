'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Menu, X } from '@/components/ui/Icons'

const links = [
  { href: '#producto',   label: 'Producto' },
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#casos',      label: 'Casos de uso' },
  { href: '/precios',    label: 'Precios' },
  { href: '#faq',        label: 'FAQ' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-line py-3 shadow-sm-klia'
          : 'py-4',
      ].join(' ')}
    >
      <div className="max-w-container mx-auto px-7 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" aria-label="Klia" className="flex-shrink-0">
          <Image
            src="/klia-logo.png"
            alt="Klia"
            width={235}
            height={80}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex gap-7 items-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-2 hover:text-klia transition-colors relative group"
            >
              {l.label}
              <span className="absolute left-0 right-0 -bottom-1.5 h-0.5 bg-klia scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3.5">
          <a
            href="https://app.klia.com.ar/login"
            className="hidden md:block text-sm font-medium text-ink-2 hover:text-klia transition-colors"
          >
            Ingresar
          </a>
          <a
            href="https://app.klia.com.ar/registro"
            className="btn btn-accent btn-sm"
          >
            Probar gratis <ArrowRight size={14} />
          </a>

          {/* Mobile burger */}
          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-bg-alt transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-line px-7 pt-4 pb-6 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-3 text-base font-medium border-b border-line-2 text-ink-2"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <a
              href="https://app.klia.com.ar/login"
              className="btn btn-ghost text-center justify-center"
              onClick={() => setOpen(false)}
            >
              Ingresar
            </a>
            <a
              href="https://app.klia.com.ar/registro"
              className="btn btn-accent text-center justify-center"
              onClick={() => setOpen(false)}
            >
              Probar gratis <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
