'use client'

import { useEffect, useState } from 'react'
import WbForm, { type WbFormDone } from '../WbForm'
import WbSuccess from './WbSuccess'
import { WbStatePanel } from '../wb-pieces'
import { computeWebinarStatus, type WebinarStatus, type WebinarTiming } from '@/lib/webinars/utils'

export default function WebinarDetailClient({ slug, timing, initialStatus }: {
  slug: string
  timing: WebinarTiming
  initialStatus: WebinarStatus
}) {
  const [status, setStatus] = useState<WebinarStatus>(initialStatus)
  const [done, setDone] = useState<WbFormDone | null>(null)

  useEffect(() => {
    const fresh = computeWebinarStatus(timing)
    if (fresh !== status) setStatus(fresh)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status !== 'open') {
    return <WbStatePanel kind={status === 'closed' ? 'closed' : 'ended'} />
  }

  if (done) {
    return <WbSuccess webinar={{ slug, titulo: done.webinar.titulo, fecha_inicio: done.webinar.fecha_inicio, duracion_min: done.webinar.duracion_min }} meetUrl={done.meetUrl} email={done.email} already={done.already} />
  }

  return (
    <WbForm
      slug={slug}
      onDone={setDone}
      onClosedOrEnded={(kind) => setStatus(kind === 'finalizado' ? 'ended' : 'closed')}
    />
  )
}
