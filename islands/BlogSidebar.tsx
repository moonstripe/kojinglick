/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { useRef, useLayoutEffect } from "preact/hooks";
import { SideProps } from "../utils/types/index.ts"

export default function Side({ markdown }: SideProps) {
    // const ref = useRef<HTMLDivElement>(null)

    const titles = markdown.split('\n').filter(l => l.slice(0, 2) === "##")

    useLayoutEffect(() => {
        console.log(titles)
    }, [])


    // style={{overflow: 'hidden', display: '-webkit-box', '-webkit-box-orient': 'vertical', '-webkit-line-clamp': '1'}} 

    return (
        <nav class={tw`mb-4 fixed md:left-32 xl:left-32 2xl:left-1/4 top-1/4 text-base sx:invisible sm:invisible md:invisible lg:visible xl:visible dark:text-green-600`} style={{ maxWidth: "20ch" }}>
            <ul>
                {
                    titles.map((e, i) =>
                        e.slice(0, 3) === "###" ? (
                            <li class={tw`ml-2 text-sm hover:text-gray text-neutral dark:hover:text-green-400`}>
                                <a href={`#${e.slice(3, e.length).trim().replaceAll(' ', '-').replaceAll("'", '-').toLowerCase()}`}>
                                    <p class={tw`line-clamp-`}>
                                        {e.replace(/[^\w'-]/g, " ").trim()}
                                    </p>
                                </a>
                            </li>
                        ) : (
                            <li class={tw`text-neutral hover:text-black dark:hover:text-green-400`}>
                                {i != 0 ? <br /> : null}
                                <a href={`#${e.slice(2, e.length).trim().replaceAll(' ', '-').replaceAll("'", '-').toLowerCase()}`}>
                                    <p class={tw`line-clamp-2`}>
                                        {e.replace(/[^\w'-]/g, " ").trim()}
                                    </p>
                                </a>
                            </li>
                        )
                    )
                }
            </ul>
        </nav>
    )
}