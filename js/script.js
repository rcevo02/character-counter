let textInput = document.getElementById("text-input");
let characterCount = document.getElementById("character-count");
let wordCount = document.getElementById("word-count");
let sentenceCount = document.getElementById("sentence-count");
let excludeSpaces = document.getElementById("exclude-spaces");
let charLimit = document.getElementById("character-limit");
let charLimitVal = document.getElementById("character-limit-value");

textInput.addEventListener("input", updateValue);
excludeSpaces.addEventListener("change", updateValue);
charLimit.addEventListener("change", updateValue);
charLimitVal.addEventListener("input", updateValue);

function updateValue() {
    if (excludeSpaces.checked) {
        characterCount.textContent = textInput.value.replace(/\s/g, "").length;
    } else {
        characterCount.textContent = textInput.value.length;
    }
    if (charLimit.checked) {
        charLimitVal.style.display = "inline-block";
        textInput.setAttribute("maxlength", charLimitVal.value);
        textInput.value = textInput.value.slice(0, charLimitVal.value);
    } else {
        charLimitVal.style.display = "none";
        textInput.setAttribute("maxlength", "10000");
    }
    wordCount.textContent = textInput.value.trim().split(/\s+/).length;
    sentenceCount.textContent = textInput.value.split(".").length - 1;
}

