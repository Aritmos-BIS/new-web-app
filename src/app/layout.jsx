// import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aritmos',
  description: 'Creates by Team Aritmos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
            <meta charSet="UTF-8"></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
         </head>
                <body style={{backgroundColor:'#10002B'}}>
                <header>
                <Navbar/>
                </header>
                {children}     
                </body>
    </html>
  )
}
