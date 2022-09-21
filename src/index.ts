import {getAssetFromKV} from "@cloudflare/kv-asset-handler";
// @ts-ignore defined by workers
import manifestJSON from '__STATIC_CONTENT_MANIFEST'

const assetManifest = JSON.parse(manifestJSON)

export interface Env {
    __STATIC_CONTENT: KVNamespace;
}

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        const {pathname} = new URL(request.url);

        try {
            // Bypass dist and assets folder
            if (pathname.startsWith("/_dist") || pathname.startsWith('/_assets')) {
                const asset = await getAssetFromKV(
                    {
                        request,
                        waitUntil(promise) {
                            return ctx.waitUntil(promise)
                        },
                    },
                    {
                        ASSET_NAMESPACE: env.__STATIC_CONTENT,
                        ASSET_MANIFEST: assetManifest
                    },
                )

                return new Response(asset.body)
            }

            const page = await getAssetFromKV(
                {
                    request,
                    waitUntil(promise) {
                        return ctx.waitUntil(promise)
                    },
                },
                {
                    mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
                    ASSET_NAMESPACE: env.__STATIC_CONTENT,
                    ASSET_MANIFEST: assetManifest
                },
            )

            return new Response(page.body, {status: 503})
        } catch (e) {
            return new Response("Something went wrong", {
                status: 500
            })
        }
    },
};
