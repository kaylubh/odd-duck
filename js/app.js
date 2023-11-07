'use strict';

const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
const productObjects = [];
let randomizedProductObjects = [];
let firstCandidateInstance;
const firstCandidateImage = document.querySelector('#productImages img:first-child');
let secondCandidateInstance;
const secondCandidateImage = document.querySelector('#productImages img:nth-child(2)');
let thirdCandidateInstance;
const thirdCandidateImage = document.querySelector('#productImages img:last-child');


// product constructor function
function Product(productName) {
  this.productName = productName;
  this.imgSrc = `img/${productName}.jpg`;
  this.views = 0;
  this.votes = 0;
}

// create product objects
function createProductObjects() {
  for (let i = 0; i < productNames.length; i++) {
    const currentProduct = new Product(productNames[i]);
    productObjects.push(currentProduct);
  }
}

// randomize order of the productObjects array with the Fisher-Yates shuffle algorithm
function shuffleProductObjects() {
  randomizedProductObjects = productObjects.slice();
  for (let i = randomizedProductObjects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomizedProductObjects[i], randomizedProductObjects[j]] = [randomizedProductObjects[j], randomizedProductObjects[i]];
  }
}

// render products to be voted on
function renderProductCandidates() {
  firstCandidateInstance = randomizedProductObjects.pop();
  firstCandidateImage.setAttribute('src', firstCandidateInstance.imgSrc);
  firstCandidateImage.setAttribute('alt', firstCandidateInstance.productName);
  firstCandidateInstance.views++;

  secondCandidateInstance = randomizedProductObjects.pop();
  secondCandidateImage.setAttribute('src', secondCandidateInstance.imgSrc);
  secondCandidateImage.setAttribute('alt', secondCandidateInstance.productName);
  secondCandidateInstance.views++;

  thirdCandidateInstance = randomizedProductObjects.pop();
  thirdCandidateImage.setAttribute('src', thirdCandidateInstance.imgSrc);
  thirdCandidateImage.setAttribute('alt', thirdCandidateInstance.productName);
  thirdCandidateInstance.views++;
}

// functions to handle votes for product candidates
function firstCandidateVote() {
  firstCandidateInstance.votes++;
  renderProductCandidates();
}

function secondCandidateVote() {
  secondCandidateInstance.votes++;
  renderProductCandidates();
}

function thirdCandidateVote() {
  thirdCandidateInstance.votes++;
  renderProductCandidates();
}

// run application
createProductObjects();
shuffleProductObjects();
renderProductCandidates();

// event listeners for clicks (votes)
firstCandidateImage.addEventListener('click', firstCandidateVote);
secondCandidateImage.addEventListener('click', secondCandidateVote);
thirdCandidateImage.addEventListener('click', thirdCandidateVote);
