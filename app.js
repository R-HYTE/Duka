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

  // Add the new shop to the table
  addNewShopToTable(newShop);

  // Hide the form after submission
  var newShopForm = document.getElementById('new-shop-form');
  newShopForm.classList.add('hidden');

  // Remove blur from the main content area
  var mainContent = document.querySelector('main');
  mainContent.classList.remove('main-blurred');
}

// Function to add a new shop to the table
function addNewShopToTable(newShop) {
  var shopList = document.getElementById('shop-list');
  var newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${newShop.name}</td>
    <td>${newShop.location}</td>
    <td>
      <button onclick="editShop(this)"><i class="fas fa-edit"></i></button>
      <button onclick="deleteShop(this)"><i class="fas fa-trash-alt"></i></button>
    </td>
  `;
  shopList.appendChild(newRow);
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

  var description = document.getElementById('description').value;
  var quantity = document.getElementById('quantity').value;
  var items = document.getElementById('items').value;
  var pricePerItem = document.getElementById('price-per-item').value;
  var datePurchase = document.getElementById('date-purchase').value;


  // Validate input fields if needed

  // Create a new product object
  var newProduct = {
    description: description,
    quantity: quantity,
    items: items,
    pricePerItem: pricePerItem,
    datePurchase: datePurchase
    // Add additional properties for product
  };


  // Add the new product to the table
  addNewProductToTable(newProduct);

  // Hide the form after submission
  var addProductFormContainer = document.getElementById('add-product-form-container');
  addProductFormContainer.classList.add('hidden');

  // Remove blur from the main content area
  var mainContent = document.querySelector('main');
  mainContent.classList.remove('main-blurred');
}

// Function to add a new product to the table
function addNewProductToTable(newProduct) {
  var productList = document.querySelector('.product-list tbody');
  var newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${newProduct.description}</td>
    <td>${newProduct.quantity}</td>
    <td>${newProduct.items}</td>
    <td>${newProduct.pricePerItem}</td>
    <td>${newProduct.datePurchase}</td>
  `;
  productList.appendChild(newRow);
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

// Function to handle file input change and update image preview
function handleFileInputChange(event) {
  const file = event.target.files[0]; // Get the selected file
  const imagePreview = document.getElementById('product-image-preview');

  // Ensure that a file was selected and it's an image
  if (file && file.type.startsWith('image')) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Create a new image element
      const img = document.createElement('img');
      img.src = e.target.result; // Set the image source to the data URL
      img.alt = 'Product Image';

      // Clear previous content in the image preview container
      imagePreview.innerHTML = '';
      // Append the image to the image preview container
      imagePreview.appendChild(img);
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
}

// Event listener for file input change
const fileInput = document.getElementById('product-image');
if (fileInput) {
  fileInput.addEventListener('change', handleFileInputChange);
}