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