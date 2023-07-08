import { useState } from "preact/hooks"
import { RandomPost } from "../utils/types/index.ts"

export default ({ currentSlug, postList }: RandomPost) => {
    const [random, setRandom] = useState(Math.floor(Math.random() * (postList.length - 1)))
    const [otherPosts, setOtherPosts] = useState(postList.filter(p => p.slug !== currentSlug.slice(1, currentSlug.length) + ".md"))

    return (
        <a href={`${otherPosts[random].slug.slice(otherPosts[random].slug, -3)}`}>
            <button class="my-8 py-2 w-full border-black rounded border-solid border-2 dark:border-green-400 dark:text-green-300 columns-1">
                {`${otherPosts[random].title.slice(1).trim()} - ${otherPosts[random].date.slice(otherPosts[random].date.indexOf(',')+2, otherPosts[random].date.length)}`}
            </button>
        </a>
    )
}