# Mapping Crypto: Part 1

1659407012

## A Long Time Coming

I've been poking at this project for a couple of months now. It started with a study of the <a href="https://docs.rs/petgraph/latest/petgraph/" target="_blank" rel="noopener noreferrer">petgraph</a> crate to try to build a backend storage/graph builder service. A month or so later, I learned about <a href="https://developers.cloudflare.com/web3/ethereum-gateway/" target="_blank" rel="noopener noreferrer">Cloudflare's Ethereum Gateway</a>. Since I have a couple of websites already using Cloudflare anti-DDoS services, I just attached a gateway to one of my domains. Finally, I got off my butt today to try to make at least *something* that works.

## My Embarrasing Tangle of Tech

### Oak: a server engine for Deno

I'm. Learning. Deno. I don't know why I'm now insisting I do everything in Deno and Typescript, but so be it. Quickly ran through the Oak docs, and built a REST API relay for the ethereum gateway. This is an entirely unnecessary step which can be replaced by something in <a href="https://actix.rs/" target="_blank" rel="noopener noreferrer">Actix Web</a> or something. Right now, it gets the current block number, retrieves the transactions from the block and serializes the information into json for Rust.

### Petgraph Rust: building the graph

My main.rs is very simple. One function reads the json and deserializes it into Rust structs. Another turns those Rust structs into a node-based graph. 

### Graphviz Dot Utility: gui is just svg

The laziest step is using Graphviz's <a href="https://graphviz.org/doc/info/command.html" target="_blank" rel="noopener noreferrer">Dot</a> Utility to generate the graph.

This is what it looks like.

![A map of wallet addresses](/img/crypto_map.png)

But, it exists. Next steps are replacing the Oak demo with a Rust service, and then using Typescript and Fresh or React for the front-end. 