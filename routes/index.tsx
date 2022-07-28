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

        const blogArticles: string[] = [];

        for await (const dirEntry of Deno.readDir('content/')) {
            if (dirEntry.isFile) {
                console.log(dirEntry.name)
                const path = `content/${dirEntry.name}`
                const { birthtime } = await Deno.stat(path);
                const file = await Deno.readTextFile(path);
                const firstLine = file.split("\n")[0];


                blogArticles.push({
                    slug: dirEntry.name,
                    date: new Date(birthtime).toDateString(),
                    title: firstLine
                });
            }
        }

        return ctx.render({ blogArticles })

        // const url = new URL(req.url).pathname.split('/')
        // const file = url[2]
        // const section = url[1]

        // const decoder = new TextDecoder("utf-8");
        // const markdown = decoder.decode(await Deno.readFile(`./content/hello.md`));
        // const markup = Marked.parse(markdown)

        // return ctx.render({ markup: markup.content })
    },
};


export default ({ data, url }: PageProps) => {
    console.log('hello')
    return (
        <Layout>
            <NavWrappedPage slug={url.pathname} />
            <h1 class={tw`text-xl dark:text-green-200`}>Thoughts</h1>
            {
                data.blogArticles.map(e => (
                    <div class={tw`my-3`}>
                        <a href={`/${e.slug.split('.')[0]}`}>
                            <h1 class={tw`text-xl text-gray-700 dark:text-green-200`}>{e.title.slice(2, e.title.length)}</h1>
                            <p class={tw`text-sm text-gray-500 dark:text-green-400`}>{e.date}</p>
                        </a>
                    </div>
                ))
            }
        </Layout>
    );
}