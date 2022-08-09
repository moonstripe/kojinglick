/** @jsx h */
import { h } from "preact"
import { tw } from "twind"
import { PageProps } from "fresh/server.ts"
import Layout from '../../components/Layout.tsx'
import CubeProduct from '../../islands/CubeProduct.tsx'
import { Meta } from '../../utils/types/index.ts'

export default ({ url }: PageProps) => {
    console.log('hello', url.pathname)

    const meta: Meta = {
        title: "KaiCube by Kojin",
        description: "A retro gaming powerhouse in a tiny frame.",
        type: "website"
    }
    return (
        <Layout meta={meta}>
            <CubeProduct pathname={url.pathname}/>
        </Layout>
    )
}