'use client'

import { usePathname } from 'next/navigation'

const WHATSAPP_NUMBER = '5491166049512'
const WHATSAPP_MESSAGE = 'Hola! Quiero saber más sobre Klia'

const ALLOWED_PATHS = [
  '/',
  '/producto',
  '/beneficios',
  '/casos',
  '/precios',
  '/faq',
  '/login',
  '/sobre-klia',
  '/privacidad',
  '/terminos',
]

export default function WhatsAppButton() {
  const pathname = usePathname()

  if (!ALLOWED_PATHS.includes(pathname)) return null

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,.25)',
        zIndex: 9999,
      }}
    >
      <svg width={30} height={30} viewBox="0 0 24 24" fill="#fff">
        <path d="M12 2C6.486 2 2 6.486 2 12c0 1.886.515 3.654 1.398 5.168L2.055 22l4.961-1.306A9.945 9.945 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 18.062a8.078 8.078 0 0 1-4.3-1.206l-.306-.188-3.164.832.836-3.08-.197-.318A8.098 8.098 0 0 1 3.937 12c0-4.44 3.623-8.062 8.063-8.062S20.063 7.56 20.063 12 16.44 20.062 12 20.062z" />
        <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-1.746-.802-2.885-2.262-3.146-2.649-.161-.236.001-.439.14-.639.133-.195.3-.498.448-.736.15-.238.203-.356.299-.597.095-.25.047-.36-.1-.515-.149-.149-.6-1.445-.822-1.986-.221-.54-.447-.467-.618-.475-.169-.008-.365-.009-.56-.009-.19 0-.5.072-.767.361-.263.295-1.003.982-1.003 2.394 0 1.411 1.026 2.769 1.169 2.962.142.191 1.954 2.989 4.749 4.072 2.793 1.081 2.793.72 3.297.675.503-.043 1.642-.671 1.871-1.317.231-.646.231-1.202.161-1.317-.067-.11-.253-.173-.541-.323z" />
      </svg>
    </a>
  )
}
