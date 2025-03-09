const textInput = document.getElementById("text-input");
const characterCount = document.getElementById("character-count");
const wordCount = document.getElementById("word-count");
const sentenceCount = document.getElementById("sentence-count");
const excludeSpaces = document.getElementById("exclude-spaces");
const charLimit = document.getElementById("character-limit");
const charLimitVal = document.getElementById("character-limit-value");
const noLetters = document.getElementById("no-letters");
const letterChart = document.getElementById("letter-chart");
const ctx = document.getElementById('myChart');
const ctxContainer = document.getElementById('myChart-container');
ctxContainer.style.display = "none";
let myChart = null;

// Eventlisteners for input change, or change of checkbox
textInput.addEventListener("input", updateValue);
excludeSpaces.addEventListener("change", updateValue);
charLimit.addEventListener("change", updateValue);
charLimitVal.addEventListener("input", updateValue);

// Function that count letters, words and sentences and for eventlisteners when they detect change
function updateValue() {
    let letterCountInput = textInput.value;
    let letterCounts = {};
    letterChart.innerHTML = "";
    let letters = [];
    let letterAmount = [];
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

    for (let char of letterCountInput) {
        if (/[a-zA-Z]/.test(char)) {
            let lowerChar = char.toLowerCase();
            letterCounts[lowerChar] = (letterCounts[lowerChar] || 0) + 1;
        }
    }

    let sortedEntries = Object.entries(letterCounts).sort();

    sortedEntries.forEach(([letter, count]) => {
        letters.push(letter);
        letterAmount.push(count);
    });

    // Foreach loop out letters in a chart
    Object.entries(letterCounts).forEach(([letter, count]) => {
        console.log(letter, count);
        letters.push(letter);
        letterAmount.push(count);
    });

    wordCount.textContent = textInput.value.trim().split(/\s+/).length;
    sentenceCount.textContent = textInput.value.split(". ").length - 1;
    if (myChart) {
        myChart.destroy();
        noLetters.style.display = "none";
        ctxContainer.style.display = "block";
    }
    myChart = new Chart(ctx, {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
            labels: letters,
            datasets: [{
                backgroundColor: '#2e6489',
                data: letterAmount,
                datalabels: {
                    anchor: 'end',
                    align: 'center',
                    color: '#f2f3f8',
                    font: {
                        weight: 'semibold',
                    },
                    formatter: function (value, context) {
                        return value;
                    }
                }
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,

        },
    });
};