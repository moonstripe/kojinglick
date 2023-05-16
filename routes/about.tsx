/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps } from "fresh/server.ts";
import NavWrappedPage from '../islands/NavWrappedPage.tsx'
import Layout from '../components/Layout.tsx'
import Hero from '../islands/Hero.tsx'
import { Meta } from '../utils/types/index.ts'

export default (props: PageProps) => {
    const meta: Meta = {
        title: "About Kojin",
        description: "Digital explorer, life-long student, and web developer.",
        type: "website"
    }

    return (
        <div class={tw`w-screen h-screen flex flex-col`}>
            <div class={tw`absolute t-0 l-0 w-screen h-screen my-auto -z-50`}>
                <Hero />
            </div>
            <Layout meta={meta}>
                <NavWrappedPage slug={props.url.pathname} />
                <h1 class={tw`py-2 text-transparent text-8xl bg-clip-text bg-gradient-to-br dark:from-green-400 dark:via-lime-200 dark:to-yellow-600 from-yellow-600 via-lime-200 to-green-400 mb-4`}>Kojin Glick</h1>

                <p class={tw`text-xl text-gray-600 dark:text-green-200 mb-4`}>Digital explorer, life-long student, and web developer</p>

                <h1 class={tw`text-4xl dark:text-green-200`}>Bio</h1>

                <ul class={tw`list-disc ml-4 mb-4 mt-4 list-none`}>

                    <li class={tw`text-gray-600 dark:text-green-400 mb-2 text-xl`}>I run <a href='https://www.moonstripe.com' target="_blank" class={tw`text-black dark:text-neutral`}>moonstripe design</a>.</li>

                    <li class={tw`text-gray-600 dark:text-green-400 mb-2 text-xl`}>I am a Master's Candidate in <a href='https://www.middlebury.edu/institute/academics/degree-programs/nonproliferation-terrorism-studies' target="_blank" class={tw`text-black dark:text-neutral`}>Non-Proliferation and Terrorism Studies</a> at <a href='https://www.middlebury.edu/institute/' target="_blank" class={tw`text-black dark:text-neutral`}>Middlebury Institute for International Studies at Monterey</a>.</li>

                    <li class={tw`text-gray-600 dark:text-green-400 mb-2 text-xl ml-4`}>I am a Graduate Research Assistant at the <a href='https://www.middlebury.edu/institute/academics/centers-initiatives/ctec' target="_blank" class={tw`text-black dark:text-neutral`}>Center on Terrorism, Extremism, and Counter-Terrorism</a>.</li>

                    <li class={tw`text-gray-600 dark:text-green-400 mb-2 text-xl ml-4`}>I am a Spring 2023 <a href='https://www.middlebury.edu/institute/academics/centers-initiatives/ctec/michael-donnelly-ctec-research-fellowship' target="_blank" class={tw`text-black dark:text-neutral`}>Michael Donnelly Fellow</a>.</li>

                    <li class={tw`text-gray-600 dark:text-green-400 mb-2 text-xl ml-4`}>I am a 2022 <a href='https://www.middlebury.edu/institute/news/former-institute-president-and-spouse-donate-home-fund-scholarships' target="_blank" class={tw`text-black dark:text-neutral`}>Gard 'N Wall Non-Proliferation Scholar</a>.</li>

                    <li class={tw`text-gray-600 dark:text-green-400 mb-2 text-xl`}>I am certified in <a href='https://www.parchment.com/u/award/d94292951a664e9746f8dbf22a58d844' target="_blank" class={tw`text-black dark:text-neutral`}>Full-Stack Web Development</a> from <a href='https://extension.berkeley.edu/public/category/courseCategoryCertificateProfile.do?method=load&certificateId=32408422' target="_blank" class={tw`text-black dark:text-neutral`}>UC Berkeley</a>.</li>

                    <li class={tw`text-gray-600 dark:text-green-400 text-xl`}>I have bachelor's degrees in <a href='https://mediastudies.ugis.berkeley.edu/' target="_blank" class={tw`text-black dark:text-neutral`}>Media Studies</a> and <a href='https://polisci.berkeley.edu/' target="_blank" class={tw`text-black dark:text-neutral`}>Political Science</a> from <a href='https://www.berkeley.edu/' target="_blank" class={tw`text-black dark:text-neutral`}>UC Berkeley</a>.</li>
                </ul>

                <h1 class={tw`text-xl dark:text-green-200 text-4xl`}>Works</h1>
                <ul class={tw`list-disc ml-4 mb-4 mt-4 list-none`}>

                    <li class={tw`text-gray-600 dark:text-green-400 mb-2 text-xl`}>March, 2023: <a href='https://www.middlebury.edu/institute/academics/centers-initiatives/ctec/ctec-publications/changing-face-wagner-group-military' target="_blank" class={tw`text-black dark:text-neutral`}>The Changing Face of the Wagner Group: From Military Adventurism to Venture Capitalism</a></li>
                    <li class={tw`text-gray-600 dark:text-green-400 mb-2 text-xl ml-4`}>This paper examines the emergence of Prigozhin's Wagner Group and its evolution from conducting security operations in Syria and Africa to establishing a modern business center in St. Petersburg, providing insights into its role in advancing Russia's foreign policy goals.</li>

                    <li class={tw`text-gray-600 dark:text-green-400 mb-2 text-xl`}>March, 2023: <a href='https://www.middlebury.edu/institute/academics/centers-initiatives/ctec/ctec-publications/wagner-groups-social-footprint-time-series' target="_blank" class={tw`text-black dark:text-neutral`}>The Wagner Group’s Social Footprint: A Time-Series Sentiment Analysis of PMC World</a></li>
                    <li class={tw`text-gray-600 dark:text-green-400 mb-2 text-xl ml-4`}>This paper explores the changing dynamics of conflict actors' engagement with domestic audiences, focusing on Prigozhin and the Wagner Group. It utilizes statistical methods and sentiment analysis of a VK channel to highlight the significance of their public orientation and reveals Prigozhin's increasing influence in Russian domestic affairs and potential impact on broader foreign policy, including the Russo-Ukrainian war.</li>
                </ul>
            </Layout>
        </div>
    );
}