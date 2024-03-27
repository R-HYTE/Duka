from app import app
from config import Config

UPLOAD_FOLDER = Config.UPLOAD_FOLDER

if __name__ == '__main__':
    app.run(debug=True)