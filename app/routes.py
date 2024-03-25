from flask import jsonify
from app import app
from app.models import Product

@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    result = [{'name': product.name, 'description': product.description, 'quantity': product.quantity, 'price': product.price} for product in products]
    return jsonify({'products': result})

# Add more routes for CRUD operations as needed