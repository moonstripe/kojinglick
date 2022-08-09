# Mapping Crypto: Part 2

1659493412

## Something a little better

Good news, everyone! (Futurama, anyone?) <a href="https://opencryptomap.deno.dev/" target="_blank" rel="noopener noreferrer">Crypto-Map: Ethereum</a> is now live!

<iframe id="opencryptomapframe"
    class="dark:text-green-400"
    title="Website shows a lattice of interactions on the latest Ethereum blockWebsite shows a lattice of interactions on the latest Ethereum block"
    width="100%"
    height="500px"
    src="https://opencryptomap.deno.dev/15292713">
</iframe>

Initial features include: ability to hover over a node and see the wallet address, and hover over an edge and see the amount sent. You can click and drag the network apart, and it's kind of fun!

In order to get relatively live data on the blockchain, I'm using <a href="https://www.alchemy.com/" target="_blank" rel="noopener noreferrer">Alchemy</a>'s JSON-RPC enabled web-socket service.

Also, I gave up on using Rust for the initial build. If this gains traction and I need 1,000,000 concurrent users, I'll readdress the languages question. Or just learn <a href="https://elixir-lang.org/" target="_blank" rel="noopener noreferrer">Elixir</a>. Good grief.

## Next Steps

### Making the UI better

It's nice to use d3, but under the hood, everything is spaghetti-code and weird transpilation of vanilla JS > Node.js > Typescript > Deno, so I need to make it a little more coherent.

### Not just the current block

Best case scenario, we constantly update a back-end database when a block is finalized. This way, users of the map could access historical data, as well as explore the current block.

### Actual realtime, not REST-lite

I may have said "web-socket" earlier, but I'm essentially using it like a REST-ful API service, where I just ask the alchemy endpoint for data on page load. Next, I want a system that subscribes to real-time additions to the block, and then animate the svg as it populates. Pie-in-the-sky stuff here.

## To bigger and better maps

I can't wait to bring this to next semester's De-Fi and Web3 class.