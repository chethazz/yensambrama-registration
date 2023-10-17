import Header from '@/components/global/Header'
import './globals.css'

export const metadata = {
  title: 'Yensambrama 2023',
  description: 'yensambrama 2023 registearation portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen  flex flex-col items-center">
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
