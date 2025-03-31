import './index.css'
import { marked } from "marked";
import katex from 'katex';

const inputText = document.getElementById("input");
const outputText = document.getElementById("output");

inputText.addEventListener("input", async () => {
  localStorage.setItem("input", inputText.value);
  marked.use({ renderer: { code: (code, language) => `<pre><code class="language-${language}">${code}</code></pre>` } });
  outputText.innerHTML += inputText.value.replace(/\$\$(.*?)\$\$/g, processMath);
  outputText.innerHTML = await marked(inputText.value);
});

function processMath(segments) {
  const math = segments;
  try {
    return katex.renderToString(math, { throwOnError: false });
  } catch (error) {
    return `<span style="color: red;">${error.toString()}</span>`;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  inputText.value = localStorage.getItem("input") || "";
  outputText.innerHTML = await marked(inputText.value);
});

const folderButton = document.getElementById('folder-button');
const folderFilesView = document.getElementById('folder-files')
let folderOpen = false;
folderButton.addEventListener("click", () => {
  folderFilesView.toggleAttribute('hidden');
})

// const uploadImageButton = document.getElementById("upload-image-button");
// uploadImageButton.addEventListener("click", () => {
// });

// const downloadPDFButton = document.getElementById("download-pdf-button");
// downloadPDFButton.addEventListener("click", () => {
//   let pdf = createPDF();
//   downloadFile(pdf, "example.pdf")
// });

const downloadMarkdownButton = document.getElementById("download-md-button");

downloadMarkdownButton.addEventListener("click", () => {
  downloadFile(extractMarkdown(), "example.md");
})

function extractMarkdown() {
  return new Blob([inputText.value], {
    type: "text/markdown",
  });
}

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

exampleMarkdown.addEventListener("click", async () => {
  // Getting the example markdown file from `public` folder
  // Hardcoded path for the build, fix later :)v
  inputText.value = await fetch("/prosey-editor/example.md").then((response) => response.text());
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

