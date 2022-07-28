/** @jsx h */
import { h } from "preact";
import { useState, useEffect } from "preact/hooks"
import { tw } from "@twind";

import { PageProps } from '$fresh/server.ts'

export default (props: PageProps) => {
    const { mode, setter } = props

    const handleDark = () => {
        if (localStorage.getItem('theme') !== 'dark') {
            localStorage.setItem('theme', 'dark');
            setter('dark');
        } else {
            localStorage.setItem('theme', 'light');
            setter('light');
        }
    }
    
    return (
        <button onClick={handleDark}>{mode}</button>
    )
}