const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loading

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new quote
function newQuote() {
  // Call Loading Function again for second, third etc. time the button is clicked
  showLoadingSpinner();
  // Pick a random quote from API quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if author field is blank and replace it with 'Unknown'
  if (!quote.author || quote.author === "type.fit") {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = extractTextBeforeLastComma(quote.author);
  }

  // Check quote length to determine styling

  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  // Remove Loader and show text
  removeLoadingSpinner();
}

// Get quotes API

async function getQuotes() {
  // Call Loading Function
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank"); //_blank is going to allow the Twitter window to open in a new tab
}
// Extract everything before the last comma
function extractTextBeforeLastComma(inputText) {
  // Find the index of the last comma
  const lastCommaIndex = inputText.lastIndexOf(",");

  // Check if a comma was found
  if (lastCommaIndex !== -1) {
    // Extract the text before the last comma
    const extractedText = inputText.substring(0, lastCommaIndex);

    // Trim any extra white spaces
    const trimmedText = extractedText.trim();

    return trimmedText;
  } else {
    // If no comma was found, return the original text
    return inputText;
  }
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load (Basically run the function as soon as the page loads)
getQuotes();
