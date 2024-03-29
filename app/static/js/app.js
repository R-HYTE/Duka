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
  // event.preventDefault(); // Prevent default form submission behavior

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

// Function to edit shop details
function editShop(row) {
  // Get the row containing the shop details
  var shopRow = row.parentNode.parentNode;
  
  // Get the shop name and location from the row
  var shopName = shopRow.cells[0].textContent;
  var location = shopRow.cells[1].textContent;

  // Prompt the user to edit the shop details
  var editedShopName = prompt("Edit shop name:", shopName);
  var editedLocation = prompt("Edit location:", location);

  // Update the table with the edited details if the user provided new values
  if (editedShopName && editedLocation) {
    shopRow.cells[0].textContent = editedShopName;
    shopRow.cells[1].textContent = editedLocation;
  }
}

// Function to delete a shop entry
function deleteShop(row) {
  // Get the row containing the shop details
  var shopRow = row.parentNode.parentNode;
  
  // Remove the row from the table
  shopRow.parentNode.removeChild(shopRow);
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
  // event.preventDefault(); // Prevent default form submission behavior

  var image = document.getElementById('product-image-preview').querySelector('img');
  var description = document.getElementById('description').value;
  var quantity = document.getElementById('quantity').value;
  var items = document.getElementById('items').value;
  var pricePerItem = document.getElementById('price-per-item').value;
  var datePurchase = document.getElementById('date-purchase').value;


  // Validate input fields if needed

  // Create a new product object
  var newProduct = {
    image: image ? image.src : '',
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
    <td class="add-to-cart"><button class="add-button" onclick="addToCart(this)">+</button></td>
    <td><img src="${newProduct.image}" alt="Product Image"></td>
    <td>${newProduct.description}</td>
    <td>${newProduct.quantity}</td>
    <td>${newProduct.items}</td>
    <td>${newProduct.pricePerItem}</td>
    <td>${newProduct.datePurchase}</td>
  `;
  productList.appendChild(newRow);
}

// Function to add item to the cart
function addToCart(button) {
  console.log("Adding item to cart...");
  var row = button.parentNode.parentNode;
  var description = row.cells[2].textContent;
  var quantity = parseInt(row.cells[3].textContent);
  var items = parseInt(row.cells[4].textContent);
  var pricePerItem = parseFloat(row.cells[5].textContent);
  var imageSrc = row.cells[1].querySelector('img').src;

  console.log("Description:", description);
  console.log("Quantity:", quantity);
  console.log("Items:", items);
  console.log("Price Per Item:", pricePerItem);
  console.log("Image Source:", imageSrc);

  // Check if there are items available
  if (quantity > 0) {
    console.log("Item added to cart!");
    var cartItemList = document.querySelector('.cart .item-list');
    var subtotalAmount = document.getElementById('subtotal-amount');

    // Create a new cart item row
    var newRow = document.createElement('div');
    newRow.classList.add('cart-item');
    newRow.innerHTML = `
      <img src="${imageSrc}" alt="Product Image">
      <div class="cart-item-details">
        <div class="cart-item-description">${description}</div>
        <button class="remove-button" onclick="removeFromCart(this)">Remove</button>
        <div class="cart-item-price">${pricePerItem}</div>
      </div>
    `;
    cartItemList.appendChild(newRow);

    // Update subtotal
    var subtotal = parseFloat(subtotalAmount.textContent);
    subtotal += pricePerItem;
    subtotalAmount.textContent = subtotal.toFixed(2);

    // Update quantity and items
    quantity -= 1;
    items += 1;
    row.cells[3].textContent = quantity;
    row.cells[4].textContent = items;
  } else {
    alert('No more items available');
  }
}

// Function to remove item from the cart
function removeFromCart(button) {
  var cartItem = button.parentNode.parentNode;
  var price = parseFloat(cartItem.querySelector('.cart-item-price').textContent);
  var subtotalAmount = document.getElementById('subtotal-amount');
  var subtotal = parseFloat(subtotalAmount.textContent);
  
  // Update subtotal
  subtotal -= price;
  subtotalAmount.textContent = subtotal.toFixed(2);

  // Remove the cart item from the DOM
  cartItem.parentNode.removeChild(cartItem);
}

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

// Event listener for the "+" buttons
var addButtonList = document.querySelectorAll('.add-button');
addButtonList.forEach(function(button) {
  button.addEventListener('click', function() {
    addToCart(this); // Pass the button element as an argument
  });
});