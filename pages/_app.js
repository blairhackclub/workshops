import '../styles/globals.css';
import Head from 'next/head';
import config from '../data/config';
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../lib/theme';

import MDXProvider from "../components/MDXProvider";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta property="og:title" content={config.title} key="ogtitle"/>
        <link rel="icon" href="/favicon.png" />

        <meta property="og:image" content={config.image} key="ogimage"/>
        <meta property="og:site_name" content={config.siteName} key="ogsitename"/>
        {/* <meta name='theme-color' content={config.color}/> */}
      </Head>
      
      <ChakraProvider theme={theme} resetCSS>
        <MDXProvider>
          <Navbar/>
          <Component {...pageProps}/>
          <Footer/>
        </MDXProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;