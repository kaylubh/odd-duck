'use strict';

const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
let firstCandidateInstance;
let secondCandidateInstance;
let thirdCandidateInstance;
const firstCandidateImage = document.querySelector('#productImages img:first-child');
const secondCandidateImage = document.querySelector('#productImages img:nth-child(2)');
const thirdCandidateImage = document.querySelector('#productImages img:last-child');
const viewResultsButton = document.querySelector('#viewResults');
const newSessionButton = document.querySelector('#newSession');
const resultsList = document.querySelector('#resultsList');
let resultsChart;
let roundCounter = 0;
const maxRounds = 25;
const productLocalStorageKey = 'product-key';


// product constructor function
function Product(productName, imgSrc, views = 0, votes = 0) {
  this.productName = productName;
  this.imgSrc = imgSrc;
  this.views = views;
  this.votes = votes;
}
Product.allProducts = [];
Product.randomizedProducts = [];

// check if a local copy of products exists, if not then create product objects
function initProductObjects() {
  const storedProducts = localStorage.getItem(productLocalStorageKey);

  if (storedProducts) {
    loadProducts(storedProducts);
  } else {
    for (let product of productNames) {
      const currentProduct = new Product(product, `img/${product}.jpg`);
      Product.allProducts.push(currentProduct);
    }
    fixSweep();
  }
}

// load products and voting data from local storage
function loadProducts(storedProducts) {
  Product.allProducts.length = 0;

  const storedProductObjects = JSON.parse(storedProducts);
  for (let product of storedProductObjects) {
    const currentProduct = new Product(product.productName, product.imgSrc, product.views, product.votes);
    Product.allProducts.push(currentProduct);
  }
}

// fix "sweep" product imgSrc file extension
function fixSweep() {
  for (let i = 0; i < Product.allProducts.length; i++) {
    const currentProduct = Product.allProducts[i];
    if (currentProduct.productName === 'sweep') {
      currentProduct.imgSrc = 'img/sweep.png';
    }
  }
}

// randomize order of the productObjects array with the Fisher-Yates shuffle algorithm via ChatGPT
function shuffleProductObjects() {
  Product.randomizedProducts = Product.allProducts.slice();
  for (let i = Product.randomizedProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [Product.randomizedProducts[i], Product.randomizedProducts[j]] = [Product.randomizedProducts[j], Product.randomizedProducts[i]];
  }
}

// render products to be voted on
function renderProductCandidates() {
  if (roundCounter === maxRounds) {
    endVotingSession();
    return;
  }

  if (Product.randomizedProducts.length === 0) {
    shuffleProductObjects();
  }

  firstCandidateInstance = Product.randomizedProducts.pop();
  firstCandidateImage.setAttribute('src', firstCandidateInstance.imgSrc);
  firstCandidateImage.setAttribute('alt', firstCandidateInstance.productName);
  firstCandidateInstance.views++;

  if (Product.randomizedProducts.length === 0) {
    shuffleProductObjects();
  }

  secondCandidateInstance = Product.randomizedProducts.pop();
  secondCandidateImage.setAttribute('src', secondCandidateInstance.imgSrc);
  secondCandidateImage.setAttribute('alt', secondCandidateInstance.productName);
  secondCandidateInstance.views++;

  if (Product.randomizedProducts.length === 0) {
    shuffleProductObjects();
  }

  thirdCandidateInstance = Product.randomizedProducts.pop();
  thirdCandidateImage.setAttribute('src', thirdCandidateInstance.imgSrc);
  thirdCandidateImage.setAttribute('alt', thirdCandidateInstance.productName);
  thirdCandidateInstance.views++;
}

// add event listeners for votes (clicks) on displayed products
function initVoteEventListeners() {
  firstCandidateImage.addEventListener('click', firstCandidateVote);
  secondCandidateImage.addEventListener('click', secondCandidateVote);
  thirdCandidateImage.addEventListener('click', thirdCandidateVote);
}

// functions to handle votes for product candidates
function firstCandidateVote() {
  firstCandidateInstance.votes++;
  roundCounter++;
  renderProductCandidates();
}

function secondCandidateVote() {
  secondCandidateInstance.votes++;
  roundCounter++;
  renderProductCandidates();
}

function thirdCandidateVote() {
  thirdCandidateInstance.votes++;
  roundCounter++;
  renderProductCandidates();
}

// end voting sessions
function endVotingSession() {
  firstCandidateImage.removeEventListener('click', firstCandidateVote);
  secondCandidateImage.removeEventListener('click', secondCandidateVote);
  thirdCandidateImage.removeEventListener('click', thirdCandidateVote);

  viewResultsButton.addEventListener('click', renderResults);
  viewResultsButton.removeAttribute('disabled');

  saveProducts();
}

// save product and voting data to local storage
function saveProducts() {
  localStorage.setItem(productLocalStorageKey, JSON.stringify(Product.allProducts));
}

// render results from voting session
function renderResults() {
  for (let i = 0; i < Product.allProducts.length; i++) {
    const currentProduct = Product.allProducts[i];
    const result = `${currentProduct.productName} got ${currentProduct.votes} votes and was shown as an option ${currentProduct.views} times.`;
    const resultListItem = document.createElement('li');
    resultsList.appendChild(resultListItem);
    resultListItem.textContent = result;
  }

  viewResultsButton.removeEventListener('click', renderResults);
  viewResultsButton.setAttribute('disabled', true);
  newSessionButton.addEventListener('click', newVotingSession);
  newSessionButton.removeAttribute('disabled');
  renderResultsChart();
}

// display results in a bar chart
function renderResultsChart() {
  const productViews = [];
  const productVotes = [];

  for (let i = 0; i < Product.allProducts.length; i++) {
    productViews.push(Product.allProducts[i].views);
    productVotes.push(Product.allProducts[i].votes);
  }

  // chart settings
  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Views',
        data: productViews,
        borderWidth: 1,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)'
      },
      {
        label: 'Votes',
        data: productVotes,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgb(255, 159, 64)'
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          suggestedMax: 5,
          ticks: {
            stepSize: 1
          }
        }
      }
    },
  };

  // render chart
  const canvas = document.querySelector('#resultsChart');
  resultsChart = new Chart(canvas, config); //eslint-disable-line
}

// start a new voting session
function newVotingSession() {
  newSessionButton.removeEventListener('click', newVotingSession);
  newSessionButton.setAttribute('disabled', true);

  roundCounter = 0;
  resultsList.innerHTML = '';
  resultsChart.destroy();
  initVoteEventListeners();
  initProductObjects();
}




// calls all functions to start the app
function startApp() {
  initProductObjects();
  renderProductCandidates();
  initVoteEventListeners();
}

// run application
startApp();
