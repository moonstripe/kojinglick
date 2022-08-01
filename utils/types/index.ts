import { ComponentChildren } from 'preact'

export interface Meta {
    title?: string,
    type?: string,
    description?: string,
    url?: string,
    image?: string,
    customMeta?: any
}


export interface LayoutProps {
    children: ComponentChildren,
    meta: Meta
}

