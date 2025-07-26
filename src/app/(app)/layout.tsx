import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SignOut } from '@/components/sign-out-button'
import { Header } from '@/components/header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  console.log(session);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex justify-center`}
      >
        <div className="w-full max-w-4xl px-4">
          <Header
            user={{
              name: session.user?.name ?? "",
              email: session.user?.email ?? "",
              image: session.user?.image ?? ""
            }}
          />
          {children}
        </div>
      </body>
    </html>
  );
}

