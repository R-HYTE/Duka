from flask import render_template
from flask import jsonify
from app import app
from app.models import Product

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/my_shops')
def my_shops():
    # Placeholder function for my_shops endpoint
    return render_template('my_shops.html')

@app.route('/sell')
def sell():
    # Placeholder function for sell endpoint
    return render_template('sell.html')

@app.route('/stock')
def stock():
    # Placeholder function for sell endpoint
    return render_template('stock.html')

@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    result = [{'name': product.name, 'description': product.description, 'quantity': product.quantity, 'price': product.price} for product in products]
    return jsonify({'products': result})

# Add more routes for CRUD operations as needed