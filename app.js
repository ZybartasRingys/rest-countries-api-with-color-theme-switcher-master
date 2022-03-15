'use strict'

const cardsContainer = document.getElementById('cards-section')

// Themes
const dark = document.getElementById('Dark-mode')
const body = document.getElementById('body')
const navCol = document.querySelector('.navigation-col')
const whereText = document.querySelector('.where')
const darkText = document.querySelector('.dark')
const cardBody = document.querySelectorAll('.card-body')

const url = 'https://restcountries.com/v2/all'

let data = {}

// Dark and light theme

dark.addEventListener('click', switchDark)

// Switch to dark theme function

function switchDark() {
  body.classList.toggle('active')
  navCol.classList.toggle('active')
  whereText.classList.toggle('active')
  darkText.classList.toggle('active')

  cardBody.forEach(element => {
    console.log(element)
    element.classList.toggle('active')
  })
}

// API for cards functionality

//async fetch function

async function fetchCountry() {
  try {
    const response = await fetch(url)
    const country = await response.json()

    country.forEach(element => {
      cardsContainer.insertAdjacentHTML('beforeend', createCard(element))
    })

    country.forEach(element => {
      data[element.name] = element
    })
  } catch (error) {
    console.log(error)
  }
}

fetchCountry()

function createCard(element) {
  let title = element['name']
  let flag = element['flag']
  let population = element['population']
  let region = element['region']
  let capital = element['capital']

  return `
    <div class="card shadow  mb-5 bg-white rounded">
                <div class="card-image">
                <img class="flag" src="${flag}" alt="Flag">
                </div>
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text"><span>Population:</span> ${population}</p>
                  <p class="card-text"><span>Region:</span> ${region}</p>
                  <p class="card-text"><span>Capital:</span> ${capital}</p>
                </div>
              </div>
    `
}

createCard()
