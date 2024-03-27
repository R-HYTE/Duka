from app import app, db
from app.models import Product

# Create the application context
app.app_context().push()

# Create all tables in the database
db.create_all()

# Query all products from the database
products = Product.query.all()

# Print details of each product
for product in products:
    print(f"Product ID: {product.id}")
    print(f"Description: {product.description}")
    print(f"Quantity: {product.quantity}")
    print(f"Items: {product.items}")
    print(f"Price per Item: {product.price_per_item}")
    print(f"Date of Purchase: {product.date_purchase}")
    print(f"Image Path: {product.image_path}")
    print("---------------------------------------------")