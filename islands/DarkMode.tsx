/** @jsx h */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks"
import { tw } from "@twind";

import { PageProps } from '$fresh/server.ts'
import { IS_BROWSER } from "https://deno.land/x/fresh@1.0.1/runtime.ts";

export default (props: any) => {
    const { mode, setter } = props

    const handleDark = () => {
        if (IS_BROWSER) {
            if (localStorage.getItem('theme') !== 'dark') {
                localStorage.setItem('theme', 'dark');
                setter('dark');
            } else {
                localStorage.setItem('theme', 'light');
                setter('light');
            }
        }
    }
    
    return (
        <button onClick={IS_BROWSER ? handleDark : () => {}}>{mode}</button>
    )
}