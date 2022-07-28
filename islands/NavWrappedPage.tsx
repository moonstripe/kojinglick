/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { useState, useLayoutEffect } from "preact/hooks"
import { PageProps } from "$fresh/server.ts"
import NavBar from '../islands/NavBar.tsx'
import DarkMode from '../islands/DarkMode.tsx'
import Logo from '../islands/Logo.tsx'


export default (props: PageProps) => {

    const [mode, setMode] = useState(localStorage.theme)
    const [children, setChildren] = useState(props.children)

    // console.log( props.children)

    useLayoutEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            document.body.setAttribute('style', "background-color: #253237;")
        } else {
            document.documentElement.classList.remove('dark')
            document.body.setAttribute('style', "background-color: #E0FBFC;")
        }
    }, [mode])

    return (
        <div class={tw`mt-4`}>
            <Logo setter={setMode} />
            <NavBar class={tw`my-4 flex flex-row`} {...props} />
        </div>
    )
}