/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default (props: any) => {
    return (
        <div class={tw`mx-auto mb-4 max-w-screen-md w-8/12`}>
            {props.children}
        </div>
    )
}