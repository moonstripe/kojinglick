/* Post.tsx */
import { useRef, useLayoutEffect} from "preact/hooks";
import { PostProps } from '../utils/types/index.ts'

export default function Post(props: PostProps) {
  const el = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (el.current) {
      el.current.innerHTML = props.markup;
    }

  }, [])

  return (
    <Fragment>
      <article ref={el} class="prose text-xl dark:prose-yellow dark:text-green-400" />

      <Fragment>
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
        <script>hljs.highlightAll()</script>
      </Fragment>
    </Fragment>
  );
}