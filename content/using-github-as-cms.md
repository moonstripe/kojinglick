# Using Github as a CMS with Fresh

1659130112

## Something Mind-Bogglingly Easy

When I build a blog for a client, I try to consider a couple of things beforehand:

1. Where will I store the content?
2. How will I access the content?
3. How will I create the content?

By considering these things, I can settle on a front-end/content management stack that is effective at completing the task at hand. For example, when building <a href="https://privacycode.ai/" target="_blank" rel="noopener noreferrer">PrivacyCode</a>, I settled on using a server-side rendered <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> application with a <a href="https://sanity.io/" target="_blank" rel="noopener noreferrer">Sanity</a> content management system by answering those questions as follows:

1. I need to store it somewhere persistent, secure, and offsite.
2. I need a secure way of accessing the data, like GraphQL or a REST API.
3. Content needs to be draftable by a content team.

But for myself, these considerations are a little overkill. I'm not sharing anything critical to <a href="https://moonstripe.com/" target="_blank" rel="noopener noreferrer">my business</a>, and I don't have a content team to worry about. I'm optimizing for convenience, not security or propriety. Besides, as I add complexity to this blog project, it becomes harder to actually keep to a regular posting pattern. I actually do want to use it to chronicle what's going on in my life. Let's go back to those questions:

1. I can store my content somewhere easy and accessible.
2. I can access the content through a filesystem, rather than deal with a REST API or GraphQL.
3. I can create a Markdown file in that filesystem whenever I want.

I've dreamt of actually implementing something that looks decent with a skeleton this simple. Here's how I implemented it.

## Fresh and Deno Deploy

I still haven't gotten to anything related to Github, but hopefully the groundwork I've laid will come in handy. Given that I'm starting with convenience, Fresh, a brand-new, Deno-based web framework, sounded like a great place to start. Not only is it basically a bare-bones, static version of React, it's also built in Deno, giving me access to Deno Deploy, a crazy awesome solution to hosting your content on the edge. I've seen <a href="https://t3-fresh-test.deno.dev/" target="_blank" rel="noopener noreferrer">demos</a> of how fast these Deno containers can be spun up to serve content, so I wanted to see it for myself.

### Fresh
<a href="https://fresh.deno.dev/" target="_blank" rel="noopener noreferrer">Fresh</a> is based on <a href="https://preactjs.com/" target="_blank" rel="noopener noreferrer">preact</a>, so it's essentially a bare-bones, SSR only, React-ish application. It has some quirks to make it so bare-bones, like its novel <a href="https://fresh.deno.dev/docs/concepts/islands" target="_blank" rel="noopener noreferrer">islands</a> system, which forces you to consider exactly where you want interactivity and the full suite of React-based tools.

### Deno Deploy
<a href="https://deno.com/deploy/docs" target="_blank" rel="noopener noreferrer">Deno Deploy</a> is a cool new edge deployment solutions specifically for <a href="https://deno.land" target="_blank" rel="noopener noreferrer">Deno</a> runtimes. They're super fast at this point, and allow you to use a free .deno.dev domain, or connect your own. Pricing is generous, and I don't anticipate breaching the freemium threshold.

## Building the Blog

Without further ado, let's get developing. Make sure you've <a href="https://deno.land/#installation" target="_blank" rel="noopener noreferrer">installed the Deno runtime</a> with the following script.

<pre class="bash"><code>deno --version</code></pre>

This command returns useful information, like the Deno version, v8 Engine version, and Typescript version.

### Initialize your Project

The first time you do this, briefly consider all of the ways you've started React applications in the past. Maybe you're still new and you haven't found an alternative to Create-React-App yet. Maybe you're an absolute React wizard and you write your own babel and webpack configuration files. Regardless, think about all you did before seeing that spinning atom. 

All you need to do to start a new fresh project is the following script:

<pre class="bash"><code>deno run -A -r https://fresh.deno.dev my-blog</code></pre>  

This copies the <a href="https://fresh-demo.deno.dev/" target="_blank" rel="noopener noreferrer">Fresh demo</a> into a new directory called my-blog. Change directories to "my-blog" and start the demo:

<pre class="bash"><code>cd my-blog
deno task start</code></pre>

It will prompt you twice. First, it will ask if you want to use <a href="https://twind.dev" target="_blank" rel="noopener noreferrer">@twind</a>, a css-in-js version of <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>. Type `y` to include. Then, it will ask if you use VS Code. Type `y` to include.

Pause a moment. Take a deep breath. Center yourself. You haven't typed the letters <code>npm</code> or <code>npm -y init</code> or <code>npm install</code>. That's the beauty of <a href="https://deno.land" target="_blank" rel="noopener noreferrer">Deno</a>.

### Fresh's File Structure

When you initialized the Fresh project, it set up the following file structure in the my-blog directory:

<pre class="plaintext"><code>my-blog
+-- /islands
|   +-- Counter.tsx <- interactive counter
+-- /routes
|   +-- /api
|       +--- joke.tsx <- example handler for fetching
|   +-- [name] <- loads pathname "/[name]"
|   +-- index.tsx <- loads pathname "/"
+-- /static
|   +-- favicon.ico
|   +-- logo.svg
+-- /utils
|   +-- twind.ts <- entrypoint for your styling
+-- deno.json <- stores commands and import map
+-- dev.ts <- set up development environment
+-- fresh.gen.ts <- auto-generated map for components
+-- import_map.json <- third-party Deno modules
+-- main.ts <- entrypoint for your app
+-- README.md</code></pre>

For the sake of my blog project, I added two more folders: "/components" to store my non-interactive, layout components and "/content" to store my Markdown files. In the "/content" folder, add a new file called "welcome.md" and populate it with:

> content/welcome.md

<pre class="markdown"><code>
# First Post

[The Current Time and Date]

Hello World!</code></pre> 

I also removed the "/routes/api" folder and the "/islands/Counter.tsx" file, because they aren't essential to a blog, and those jokes are super corny and lame.

### Building Out the Blog Index

If you're used to the flexibility of <a href="https://reactrouter.com/" target="_blank" rel="noreferrer noopener">React Router DOM</a>, you won't get that here. Instead Fresh internal routing is a lot more like <a href="https://nextjs.org/" target="_blank" rel="noreferrer noopener">Next.js</a>, where the file structure templates out your application's routes. 

Since the goal is simplicity, we're going to list out the blog contents on the home page. No need to get complicated with the routing, but I push you to add an "about" page, and make the home page as pretty as you can.

In "/routes/index.tsx", we need to set up the preact component like this:

> routes/index.tsx

    /** @jsx h */
    import { h, Fragment } from "preact";
    import { tw } from "@twind";
    import { Handlers, PageProps } from "fresh/server.ts";

The first two lines set up preact's rendering engine, "h", and gives us access to the Fragment component. We won't worry too much about that here, but feel free to read <a href="https://jasonformat.com/wtf-is-jsx/" target="_blank" rel="noreferrer noopener">more</a>.

The third line sets up our css-in-js solution, @twind.

Finally, we import the Handlers and PageProps types from "fresh/server.ts".

Next, let's build the handler that populates our page with our blog content. In "myblog/routes/index.tsx", add the following:

> routes/index.tsx

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

The interface, Post, will help us know exactly what is relevant in each blog post.

The exported GET handler creates an array of Posts called `blog articles` and populates it with the the slug or pathname, date, and title of each post in "/content". Finally, we return the array in the render method of the second argument of the handler, ctx. This will pass our `blog articles` to our component.

Finally, we'll add the component itself:

> routes/index.tsx

    export default ({ data }: PageProps) => {
        return (
            <Fragment>
                <h1>Thoughts</h1>
                {
                    data.blogArticles.map((e: Post) => (
                        <div>
                            <a href={`/${e.slug.split('.')[0]}`}>
                                <h1>{e.title.slice(2, e.title.length)}</h1>
                                <p>{e.date}</p>
                            </a>
                        </div>
                    ))
                }
            </Fragment>
        );
    }

When you pass information from your handler to your component, the data is stored in the `data` property of your component's `props`. Notice that we destructure data from the props of the unnamed render function to use in the render loop.

When you run the script:

<pre class="bash"><code>deno task start</code></pre>

You should see a white page with your "Thoughts" header and information about your first "/content/welcome.md" post. If you click on the text, you will be taken to "localhost:800/welcome/", where you'll be greeted with a "Hello welcome".

Let's build that content page.

### Making the Post Island

In order to build our blog routes, we need to take a brief detour into islands world.

In Fresh, interactivity like programatically rendering inner HTML requires a little bit of running around. Only components described in islands can have these interactive components. But here's the catch, islands can't pass complex props. They can only pass simple primitives like strings, arrays, and objects.

Let's build our first island called Post by creating the file "/islands/Post.tsx".

Islands are started like any other component, but now we can import hooks:

> islands/Post.tsx

    /** @jsx h */
    import { h, Fragment } from "preact";
    import { tw } from "@twind";
    import { useRef, useLayoutEffect } from "preact/hooks";

This component will take in raw Markdown (here called "markup") and output an article.

> islands/Post.tsx

    export default function Post({ markup }) {
        const el = useRef<HTMLDivElement>(null)
        console.log('post', markup)
        useLayoutEffect(() => {
            if (el.current) {
                el.current.innerHTML = markup;
            }

        }, [])

        return (
            <Fragment>
                <article ref={el} />
            </Fragment>
        );
    }

### Building Out the Blog Routes

Making an individual blog article is like when you created the blog index, but this time we're also importing a Markdown parser. We do this by adding the following line to "import_map.json" like this:

> import_map.json

    {
        "imports": {
            "fresh/": "https://deno.land/x/fresh@1.0.1/",
            "preact": "https://esm.sh/preact@10.8.2",
            "preact/": "https://esm.sh/preact@10.8.2/",
            "preact-render-to-string": "https://esm.sh/preact-render-to-string@5.2.0?deps=preact@10.8.2",
            "@twind": "./utils/twind.ts",
            "twind": "https://esm.sh/twind@0.16.17",
            "twind/": "https://esm.sh/twind@0.16.17/",
            "markdown": "https://deno.land/x/markdown@v2.0.0/mod.ts", // our new module from deno.land/x cdn
        }
    }

To be able to view the content of the Markdown article from your new Post island, we need to alter the "/routes/[name].tsx". Initialize the file we did before:

> routes/[name].tsx

    /** @jsx h */ 
    import { h, Fragment } from "preact";
    import { Handlers, PageProps } from "$fresh/server.ts";
    import { Marked } from "markdown";
    import Post from '../islands/Post.tsx'

Next, we're going to add another handler, but instead of pulling metadata from our "/content" folder, we'll be extracting the Markdown content into our component in the `markup` property. You can choose to make another type interface for the content, but since I'm not looping over anything, it's trival to remember that the markup content is stored in `props.data.markup`.

> routes/[name].tsx

    export const handler: Handlers = {
    async GET(req, ctx) {
        const url = new URL(req.url).pathname.split('/')
        const file = url[1]

        const decoder = new TextDecoder("utf-8");
        const markdown = decoder.decode(await Deno.readFile(`./content/${file}.md`));
        const markup = Marked.parse(markdown)

        console.log(markup)

        return ctx.render({ markup: markup.content })
    },
    };

Finally, let's render the post in this component.

> routes/[name].tsx

    export default ({ data }) => {
        return (
            <Fragment>
                <a href='/'>back to home</a>
                <Post markup={data.markup}/>
            </Fragment>
        );
    }

Now, when we click on the first post in our blog index, it'll display a page with the post content! Very nice.

### Deploying to Deno Deploy

There are some things we need to do to prepare our deployment.

First, we need to alter our "import_map.json" to affix our "fresh/server.ts" import. Right now, it's relative thanks to the "$". Make sure you're also removing the "$" each import across your app.

Next, let's change the "deno.json". Right now, the `start` command runs the development environment. Replace `start` with `start:dev` as the command that starts your development environment. Add a new `start` command, so your "deno.json" looks like this:

> deno.json

    {
        "tasks": {
            "start:dev": "deno run -A --watch=static/,routes/ dev.ts",
            "start": "deno run -A --watch=static/,routes/ main.ts"
        },
        "importMap": "import_map.json"
    }

Finally, create an account on <a href="https://deno.com/deploy/docs" target="_blank" rel="noopener noreferrer">Deno Deploy</a> by clicking the "Sign In" link. Deploying to Deno Deploy is as easy as connecting your Github account, selecting the repository that has your blog, and clicking "Link". Read more <a href="https://deno.com/deploy/docs" target="_blank" rel="noopener noreferrer">here</a>.

In a few seconds, you should be able to see your new blog, hosted on "[slug].deno.dev".

## Conclusion

Hopefully, your mind is as blown as mine was when I cranked this project out in 4 hours. Fresh and Deno provide a very streamlined DX that is hard to beat, especially given what's out there in the space currently.

You can find the source code for the project <a href="https://github.com/moonstripe/demo-github-cms" target="_blank" rel="noopener noreferrer">here</a> and a live demo of the blog <a href="https://simple-blog.deno.dev/welcome" target="_blank" rel="noopener noreferrer">here</a>.
