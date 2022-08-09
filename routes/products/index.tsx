/** @jsx h */
import { h } from "preact"
import { tw } from "twind"
import { PageProps } from "fresh/server.ts"
import NavWrappedPage from '../../islands/NavWrappedPage.tsx'
import Layout from '../../components/Layout.tsx'
import { Meta } from '../../utils/types/index.ts'


export default ({ url }: PageProps) => {
    const meta: Meta = {
        title: "Products designed by Kojin",
        description: "Every so often, I get a billion dollar idea. And then morning-flation happens, and suddenly it's worthless.",
        type: "website"
    }
    return (
        <Layout meta={meta}>
            <NavWrappedPage slug={url.pathname} />
            <h1 class={tw`py-2 text-transparent text-4xl bg-clip-text bg-gradient-to-br dark:from-green-400 dark:via-lime-200 dark:to-yellow-600 from-yellow-600 via-lime-200 to-green-400 mb-4`}>My potions are too strong for you, traveler.</h1>
            <div class={tw`mt-8 my-2 border-transparent rounded border-solid border-2 bg-clip-border bg-gradient-to-br dark:from-green-400 dark:via-lime-200 dark:to-yellow-600 from-yellow-600 via-lime-200 to-green-400`}>
                <div class={tw`flex flex-row bg-bg-light py-4 px-4 dark:bg-bg-dark`}>
                    <img class={tw`rounded-lg w-3/12`} src="/prod/_cube/_cube.jpg" alt="Play some classic Pokemon games with the KaiCube" />
                    <div class={tw`flex flex-col ml-4`}>
                        <a href="products/_cube">
                            <div class={tw`flex flex-row my-2`}>
                                <h3 class={tw`align-middle text-2xl text-gray-600 dark:text-green-500 font-light`}>Get your retro game face on with</h3>
                                <p class={tw`mx-1`}></p>
                                <h1 class={tw`text-transparent font-bold text-2xl bg-clip-text bg-gradient-to-br dark:from-green-400 dark:via-lime-200 dark:to-yellow-600 from-yellow-600 via-lime-200 to-green-400`}>_Cube</h1>
                            </div>
                        </a>
                        <div class={tw`flex flex-row my-2`}>
                            <button class={tw`text-gray-600 dark:text-green-600 font-extralight ml-2 border-2 rounded-lg border-black dark:border-green-400 px-2 py-1 my-auto`}>Buy Now</button>
                            <p class={tw`text-gray-600 dark:text-green-600 font-extralight px-2 my-auto`}>$69.99</p>
                        </div>
                        <p class={tw`text-gray-600 dark:text-green-600 font-extralight`}><em class={tw`text-gray-700 dark:text-green-400`}>Becoming the Champion of the Hoenn Region... Getting blue-shelled in first place...</em> Never forget your gaming roots with over 30+ playable consoles. Play the retro games that define all those CRT-illuminated sleepover memories.</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}