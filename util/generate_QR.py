#!/usr/bin/env python

import os
import qrcode
import platform

# Generate and save the QR code
img = qrcode.make("https://r-hyte.github.io/Duka/")
img_path = "../app/static/images/qr.png"
img.save(img_path, "PNG")

# Open the saved image with the default image viewer
def open_image(file_path):
    if platform.system() == "Darwin":       # macOS
        os.system(f"open {file_path}")
    elif platform.system() == "Windows":    # Windows
        os.system(f"start {file_path}")
    elif platform.system() == "Linux":      # Linux
        os.system(f"xdg-open {file_path}")
    else:
        raise OSError("Unsupported operating system")

open_image(img_path)