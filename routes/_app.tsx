
/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "fresh/runtime.ts";

export default function App(props: any) {
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