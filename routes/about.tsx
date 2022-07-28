/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps } from "$fresh/server.ts";
import NavWrappedPage from '../islands/NavWrappedPage.tsx'
import Layout from '../components/Layout.tsx'

export default (props: PageProps) => {
    return (
        <Layout>
            <NavWrappedPage slug={props.url.pathname} />
            <h1 class={tw`text-xl`}>My name is Kojin Glick.</h1>
        </Layout>
    );
}