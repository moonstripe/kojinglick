/* Post.tsx */

/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { useRef, useLayoutEffect, useState, useEffect } from "preact/hooks";
import { IS_BROWSER } from "https://deno.land/x/fresh@1.0.1/runtime.ts";

interface PostProps {
  markup: string;
}

export default function Post(props: PostProps) {
  const [mode, setMode] = useState(IS_BROWSER ? localStorage.theme : 'dark')
  const el = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (el.current) {
      el.current.innerHTML = props.markup;
    }

  }, [])

  return (
    <Fragment>
      <article ref={el} class={tw`prose dark:prose-slate dark:rounded dark:text-green-400`} />

      <Fragment>
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
        <script>hljs.highlightAll()</script>
      </Fragment>
    </Fragment>
  );
}