FROM python:3.11-alpine3.18

# Install build tools (Flask doesn’t need much, but safer to have gcc for other packages)
RUN apk add --no-cache gcc musl-dev libffi-dev

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application
COPY . .

# Expose the port Flask will run on
EXPOSE 5000

# Run the app
CMD ["python", "run.py"]