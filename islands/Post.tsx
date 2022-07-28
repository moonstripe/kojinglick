/* Post.tsx */

/** @jsx h */
import { h } from "preact";
import { tw } from "@twind"
import { useRef, useLayoutEffect } from "preact/hooks";

interface PostProps {
  markup: string;
}

export default function Post(props: PostProps) {
  const el = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (el.current) {
      el.current.innerHTML = props.markup
    }
  })

  return (
    <article ref={el} class={tw`prose dark:text-green-400`}/>
  );
}