/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import { PageProps } from '$fresh/server.ts'

interface Route {
    name: string
    pathname: string
}

const routeMap: Array<Routes> =
[
    {
        name: "home",
        pathname: "/"
    },
    {
        name: "about",
        pathname: "/about"
    },
]

export default (props: PageProps) => {
    console.log(props.slug)
    return (
        <nav class={props.class}>
            {
                routeMap.map(e => <a class={props.slug === e.pathname ? tw`ml-0 mr-2 black dark:text-white` : tw`ml-0 mr-2 text-neutral`} href={e.pathname}>{e.name}</a>)
            }
        </nav>
    )
}