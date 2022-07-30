/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "fresh/server.ts";
import NavWrappedPage from '../islands/NavWrappedPage.tsx'
import Layout from '../components/Layout.tsx'

interface Post {
    slug: string,
    date: string,
    title: string
}

export const handler: Handlers = {
    async GET(req, ctx) {

        const blogArticles: Post[] = [];

        for await (const item of Deno.readDir('content/')) {
            if (item.isFile) {
                // console.log(item.name)
                const path = `content/${item.name}`
                const file = await Deno.readTextFile(path);
                const titleString = file.split("\n")[0];
                const dateString = file.split("\n")[2]

                blogArticles.push({
                    slug: item.name,
                    date: dateString,
                    title: titleString
                });
            }
        }

        return ctx.render({ blogArticles })
    },
};


export default ({ data, url }: PageProps) => {
    return (
        <Layout>
            <NavWrappedPage slug={url.pathname} />

            <h1 class={tw`text-transparent text-8xl bg-clip-text bg-gradient-to-br dark:from-green-400 dark:via-lime-200 dark:to-yellow-600 from-yellow-600 via-lime-200 to-green-400 mb-4`}>Hello, traveler</h1>

            <p class={tw`text-gray-600 dark:text-green-400 mb-4`}>You may be wondering what there is here. Right now, there's pretty much only my thoughts.</p>

            <h1 class={tw`text-xl dark:text-green-50`}>Thoughts</h1>
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