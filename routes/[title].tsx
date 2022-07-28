/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Marked } from "markdown";
import { Handlers, PageProps } from "$fresh/server.ts";
import NavWrappedPage from '../islands/NavWrappedPage.tsx'
import Post from '../islands/Post.tsx'
import Layout from '../components/Layout.tsx'

export const handler: Handlers = {
    async GET(req, ctx) {
        const url = new URL(req.url).pathname.split('/')
        const file = url[1]

        console.log('file', file)

        const decoder = new TextDecoder("utf-8");
        const markdown = decoder.decode(await Deno.readFile(`./content/${file}.md`));
        const markup = Marked.parse(markdown)

        return ctx.render({ markup: markup.content })
    },
};


export default ({ data, url }: PageProps) => {
    console.log('hello')
    return (
        <Layout>
            <NavWrappedPage slug={url.pathname} />
            <Post markup={data.markup} />
        </Layout>
    );
}