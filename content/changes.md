# Big changes

1661146684

Deno just released a <a href="https://deno.com/blog/changes" target="_blank" rel="noopener noreferrer">fascinating  blog article</a> announcing new changes. There are two points that seemed extra interesting to me. First, looks like there's going to be a new HTTP server in Deno. Whoo.

More importantly, they've announced interoperability with npm packages in the next three months. WITHOUT `npm install` or /node_modules. Let's go!

I get that most people want Deno without any interface with Node, but the reality is that for the sake of critical mass adoption, Deno needs to be making all of the right decisions, even if it means accepting some old bad decisions. Mitigating the effect of Node overflow will look like exactly what they've promised: a /node_modules free life. 

> There will be no node_modules folder, no npm install; 
> the packages will be automatically downloaded in the Deno cache. 
> - <a href="https://deno.com/blog/changes" target="_blank" rel="noopener noreferrer">Deno</a>

Still, from this it's not super clear whether we'll need a package.json, though. I don't see why, if they'll be cached. 