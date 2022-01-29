import type { AppProps } from 'next/app'
import Router from 'next/router'
import * as NProgress from 'nprogress'
import Provider from '../containers/Provider'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})

const MyApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
