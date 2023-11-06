'use strict';

const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
const productObjects = [];

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

createProductObjects();
