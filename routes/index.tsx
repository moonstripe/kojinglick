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
                const dateString = file.split("\n")[2]

                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

                blogArticles.push({
                    slug: item.name,
                    order: dateString,
                    title: titleString,
                    date: new Date(dateString * 1000).toLocaleDateString('en-us', options)
                });
            }
        }
        blogArticles.sort((a,b) => b.order - a.order); 

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
        <Layout meta={meta}>
            <NavWrappedPage slug={url.pathname} />

            <div class={tw`grid grid-cols-1 md:grid-cols-2 md:ap-2`}>
                <div class={tw`container my-4`}>
                    <div class={tw`py-1`}>
                        <Hero />
                    </div>
                    <h1 class={tw`visible text-transparent text-4xl py-1 bg-clip-text bg-gradient-to-br dark:from-green-400 dark:via-lime-200 dark:to-yellow-600 from-yellow-600 via-lime-200 to-green-400 mb-4`}>Find Me</h1>
                    <div class={tw`my-3`}>
                        <a class={tw`my-3`} href={`https://www.linkedin.com/in/kojinglick`} target="_blank" rel="noopener noreferrer">
                            <div class={tw`flex flex-row`}>
                                <svg class={tw`my-auto mr-5`} viewBox="0 0 24 24" height="24" fill="#0a66c2">
                                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                                </svg>
                                <h1 class={tw`my-auto align-text-middle text-2xl text-gray-700 dark:text-green-200`}>Kojin Glick</h1>
                            </div>
                        </a>
                    </div>
                    <div class={tw`my-3`}>
                        <a class={tw`my-3`} href={`https://twitter.com/kojinglick`} target="_blank" rel="noopener noreferrer">
                            <div class={tw`flex flex-row`}>
                                <svg class={tw`my-auto mr-5`} viewBox="0 0 24 24" height="24" fill="rgb(29, 155, 240)" >
                                    <g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g>
                                </svg>
                                <h1 class={tw`my-auto align-text-middle text-2xl text-gray-700 dark:text-green-200`}>@kojinglick</h1>
                            </div>
                        </a>
                    </div>
                    <div class={tw`my-3`}>
                        <a class={tw`my-3`} href={`mailto:kojinglick@gmail.com`} target="_blank" rel="noopener noreferrer">
                            <div class={tw`flex flex-row`}>
                                <svg class={tw`my-auto mr-5`} viewBox="0 0 24 24" width="24px" fill="#ff0000" >
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"></path>
                                </svg>
                                <h1 class={tw`my-auto align-text-middle text-2xl text-gray-700 dark:text-green-200`}>kojinglick@gmail.com</h1>
                            </div>
                        </a>
                    </div>
                </div>
                <div class={tw`container my-4`}>
                    <h1 class={tw`visible text-transparent text-4xl py-1 bg-clip-text bg-gradient-to-br dark:from-green-400 dark:via-lime-200 dark:to-yellow-600 from-yellow-600 via-lime-200 to-green-400 mb-4`}>Thoughts</h1>
                    {
                        data.blogArticles.map((e: PostModel, i) => i < 7 ? (
                            <div class={tw`my-3`}>
                                <a href={`/${e.slug.split('.')[0]}`}>
                                    <h1 class={tw`text-2xl text-gray-700 dark:text-green-200`}>{e.title.slice(2, e.title.length)}</h1>
                                    <p class={tw`text-lg text-gray-500 dark:text-green-400`}>{e.date}</p>
                                </a>
                            </div>
                        ) : null)
                    }
                </div>
            </div>
        </Layout>
    );
}