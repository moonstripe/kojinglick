/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "fresh/server.ts";
import NavWrappedPage from '../islands/NavWrappedPage.tsx'
import Post from '../islands/Post.tsx'
import Layout from '../components/Layout.tsx'

interface Post {
    slug: string,
    date: string,
    title: string
}

export const handler: Handlers = {
    async GET(req, ctx) {

        const blogArticles: Post[] = [];

        for await (const dirEntry of Deno.readDir('content/')) {
            if (dirEntry.isFile) {
                // console.log(dirEntry.name)
                const path = `content/${dirEntry.name}`
                const stat = await Deno.stat(path);
                const file = await Deno.readTextFile(path);
                const firstLine = file.split("\n")[0];
                const dateLine = file.split("/n")[1]

                console.log(stat)
                blogArticles.push({
                    slug: dirEntry.name,
                    date: dateLine,
                    title: firstLine
                });
            }
        }

        return ctx.render({ blogArticles })
    },
};


export default ({ data, url }: PageProps) => {
    // console.log('hello')
    return (
        <Layout>
            <NavWrappedPage slug={url.pathname} />
            <h1 class={tw`text-xl dark:text-green-200`}>Thoughts</h1>
            {
                data.blogArticles.map((e: Post) => (
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