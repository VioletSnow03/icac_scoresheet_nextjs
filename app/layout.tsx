import { Inter } from 'next/font/google'
import { Style } from 'util'
import './global.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ICAC Scoresheet',
  description: 'Generated by create next app',
}

const appContainerStyle: any = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '100vw',
  alignItems: 'center',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={appContainerStyle}>
          {children}
        </div>
      </body>
    </html>
  )
}
