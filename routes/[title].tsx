import { Marked } from "markdown";
import { Handlers, PageProps } from "fresh/server.ts";
import { Meta, PostModel } from "../utils/types/index.ts"
import Layout from '../components/Layout.tsx'
import NavWrappedPage from '../islands/NavWrappedPage.tsx'
import Side from "../islands/BlogSidebar.tsx";
import Post from '../islands/Post.tsx'
import RandomPost from '../islands/RandomPost.tsx'

export const handler: Handlers = {

    async GET(req: any, ctx: any) {
        const url = new URL(req.url).pathname.split('/')
        if (url[1] !== 'products' | 'style.css') {
            // console.log('[title] hello')
            const file = url[1]

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
                        date: new Date(dateString * 1000).toLocaleDateString('en-us', options),
                        title: titleString
                    });
                }
            }
    
            // Build Content
    
            const decoder = new TextDecoder("utf-8");

            const raw = await Deno.readTextFile(`content/${file}.md`)

            const dateString = raw.split(`\n`)[2]

            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            const forSite = raw.replace(dateString, new Date(dateString * 1000).toLocaleDateString('en-us', options))

            const markup = Marked.parse(forSite);
    
            // Build Meta
    
            const meta: Meta = {};
    
            const readFile = await Deno.readTextFile(`content/${file}.md`);
            const titleString = readFile.split("\n")[0].replace(/[\W_]+/g, " ").trim();
            const descString = readFile.split("\n")[4].replace(/[\W_]+/g, " ").trim();
    
            meta.title = titleString;
            meta.description = descString;
            meta.type = "article";
            meta.image = "https://www.kojinglick.com/kojin_logo.png";
            meta.url = req.url

            return ctx.render({ markup: markup.content, markdown: readFile, seo: meta, articles: blogArticles })
        }
    },
};


export default ({ data, url }: PageProps) => {
    return (
        <Layout meta={data.seo}>
            <NavWrappedPage slug={url.pathname} />
            <Side markdown={data.markdown} />
            <Post markup={data.markup} />
            <RandomPost postList={data.articles} currentSlug={url.pathname} />
        </Layout>
    );
}