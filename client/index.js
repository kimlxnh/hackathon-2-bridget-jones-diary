const entryForm = document.querySelector('#form')
const entryList = document.querySelector('#list')
const searchCategory = document.querySelector('#search-category')
const searchDate = document.querySelector('#search-date')
const messageStatus = document.querySelector('#message')

entryForm.addEventListener("submit", newEntry)
searchCategory.addEventListener('input', searchEntry)
searchDate.addEventListener('input', )

const api = 'http://localhost:3002/post'
let entries = [] 

async function loadPost() {
  
        const response = await fetch(api)
        const entries = await response.json()
        showEntry(entries)

}

function showEntry(e) {
    entryList.removeChildren() // clears the example
    entries.forEach(e => {
        const card = document.createElement('div')
        card.className = 'card card-body mb-2'
        card.textContent = e.entry_date + '|' + e.text  + '|' + e.category ;
        entryList.appendChild(card)
    })
    
}

loadPost()