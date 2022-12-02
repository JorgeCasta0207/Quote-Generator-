const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');




let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}



// Show New Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(newQuote)

    // Check if Author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;

    }
    // Check Quote Length to Determine Quote Length
    if (quote.text.length > 120) {
        quoteText.classList.add('long-container');
    } else {
        quoteText.classList.remove('long-container');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}



//  Get Quotes From API
async function getQuotes() {
    showLoadingSpinner();
    const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiURL)
        apiQuotes = await response.json();
        newQuote();
        // throw new Error('Fuck maneee')
    } catch (error) {
        alert('Its Not Workin Pimp')
        getQuotes();
    }
    removeLoadingSpinner();
}

// Tweet Quote 
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?=
    ${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


getQuotes();