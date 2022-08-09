import { Handlers, HandlerContext } from "fresh/server.ts"

export const handler: Handlers = {
    GET(req: Request, _ctx: HandlerContext) {
        console.log(req)

        const headers = new Headers({
            location: new URL(req.url).origin+'/products',
        });
        return new Response(null, {
            status: 302,
            headers,
        });
    }
}