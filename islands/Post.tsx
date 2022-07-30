/* Post.tsx */

/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { useRef, useLayoutEffect} from "preact/hooks";

interface PostProps {
  markup: string;
}

export default function Post(props: PostProps) {
  const el = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (el.current) {
      el.current.innerHTML = props.markup;
    }

  }, [])

  return (
    <Fragment>
      <article ref={el} class={tw`prose dark:prose-yellow dark:text-green-400`} />

      <Fragment>
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
        <script>hljs.highlightAll()</script>
      </Fragment>
    </Fragment>
  );
}