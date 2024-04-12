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
  var shopNameInput = document.getElementById('shop-name');
  var shopName = shopNameInput.value;
  var locationInput = document.getElementById('location');
  var location = locationInput.value;

  // Validate input fields if needed

  // Create a new shop object
  var newShop = {
    name: shopName,
    location: location,
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
  var shopRow = row.parentNode.parentNode;
  var shopName = shopRow.cells[0].textContent; // Get the shop name
  var editedShopName = prompt("Edit shop name:", shopName);
  var editedLocation = prompt("Edit location:", shopRow.cells[1].textContent);

  if (editedShopName !== null && editedLocation !== null) {
    // Send AJAX request to backend to edit shop
    fetch('/edit_shop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `shop_name=${encodeURIComponent(shopName)}&new_name=${encodeURIComponent(editedShopName)}&new_location=${encodeURIComponent(editedLocation)}`,
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Update UI if edit was successful
        shopRow.cells[0].textContent = editedShopName;
        shopRow.cells[1].textContent = editedLocation;
      } else {
        alert('Failed to edit shop: ' + data.error);
      }
    })
    .catch(error => {
      console.error('Error editing shop:', error);
      alert('An error occurred while editing shop.');
    });
  }
}


// Function to delete a shop entry
function deleteShop(row) {
  var shopRow = row.parentNode.parentNode;
  var shopName = shopRow.cells[0].textContent; // Get the shop name

  // Send AJAX request to backend to delete shop
  fetch('/delete_shop', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `shop_name=${encodeURIComponent(shopName)}`, // Pass the shop name
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Remove the row from the table if deletion was successful
      shopRow.parentNode.removeChild(shopRow);
    } else {
      alert('Failed to delete shop: ' + data.error);
    }
  })
  .catch(error => {
    console.error('Error deleting shop:', error);
    alert('An error occurred while deleting shop.');
  });
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
    <td class="add-to-cart"><button class="add-button">+</button></td>
    <td><img src="${newProduct.image}" alt="Product Image"></td>
    <td>${newProduct.description}</td>
    <td>${newProduct.quantity}</td>
    <td>${newProduct.items}</td>
    <td>${newProduct.pricePerItem}</td>
    <td>${newProduct.datePurchase}</td>
  `;
  productList.appendChild(newRow);
}


// Function to edit product details
function editProduct(productId) {
  // Send an AJAX request to fetch the complete product details
  fetch(`/get_product_details?id=${productId}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Populate the product form with the retrieved product details
        document.getElementById('barcode').value = data.product.barcode;
        document.getElementById('category').value = data.product.category;
        document.getElementById('description').value = data.product.description;
        document.getElementById('quantity').value = data.product.quantity;
        document.getElementById('items').value = data.product.items;
        document.getElementById('price-per-item').value = data.product.price_per_item;
        document.getElementById('date-purchase').value = data.product.date_purchase;
        document.getElementById('date-expiry').value = data.product.date_expiry;

        // Construct the full URL of the image
        var imageUrl = 'http://localhost:5000/uploads/' + data.product.image_path;

        // Check if the image element exists before setting its src
        var imageElement = document.getElementById('image');
        if (imageElement) {
          imageElement.src = imageUrl;
        } else {
          console.error('Image element not found');
        }


        // Display the product form
        displayAddProductForm();
      } else {
        alert('Failed to fetch product details: ' + data.error);
      }
    })
    .catch(error => {
      console.error('Error fetching product details:', error);
      alert('An error occurred while fetching product details.');
    });
}


function deleteProduct(productId) {
  // Confirm deletion with the user
  if (confirm("Are you sure you want to delete this product?")) {
      // Send AJAX request to delete the product
      fetch('/delete_product', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `product_id=${encodeURIComponent(productId)}`,
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              // Remove the product row from the table if deletion was successful
              const productRow = document.getElementById(`product-row-${productId}`);
              if (productRow) {
                  productRow.parentNode.removeChild(productRow);
              }
          } else {
              alert('Failed to delete product: ' + data.error);
          }
      })
      .catch(error => {
          console.error('Error deleting product:', error);
          alert('An error occurred while deleting product.');
      });
  }
}


// Function to add item to the cart
function addToCart(button) {
  var row = button.parentNode.parentNode;
  var description = row.cells[2].textContent;
  var quantity = parseInt(row.cells[3].textContent);
  var items = parseInt(row.cells[4].textContent);
  var pricePerItem = parseFloat(row.cells[5].textContent);
  var imageSrc = row.cells[1].querySelector('img').src;

  // Check if there are items available
  if (quantity > 0) {
    var cartItemList = document.querySelector('.cart .item-list');
    var subtotalAmount = document.getElementById('subtotal-amount');

    // Create a new cart item row
    var newRow = document.createElement('div');
    newRow.classList.add('cart-item');
    newRow.innerHTML = `
      <img src="${imageSrc}" alt="Product Image">
      <div class="cart-item-details">
        <div>
          <div class="cart-item-description">${description}</div>
          <button class="remove-button" onclick="removeFromCart(this)"><i class="fas fa-trash-alt"></i> Remove</button>
        </div>
        <div class="cart-item-actions">
          <button class="reduce-button">-</button>
          <div class="cart-item-quantity">1</div>
          <button class="increase-button">+</button>
        </div>
        <div class="cart-item-price">${pricePerItem.toFixed(2)}</div>
      </div>

    `;
    cartItemList.appendChild(newRow);

    // Update subtotal
    var subtotal = parseFloat(subtotalAmount.textContent);
    subtotal += pricePerItem;
    subtotalAmount.textContent = subtotal.toFixed(2);

  }
}


// Function to decrease quantity of items in cart
function reduceQuantity(button) {
  var cartItem = button.closest('.cart-item');
  var quantityElement = cartItem.querySelector('.cart-item-quantity');
  var subtotalAmount = document.getElementById('subtotal-amount');
  var subtotal = parseFloat(subtotalAmount.textContent);
  var pricePerItem = parseFloat(cartItem.querySelector('.cart-item-price').textContent);

  var quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity -= 1;
    quantityElement.textContent = quantity;
    subtotal -= pricePerItem;
    subtotalAmount.textContent = subtotal.toFixed(2);
  }
}


// Function to increase quantity of items in cart
function increaseQuantity(button) {
  var cartItem = button.closest('.cart-item');
  var quantityElement = cartItem.querySelector('.cart-item-quantity');
  var subtotalAmount = document.getElementById('subtotal-amount');
  var subtotal = parseFloat(subtotalAmount.textContent);
  var pricePerItem = parseFloat(cartItem.querySelector('.cart-item-price').textContent);

  var quantity = parseInt(quantityElement.textContent);
  quantity += 1;
  quantityElement.textContent = quantity;
  subtotal += pricePerItem;
  subtotalAmount.textContent = subtotal.toFixed(2);
}


// Event listener for the "Add to Cart" buttons
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('add-button')) {
    addToCart(event.target); // Pass the clicked button element
  }
  if (event.target.classList.contains('reduce-button')) {
    reduceQuantity(event.target);
  }
  if (event.target.classList.contains('increase-button')) {
    increaseQuantity(event.target);
  }
});


// Function to remove item from the cart
function removeFromCart(button) {
  var cartItem = button.closest('.cart-item');
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
  const file = event.target.files[0];
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