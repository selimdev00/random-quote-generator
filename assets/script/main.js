'use strict'

const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'

const quoteText = document.getElementById('quote-text')
const quoteAuthor = document.getElementById('quote-author')
const newQuoteButton = document.getElementById('new-quote-button')
const box = document.getElementById('quote-box')

let loading = false

async function fetchRandomQuote() {
    const response = await fetch(RANDOM_QUOTE_API_URL)
    const data = await response.json()
    return { author: data.author, content: data.content }
}

function setLoading(status) {
    if (status) {
        box.classList.add('is-loading')
        loading = true
    } else {
        box.classList.remove('is-loading')
        loading = false
    }
}

async function loadingWithCallback(fn) {
    if (loading) return

    newQuoteButton.disabled = true

    setLoading(true)
    await fn()
    setLoading(false)

    newQuoteButton.disabled = false
}

async function appendQuoteToTemplate() {
    await loadingWithCallback(async () => {
        const {author, content } = await fetchRandomQuote()
        quoteText.innerHTML = content
        quoteAuthor.innerHTML = author
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    await appendQuoteToTemplate()

    newQuoteButton.addEventListener('click', async () => {
        await appendQuoteToTemplate()
    })
})