/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "fresh/server.ts";
import { PostModel } from '../utils/types/index.ts'
import NavWrappedPage from '../islands/NavWrappedPage.tsx'
import Hero from '../islands/Hero.tsx'
import Layout from '../components/Layout.tsx'

export const handler: Handlers = {
    async GET(req, ctx) {
        // Log Visitor

        console.log(req)

        // Enum Files

        const blogArticles: PostModel[] = [];

        for await (const item of Deno.readDir('content/')) {
            if (item.isFile) {
                // console.log(item.name)
                const path = `content/${item.name}`
                const file = await Deno.readTextFile(path);
                const titleString = file.split("\n")[0];
                const dateString = parseInt(file.split("\n")[2]);

                const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

                blogArticles.push({
                    slug: item.name,
                    order: dateString,
                    title: titleString,
                    date: new Date(dateString * 1000).toLocaleDateString('en-us', options)
                });
            }
        }
        blogArticles.sort((a, b) => b.order - a.order);

        return ctx.render({ blogArticles })
    },
};


export default ({ data, url }: PageProps) => {
    const meta = {
        title: "Kojin Glick",
        description: "Everything I have learned, am learning, and will learn.",
        type: "homepage"
    }

    return (
        <div class={tw`w-screen h-screen flex flex-col`}>
            <div class={tw`absolute t-0 l-0 w-screen h-screen my-auto -z-50`}>
              <Hero />
            </div>
            <Layout meta={meta}>
                <NavWrappedPage slug={url.pathname} />

                <div class={tw`grid grid-cols-1 md:grid-cols-1 md:ap-2`}>
                    <div class={tw`md:col-span-1 container my-4`}>
                        <h1 class={tw`visible text-transparent text-4xl py-1 bg-clip-text bg-gradient-to-br dark:from-green-400 dark:via-lime-200 dark:to-yellow-600 from-yellow-600 via-lime-200 to-green-400 mb-4`}>All Thoughts</h1>
                        {
                            data.blogArticles.map((e: PostModel, i: number) =>(
                                <div class={tw`my-3`}>
                                    <a href={`/${e.slug.split('.')[0]}`}>
                                        <h1 class={tw`text-2xl text-gray-700 dark:text-green-200`}>{e.title.slice(2, e.title.length)}</h1>
                                        <p class={tw`text-lg text-gray-500 dark:text-green-400`}>{e.date}</p>
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </Layout>
        </div>
    );
}