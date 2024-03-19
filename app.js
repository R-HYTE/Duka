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

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior

  var shopNameInput = document.getElementById('shop-name');
  var shopName = shopNameInput.value;

  // Validate input fields if needed

  // Create a new shop object
  var newShop = {
    name: shopName,
    // Add additional properties for location based on GPS if needed
  };

  // Add the new shop to the list
  addNewShopToList(newShop);

  // Hide the form after submission
  var newShopForm = document.getElementById('new-shop-form');
  newShopForm.classList.add('hidden');
}

// Function to add a new shop to the list
function addNewShopToList(newShop) {
  var shopList = document.querySelector('.shop-list ul');
  var listItem = document.createElement('li');
  listItem.innerHTML = `
    <span>${newShop.name}</span>
    <button onclick="editShop()"><i class="fas fa-edit"></i></button>
    <button onclick="deleteShop()"><i class="fas fa-trash-alt"></i></button>
  `;
  shopList.appendChild(listItem);
}

// Event listener for the New Shop button
var newShopButton = document.getElementById('new-shop-button');
newShopButton.addEventListener('click', displayNewShopForm);

// Event listener for form submission
var addShopForm = document.getElementById('add-shop-form');
addShopForm.addEventListener('submit', handleFormSubmit);

// Function to close the new shop form
function closeNewShopForm() {
  var newShopForm = document.getElementById('new-shop-form');
  newShopForm.classList.add('hidden');

  // Remove blur from the main content area
  var mainContent = document.querySelector('main');
  mainContent.classList.remove('main-blurred');
}