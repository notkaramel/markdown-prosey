import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank"> Vite </a>
    <a href="https://www.typescriptlang.org/" target="_blank"> TypeScript </a>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
<script>
    // import { writable } from "svelte/store";
    import ContentBlock from "components/ContentBlock.svelte";
    import { marked } from "marked";
    // const markdown = writable(0);
    // const placeholder =
    let markdown =
        "## Hello, world!\n this is a *very* `powerful` **markdown** editor.\n## Like no joke\n- It's\n- **really**\n- _good_";
</script>

<title>Markdown Editor</title>
<ContentBlock>
    <h1 class="font-bold text-4xl font-mono">Markdown editor</h1>
    <div
        class="grid auto-rows-fr grid-flow-row lg:grid-flow-col lg:auto-cols-fr lg:gap-12"
    >
        <ContentBlock>
            <textarea
                class="textarea textarea-secondary w-full font-mono mx-6 text-base min-h-full lg:min-w-1/2 lg:text-xl bg-base-200"
                bind:value={markdown}
            ></textarea>
        </ContentBlock>
        <ContentBlock>
            <article class="prose lg:prose-xl base-content border-2">
                {@html marked(markdown)}
            </article>
        </ContentBlock>
    </div>
</ContentBlock>
