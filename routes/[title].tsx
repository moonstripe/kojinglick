/** @jsx h */
import { h } from "preact";
import { Marked } from "markdown";
import { Handlers, PageProps } from "fresh/server.ts";
import NavWrappedPage from '../islands/NavWrappedPage.tsx'
import Post from '../islands/Post.tsx'
import Layout from '../components/Layout.tsx'
import { Meta } from "../utils/types/index.ts"

export const handler: Handlers = {

    async GET(req: any, ctx: any) {
        const url = new URL(req.url).pathname.split('/')
        const file = url[1]

        console.log(`content/${file}`)

        // Build Meta
        const meta: Meta = {};

        const readFile = await Deno.readTextFile(`content/${file}.md`);
        const titleString = readFile.split("\n")[0];
        const descString = readFile.split("\n")[4]

        meta.title = titleString.replace(/[^a-z0-9]/gi, '');
        meta.description = descString.replace(/[^a-z0-9]/gi, '');
        meta.type = "article";


        // Build Content

        const decoder = new TextDecoder("utf-8");
        const markdown = decoder.decode(await Deno.readFile(`./content/${file}.md`));
        const markup = Marked.parse(markdown)

        console.log(meta)

        return ctx.render({ markup: markup.content, seo: meta  })
    },
};


export default ({ data, url }: PageProps) => {
    return (
        <Layout meta={data.seo}>
            <NavWrappedPage slug={url.pathname}/>
            <Post markup={data.markup}/>
        </Layout>
    );
}