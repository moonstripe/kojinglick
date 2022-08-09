/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "fresh/runtime.ts";

export default function App(props: any) {
  return (
    <Fragment>
      <Head>
      </Head>
      <props.Component />
    </Fragment>
  );
}