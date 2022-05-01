import Head from "next/head";
import { ReactElement } from "react";
import { APP_NAME } from "../../utils/configs";
import Header from "../Header";

function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default Layout;
