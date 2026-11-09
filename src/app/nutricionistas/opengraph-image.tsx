import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const runtime = 'nodejs'
export const alt = 'Klia para nutricionistas — Planes alimentarios, antropometría y agenda'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const [serifItalic, interBold, interMedium, logoPng] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/nutricionistas/fonts/InstrumentSerif-Italic.woff')),
    readFile(join(process.cwd(), 'src/app/nutricionistas/fonts/Inter-Bold.woff')),
    readFile(join(process.cwd(), 'src/app/nutricionistas/fonts/Inter-Medium.woff')),
    readFile(join(process.cwd(), 'public/klia-logo.png')),
  ])
  const logoSrc = `data:image/png;base64,${logoPng.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#F7F8FB',
          padding: '80px 88px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={176} height={60} alt="" style={{ marginBottom: 56 }} />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: 68,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#0E1430',
          }}
        >
          <span style={{ marginRight: 18 }}>Klia para</span>
          <span style={{ fontFamily: 'Instrument Serif', fontStyle: 'italic', fontWeight: 400, fontSize: 76, color: '#3F519E' }}>
            nutricionistas
          </span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: 32,
            color: '#5A607A',
          }}
        >
          Planes alimentarios, antropometría y agenda
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
        { name: 'Inter', data: interMedium, weight: 500, style: 'normal' },
        { name: 'Instrument Serif', data: serifItalic, weight: 400, style: 'italic' },
      ],
    }
  )
}
