import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Oscar Party</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="rgb(24 24 27)" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
