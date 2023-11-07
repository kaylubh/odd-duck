'use strict';

const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
const productObjects = [];
let randomizedProductObjects = [];
const voteContainer = document.querySelector('#productImageContainer');
const productCandidatesPerRound = 3;

// Product constructor function
function Product(productName) {
  this.productName = productName;
  this.imgSrc = `img/${productName}.jpg`;
  this.views = 0;
  this.votes = 0;
}

// create Product objects
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

// render image elements for Products to vote on
function renderImgElements() {
  for (let i = 0; i < productCandidatesPerRound; i++) {
    const currentImgElement = document.createElement('img');
    voteContainer.appendChild(currentImgElement);
  }
}

// run application
createProductObjects();
shuffleProductObjects();
renderImgElements();
