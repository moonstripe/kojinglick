/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default ({children}) => {
    return (
        <div class={tw`mx-auto max-w-screen-md w-8/12`}>
            {children}
        </div>
    )
}