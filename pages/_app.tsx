import Layout from '@/components/Layout';
import '../styles/globals.css';
import { ReactElement, ReactNode, JSXElementConstructor } from 'react';

interface MyAppProps {
  Component: JSXElementConstructor<any>;
  pageProps: ReactNode;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return(
    <Layout {...(pageProps as any)}>
        <Component {...(pageProps as any)} />
    </Layout>
  ) 
}

export default function AppWrapper({ Component, pageProps }: MyAppProps) {
  return <MyApp Component={Component} pageProps={pageProps} />;
}