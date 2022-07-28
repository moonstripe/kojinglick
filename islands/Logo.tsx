/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import { PageProps } from '$fresh/server.ts'

export default (props: PageProps) => {

    const { setter } = props;

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
        <a onClick={handleDark}>
            <img
                src={localStorage.theme === 'dark' ? "/kojin_logo_invert.svg" : "/kojin_logo.svg"}
                width="10%"
                alt="A moon"
            />
        </a>
    )
}