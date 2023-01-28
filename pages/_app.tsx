import { bodyStyle } from '../styles/global.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} className={bodyStyle} />
}
