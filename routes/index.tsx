/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "fresh/server.ts";
import { PostModel } from '../utils/types/index.ts'
import NavWrappedPage from '../islands/NavWrappedPage.tsx'
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
    const meta = {
        title: "Kojin Glick",
        description: "Everything I have learned, am learning, and will learn.",
        type: "homepage"
    }

    return (
        <Layout meta={meta}>
            <NavWrappedPage slug={url.pathname} />

            <p class={tw`invisible h-0 xl:h-auto xl:visible text-clip font-mono text-sm leading-tight my-4 text-transparent bg-clip-text bg-gradient-to-br dark:from-green-400 dark:via-lime-200 dark:to-yellow-600 from-yellow-600 via-lime-200 to-green-400`} style={{ whiteSpace: 'pre-line' }}>

                BBPJ??????777!!!!?????JPBBBP5555YJ?JJ???JJJJJJ?7??JJ?7777??JYYJ?????7777?J?JYJ?????JJJYYY5P5YYY5PPPP{`\n`}
                55JJYJJJ???7777????YPG#@@@@&#BGP5YYJJ?JYYYYYJ?????JYYYJY5PG5JJYJYJ77???J77??7???JYJJJJJ??JJJYY5YY5GG{`\n`}
                ?7?J?JYJJJJJJJYYYY5PB#@&#G5J!^::^~7YG#BG5YYJJ?JYY5555Y55PPYJJ??777???J?77?JYYYYYJJJ?J55JJ?777?JJJJJY{`\n`}
                777?JYYJJJJJJYY5PPPPB#P7^...........^?GBPYJ?YJJJJJ??????77!!!!!7??????7???JJ5GGGGG5PPPGPJ?JJ?7777777{`\n`}
                ???JJYJJ5PYJJJJJY5PPP7:.......::^^:...:?55YJJJJYJJ???JJYJ?777??YY??77JYYYYYYYYP#&&#BB5YYYY??????7??J{`\n`}
                Y55P5YJ5YYYJYYJJJ5P57::..:!YPGGBBBGY7:..7PPYJJ?????Y5YYYYJJ?????!7??JYYYYY5GGPPGGPG5?77??JJ?7??JJ?77{`\n`}
                BGP55555YJ?JJJJJYYJ?!~^~YB&&&#####&&#G?^^?YJ???7?YPJ!!777JYJ??77?JJYY5PGGPYJ?77!~!~~^~~~~~!7?7777?Y5{`\n`}
                P5YJ?J5GPYJ???JJJ??J!!JB&##############Y~!77??77!!7?P###G????????JP#BGGPPBP?7!!!~^^~~!77!!7?J??Y55BB{`\n`}
                7!?YP#&&&#GPYYJJ??77?B&####Kojin########5?!77777!!!7PB##BJ!7??77?Y5YYYGP7!!~~~~~~!!7JJ77??J?JY??YJJJ{`\n`}
                G#&&&&&&&#PPYJ??7?77!JB&#######Glick###&G!~!777777!7!7?7777???JJJ?!!!!!!~~!7777!!777!!7??YP5??J?!!!?{`\n`}
                ##&&&&#BPYJ????????7!~!YB############&#P7~~!!777777!7777????????7!7??7~~7?777777777???????Y5Y??JYYYY{`\n`}
                ?5BG5YJ!!7?JJJJ?????777!!?5GB######BGY7^~!!77777777!!7777777777777??!??7777???77?7??????J?!!!??JYPGP{`\n`}
                7777!!~~~!7???J???????77!!~~!77??7!~~^~!7!77777J?777???????7?77???7!~~!7777??????JJJJJJJ?JJJYYYYPGGG{`\n`}
                Y?!!!!!!!777????????J??7777!!!!~~~~~~!!!!!777777777?777?J?7?JY55?7777???JJJ?JJJJJJYYYYJJJJJ555B&&&&&{`\n`}
                GPJ77777?J??JJJYYYJJ????7777?!!!!7!!!!777777??7777??JJYJ?JJ?777!~~~~7?5B#BG5YYPP555JYYYYYP55G5Y5PP5Y{`\n`}
                ??77???J??????JJJJJ???????77777??77777777??77??????7?YY?7!~~~~~~!7?YGG5JJJJJYG&&###G5Y555P5J?J?!!!?J{`\n`}
                777???JJYYY5Y???????????????JJ???J??77????????7!!!!!!^^~!!7!!7?7Y5JJYYJJ5YJYP#BB##BPYJJJ??7??J???JYP{`\n`}
                777??JJJJJJJJYYJJJ??7????JJJJ??????7777??7???77777??777!~~!!7!YGBBB###BY?JJYYJ7!777??77????J?7?JJJY5
            </p>

            <div class={tw`grid grid-cols-1 md:grid-cols-2 md:ap-2`}>
                <div class={tw`container`}>
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
                                <svg class={tw`my-auto mr-5`} viewBox="0 0 24 24" height="24" fill="#fff" >
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"></path>
                                </svg>
                                <h1 class={tw`my-auto align-text-middle text-2xl text-gray-700 dark:text-green-200`}>kojinglick@gmail.com</h1>
                            </div>
                        </a>
                    </div>
                </div>
                <div class={tw`container`}>
                    <h1 class={tw`visible text-transparent text-4xl py-1 bg-clip-text bg-gradient-to-br dark:from-green-400 dark:via-lime-200 dark:to-yellow-600 from-yellow-600 via-lime-200 to-green-400 mb-4`}>Thoughts</h1>
                    {
                        data.blogArticles.map((e: PostModel) => (
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
    );
}