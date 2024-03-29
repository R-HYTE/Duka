from flask import request, render_template, redirect, url_for, send_from_directory
from app import app, db
from app.models import Product, Shop
from sqlalchemy import inspect
import os
from werkzeug.utils import secure_filename
from datetime import datetime

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/my_shops', methods=['GET', 'POST'])
def my_shops():
    # Check if the Shop table exists
    inspector = inspect(db.engine)
    if 'shop' not in inspector.get_table_names():
        Shop.__table__.create(db.engine)

    if request.method == 'POST':
        name = request.form.get('name')
        location = request.form.get('location')
        
        if not name:
            return "Shop name is required", 400

        new_shop = Shop(name=name, location=location)
        
        db.session.add(new_shop)
        db.session.commit()
        
        return redirect(url_for('my_shops'))

    shops = Shop.query.all()
    return render_template('my_shops.html', shops=shops)


@app.route('/products', methods=['GET', 'POST'])
def products():
    # Check if the Product table exists
    inspector = inspect(db.engine)
    if 'product' not in inspector.get_table_names():
        Product.__table__.create(db.engine)

    if request.method == 'POST':
        # Get form data
        description = request.form.get('description')
        quantity = request.form.get('quantity')
        items = request.form.get('items')
        price_per_item = request.form.get('price_per_item')
        date_purchase_str = request.form.get('date_purchase')
        date_purchase = datetime.strptime(date_purchase_str, '%Y-%m-%d')

        # Handle image file upload
        if 'image' in request.files:
            image_file = request.files['image']
            if image_file.filename == '':
                image_path = None
            elif image_file and allowed_file(image_file.filename):
                filename = secure_filename(image_file.filename)
                # Save the file to the uploads folder
                image_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                # Store the relative path in the database
                image_path = filename # Store only the filename, without the path
            else:
                return "Invalid file format", 400
        else:
            image_path = None

        # Create a new product object
        new_product = Product(
            description=description,
            quantity=quantity,
            items=items,
            price_per_item=price_per_item,
            date_purchase=date_purchase,
            image_path=image_path
        )

        db.session.add(new_product)
        db.session.commit()
        return redirect(url_for('products'))

    # Fetch products from the database
    products = Product.query.all()

    return render_template('products.html', products=products)


@app.route('/sell')
def sell():
    # Fetch products from the database
    products = Product.query.all()
    return render_template('sell.html', products=products)