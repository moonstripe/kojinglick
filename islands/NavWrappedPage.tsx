/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { useState, useLayoutEffect } from "preact/hooks"
import NavBar from '../islands/NavBar.tsx'
import Logo from '../islands/Logo.tsx'
import { IS_BROWSER } from "fresh/runtime.ts";


export default (props: any) => {

    const [mode, setMode] = useState(IS_BROWSER ? localStorage.theme : 'dark')

    useLayoutEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (IS_BROWSER) {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.remove('light')
                document.documentElement.classList.add('dark')
                document.body.setAttribute('style', "background-color: #253237;")
            } else {
                document.documentElement.classList.remove('dark')
                document.documentElement.classList.add('light')
                document.body.setAttribute('style', "background-color: #E0FBFC;")
            }
        }
    }, [mode])

    return (
        <div class={tw`mt-4`}>
            <link rel="stylesheet"
                href={`//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/tokyo-night-${mode}.min.css`} />
            <Logo setter={setMode} />
            <NavBar class={tw`my-4 flex flex-row`} {...props} />
        </div>
    )
}