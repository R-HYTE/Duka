from app import db


class Shop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)


class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    barcode = db.Column(db.Text, nullable=False)
    category = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    items = db.Column(db.Integer, nullable=False)
    price_per_item = db.Column(db.Float, nullable=False)
    date_purchase = db.Column(db.Date, nullable=False)
    date_expiry = db.Column(db.Date, nullable=False)
    image_path = db.Column(db.String(200), nullable=True)