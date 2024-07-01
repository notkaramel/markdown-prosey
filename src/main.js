import './index.css'
import './style.pcss'
import { marked } from "marked";

const inputText = document.getElementById("input");
const outputText = document.getElementById("output");

inputText.addEventListener("input", async () => {
  localStorage.setItem("input", inputText.value);
  outputText.innerHTML = await marked(inputText.value);
});

document.addEventListener("DOMContentLoaded", async () => {
  inputText.value = localStorage.getItem("input") || "";
  outputText.innerHTML = await marked(inputText.value);
});

// const uploadImageButton = document.getElementById("upload-image-button");

// uploadImageButton.addEventListener("click", () => {

// });

const downloadPDFButton = document.getElementById("download-pdf-button");

downloadPDFButton.addEventListener("click", () => {
  let pdf = createPDF();
  downloadFile(pdf, "example.pdf")
});

const downloadMarkdownButton = document.getElementById("download-md-button");

downloadMarkdownButton.addEventListener("click", () => {
  downloadFile(extractMarkdown(), "example.md");
})

function extractMarkdown() {
  return new Blob([JSON.stringify(inputText.value)], {
    type: "application/text",
  });
}

function createPDF() {
  let pdf = new Blob([JSON.stringify(outputText.innerHTML)], {
    type: "application/pdf",
  });
  console.log(pdf);
  return pdf;
}

function downloadFile(blob, fileName) {
  const aElement = document.createElement('a');
  aElement.setAttribute('download', fileName);
  const href = URL.createObjectURL(blob);
  aElement.href = href;
  // aElement.setAttribute('href', href);
  aElement.setAttribute('target', '_blank');
  aElement.click();
  URL.revokeObjectURL(href);
};