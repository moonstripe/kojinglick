/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps } from "fresh/server.ts";
import NavWrappedPage from '../islands/NavWrappedPage.tsx'
import Layout from '../components/Layout.tsx'

export default (props: PageProps) => {
    const meta = {
        title: "About Kojin",
        description: "Learn more about my story and projects.",
        type: "website"
    }
    return (
        <Layout meta={meta}>
            <NavWrappedPage slug={props.url.pathname} />
            <h1 class={tw`text-transparent text-8xl bg-clip-text bg-gradient-to-br dark:from-green-400 dark:via-lime-200 dark:to-yellow-600 from-yellow-600 via-lime-200 to-green-400 mb-4`}>Kojin Glick</h1>

            <p class={tw`text-gray-600 dark:text-green-200 mb-4`}>Digital explorer, life-long student, and web developer</p>

            <h1 class={tw`text-xl dark:text-green-200`}>Bio</h1>
            <ul class={tw`list-disc ml-4 mb-4`}>
                <li class={tw`text-gray-600 dark:text-green-400 mb-2`}>I run <a href='https://www.moonstripe.com' target="_blank" class={tw`text-black dark:text-neutral`}>moonstripe design</a>.</li>

                <li class={tw`text-gray-600 dark:text-green-400 mb-2`}>I am a Master's Candidate in <a href='https://www.middlebury.edu/institute/academics/degree-programs/nonproliferation-terrorism-studies' target="_blank" class={tw`text-black dark:text-neutral`}>Non-Proliferation and Terrorism Studies</a> at <a href='https://www.middlebury.edu/institute/' target="_blank" class={tw`text-black dark:text-neutral`}>Middlebury Institute for International Studies at Monterey</a>.</li>

                <li class={tw`text-gray-600 dark:text-green-400`}>I have undergraduate degrees in  <a href='https://mediastudies.ugis.berkeley.edu/' target="_blank" class={tw`text-black dark:text-neutral`}>Media Studies</a> and <a href='https://polisci.berkeley.edu/' target="_blank" class={tw`text-black dark:text-neutral`}>Political Science</a> from <a href='https://www.berkeley.edu/' target="_blank" class={tw`text-black dark:text-neutral`}>UC Berkeley</a>.</li>
            </ul>

            <h1 class={tw`text-xl dark:text-green-200`}>Works</h1>
            <p class={tw`dark:text-green-200 mb-4`}>I'll add projects I'm proud of here.</p>
        </Layout>
    );
}