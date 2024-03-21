// Function to toggle navigation menu
function toggleMenu() {
  const menu = document.querySelector('.navigation-menu');
  menu.classList.toggle('active'); // Toggle the 'active' class
}

// Function to display the new shop form
function displayNewShopForm() {
  var newShopForm = document.getElementById('new-shop-form');
  newShopForm.classList.remove('hidden');

  // Blur the main content area
  var mainContent = document.querySelector('main');
  mainContent.classList.add('main-blurred');
}

// Function to handle shop form submission
function handleShopFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior

  var shopNameInput = document.getElementById('shop-name');
  var shopName = shopNameInput.value;

  var locationInput = document.getElementById('location');
  var location = locationInput.value;

  // Validate input fields if needed

  // Create a new shop object
  var newShop = {
    name: shopName,
    location: location,
    // Add additional properties for location based on GPS if needed
  };

  // Add the new shop to the list
  addNewShopToList(newShop);

  // Hide the form after submission
  var newShopForm = document.getElementById('new-shop-form');
  newShopForm.classList.add('hidden');

  // Remove blur from the main content area
  var mainContent = document.querySelector('main');
  mainContent.classList.remove('main-blurred');
}

// Function to add a new shop to the list
function addNewShopToList(newShop) {
  var shopList = document.querySelector('.shop-list ul');
  var listItem = document.createElement('li');
  listItem.innerHTML = `
    <span>${newShop.name}</span>
    <span>${newShop.location}</span>
    <button onclick="editShop()"><i class="fas fa-edit"></i></button>
    <button onclick="deleteShop()"><i class="fas fa-trash-alt"></i></button>
  `;
  shopList.appendChild(listItem);
}

// Event listener for the New Shop button
var newShopButton = document.getElementById('new-shop-button');
if (newShopButton) {
    newShopButton.addEventListener('click', displayNewShopForm);
}

// Event listener for shop form submission
var addShopForm = document.getElementById('add-shop-form');
if (addShopForm) {
  addShopForm.addEventListener('submit', handleShopFormSubmit);
}

// Function to close the new shop form
function closeNewShopForm() {
  var newShopForm = document.getElementById('new-shop-form');
  newShopForm.classList.add('hidden');

  // Remove blur from the main content area
  var mainContent = document.querySelector('main');
  mainContent.classList.remove('main-blurred');
}

// Function to display the add product form
function displayAddProductForm() {
  var addProductFormContainer = document.getElementById('add-product-form-container');
  addProductFormContainer.classList.remove('hidden');

  // Blur the main content area
  var mainContent = document.querySelector('main');
  mainContent.classList.add('main-blurred');
}

// Function to handle add product form submission
function handleAddProductFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior

  var productNameInput = document.getElementById('product-name');
  var productName = productNameInput.value;


  // Validate input fields if needed

  // Create a new product object
  var newProduct = {
    name: productName,
    // Add additional properties for product
  };


  // Add the new product to the list
  addNewProductToList(newProduct);

  // Hide the form after submission
  var addProductFormContainer = document.getElementById('add-product-form-container');
  addProductFormContainer.classList.add('hidden');

  // Remove blur from the main content area
  var mainContent = document.querySelector('main');
  mainContent.classList.remove('main-blurred');
}

// Function to add a new product to the list
function addNewProductToList(newProduct) {
  var productList = document.querySelector('.product-list');
  var listItem = document.createElement('li');
  listItem.innerHTML = `
    <span>${newProduct.name}</span>
  `;
  productList.appendChild(listItem);
}

// Event listener for the Add Product form submission
var addProductForm = document.getElementById('add-product-form');
addProductForm.addEventListener('submit', handleAddProductFormSubmit);

// Function to close the add product form
function closeAddProductForm() {
  var addProductFormContainer = document.getElementById('add-product-form-container');
  addProductFormContainer.classList.add('hidden');

  // Remove blur from the main content area
  var mainContent = document.querySelector('main');
  mainContent.classList.remove('main-blurred');
}

// Function to toggle cart display and blurred effect
function toggleCart() {
  const cart = document.querySelector('.cart');
  const mainContent = document.querySelector('main');
  cart.classList.toggle('hidden');
  mainContent.classList.toggle('main-blurred');
}