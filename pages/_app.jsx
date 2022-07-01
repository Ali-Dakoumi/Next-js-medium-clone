import "../styles/globals.css";
import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { linkResolver, repositoryName } from "../prismicio";
import Layout from "../components/Layout";
import Router from "next/router";
import { useState } from "react";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setIsLoading(true);
    console.log(isLoading);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setIsLoading(false);
    console.log(isLoading);
  });
  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <Layout>{isLoading ? <Loader /> : <Component {...pageProps} />}</Layout>
      </PrismicPreview>
    </PrismicProvider>
  );
}
