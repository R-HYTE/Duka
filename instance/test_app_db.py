import sqlite3

# Connect to the database
conn = sqlite3.connect('app.db')

# Create a cursor object
cursor = conn.cursor()

# Execute a query to retrieve all data from the Shop table
cursor.execute("SELECT * FROM Shop")

# Fetch all rows
rows = cursor.fetchall()

# Print the rows
for row in rows:
    print(row)

# Close the cursor and connection
cursor.close()
conn.close()