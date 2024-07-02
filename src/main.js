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
  console.log(inputText.value)
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