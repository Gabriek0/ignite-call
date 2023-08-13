import { AppProps } from 'next/app'
import { globalStyles } from '../../styles/global'

import { SessionProvider } from 'next-auth/react'

import '@/lib/dayjs'
import { QueryClient, QueryClientProvider } from 'react-query'

globalStyles()

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}
