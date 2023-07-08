import { tw } from "twind";

interface Route {
    name: string
    pathname: string
}

const routeMap: Array<Route> =
[
    {
        name: "home",
        pathname: "/"
    },
    {
        name: "blog",
        pathname: "/blog"
    },
    {
        name: "about",
        pathname: "/about"
    },
]

export default (props: any) => {
    return (
        <nav class={props.class}>
            {
                routeMap.map(e => <a class={props.slug === e.pathname ? tw`ml-0 mr-2 black dark:text-white` : tw`ml-0 mr-2 text-neutral`} href={e.pathname}>{e.name}</a>)
            }
        </nav>
    )
}