import type { NextPage } from "next";
import Head from "next/head";
import { APP_NAME } from "../utils/configs";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home | {APP_NAME}</title>
      </Head>
    </div>
  );
};

export default Home;
