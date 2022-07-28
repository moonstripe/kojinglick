
/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";

export default function App(props: AppProps) {
    // console.log(props.Component())
  return (
    <>
      <Head>
        <title>Kojin Glick</title>
        <meta name="description" content="Kojin's world!" />
      </Head>
      <props.Component />
    </>
  );
}