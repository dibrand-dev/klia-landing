'use client'

import { useEffect, useState } from 'react'
import { track } from '@/lib/analytics'
import { ArrowRight } from '@/components/ui/Icons'

const BASE_URL = 'https://app.klia.com.ar/registro'

export default function NutriCta({ source, className, children }: {
  source: string
  className: string
  children: React.ReactNode
}) {
  const [href, setHref] = useState(BASE_URL)

  useEffect(() => {
    const qs = window.location.search
    if (qs) setHref(`${BASE_URL}${qs}`)
  }, [])

  return (
    <a
      href={href}
      className={className}
      onClick={() => track('cta_click', { cta_source: 'landing_nutricionistas', cta_location: source })}
    >
      {children} <ArrowRight size={16} />
    </a>
  )
}
