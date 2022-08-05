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

            <div class={tw`container mx-auto`}>
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

        </Layout>
    );
}