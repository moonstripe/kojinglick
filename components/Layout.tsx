/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Head } from "fresh/runtime.ts";
import { Meta, LayoutProps } from "../utils/types/index.ts"

const SEO = ({ customMeta }: Meta) => {

    const meta = {
        title: customMeta.meta.title ? customMeta.meta.title : "Kojin's Blog",
        type: customMeta.meta.type ? customMeta.meta.type : "website",
        description: customMeta.meta.description ? customMeta.meta.description : "A collections of thoughts originating from the mind of Kojin.",
        url: customMeta.meta.url ? customMeta.meta.url : "https://www.kojinglick.com/",
        image: customMeta.meta.image ? customMeta.meta.image : "https://www.kojinglick.com/kojin_logo.png",
        ...customMeta.meta
    }

    return (
        <Head>
            <title>{meta.title}</title>

            {/* Keywords */}

            <meta name="keywords" content="professional, web developer, digital marketing, website designer, javascript, typescript, programming, development, kojin, glick, Kojin, Glick"/>

            {/* Robots.txt */}
            <meta name="robots" content="index, follow"/>

            {/* Open Graph */}

            <meta property="og:type" content={meta.type} />

            <meta property="og:title" content={meta.title} />

            <meta property="og:description" content={meta.description} />

            <meta property="og:image" content={meta.image} />

            <meta property="og:image:secure_url" content={meta.image} />

            <meta property="og:url" content={meta.url} />

            <meta property="og:site_name" content={meta.title} />

            <meta property="og:image:type" content="image/svg" />

            <meta property="og:image:alt" content="A moon covered by clouds." />

            {/* Twitter */}

            <meta name="twitter:title" content={meta.title} />

            <meta name="twitter:description" content={meta.description} />

            <meta name="twitter:site" content="@kojinglick" />

            <meta name="twitter:creator" content="@kojinglick" />

            {/* Canonical */}

            <link rel="canonical" href="https://kojinglick.com/" />

            <link rel="canonical" href="https://www.kojinglick.com/" />

        </Head>
    )
}

export default ({ children, ...customMeta }: LayoutProps) => {
    return (
        <div class={tw`mx-auto mb-4 max-w-screen-md w-8/12`}>
            <SEO customMeta={customMeta}/>
            {children}
        </div>
    )
}