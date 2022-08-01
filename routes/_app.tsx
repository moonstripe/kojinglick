/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "fresh/runtime.ts";

export default function App(props: any) {
  return (
    <Fragment>
      <Head>
        {/* <title>Kojin Glick</title>
        <meta name="description" content="Kojin's world!" /> */}
      </Head>
      <props.Component />
    </Fragment>
  );
}