from flask import request, redirect, url_for, render_template
from app import app, db
from app.models import Shop

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/my_shops', methods=['GET', 'POST'])
def my_shops():
    if request.method == 'POST':
        name = request.form.get('name')
        location = request.form.get('location')
        
        # Ensure that the name field is not empty
        if not name:
            return "Shop name is required", 400
        
        new_shop = Shop(name=name, location=location)
        
        db.session.add(new_shop)
        db.session.commit()
        
        return redirect(url_for('my_shops'))

    shops = Shop.query.all()
    return render_template('my_shops.html', shops=shops)

@app.route('/stock')
def stock():
    return render_template('stock.html')

@app.route('/sell')
def sell():
    return render_template('sell.html')