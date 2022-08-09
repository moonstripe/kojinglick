/** @jsx h */
import { h } from "preact"
import { tw } from "twind"
import { PageProps } from "fresh/server.ts"
import Layout from '../../components/Layout.tsx'
import KaiCubeProduct from '../../islands/KaiCubeProduct.tsx'
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
            <KaiCubeProduct pathname={url.pathname}/>
        </Layout>
    )
}