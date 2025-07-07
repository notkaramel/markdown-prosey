import './index.css'
import { marked } from "marked";
import exampleMarkdownFile from './example.md?url';

const inputText = document.getElementById("input");
const outputText = document.getElementById("output");

inputText.addEventListener("input", async () => {
  localStorage.setItem("input", inputText.value);
  marked.use({ renderer: { code: (code, language) => `<pre><code class="language-${language}">${code}</code></pre>` } });
  outputText.innerHTML = await marked(inputText.value);
});

document.addEventListener("DOMContentLoaded", async () => {
  inputText.value = localStorage.getItem("input") || "";
  outputText.innerHTML = await marked(inputText.value);
});


const downloadMarkdownButton = document.getElementById("download-md-button");

downloadMarkdownButton.addEventListener("click", () => {
  downloadFile(extractMarkdown(), "example.md");
})

function extractMarkdown() {
  return new Blob([inputText.value], {
    type: "text/markdown",
  });
}

/**
 * unfinished funciton :(
 * @returns a pdf file
 */
function createPDF() {
  console.log(outputText.value)
  let pdf = new Blob([JSON.stringify(outputText.value)], {
    type: "application/pdf",
  });
  console.log(pdf);
  return pdf;
}

function downloadFile(blob, fileName) {
  const aElement = document.createElement('a');
  const href = URL.createObjectURL(blob);

  aElement.download = fileName;
  aElement.href = href;
  aElement.target = "_blank";
  aElement.click();
  URL.revokeObjectURL(href);
};

const exampleMarkdown = document.getElementById("example-markdown-button");

// Getting the example markdown file
exampleMarkdown.addEventListener("click", async () => {
  inputText.value = await fetch(exampleMarkdownFile).then((response) => response.text());
  outputText.innerHTML = marked(inputText.value);
});

const copyToClipboard = document.getElementById("clipboard-button");
const copyToClipboardMsg = document.getElementById("clipboard-message");
copyToClipboard.addEventListener("click", async () => {
  const type = "text/plain";
  const text = extractMarkdown();
  const blob = new Blob([text], { type });
  const data = [new ClipboardItem({ [type]: blob })]; 2
  await navigator.clipboard.write(data);

  copyToClipboardMsg.hidden = false;
  setTimeout(() => {
    copyToClipboardMsg.hidden = true;
  }, 1000);
})


const viewOnGitHub = document.getElementById('view-on-github-button');
viewOnGitHub.addEventListener("click", () => {
  window.open("https://github.com/notkaramel/prosey-editor");
})

