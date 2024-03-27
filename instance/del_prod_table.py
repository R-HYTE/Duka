import sqlite3

def delete_product_table(conn):
    cursor = conn.cursor()
    try:
        cursor.execute("DROP TABLE IF EXISTS product")
        print("Product table deleted successfully")
    except sqlite3.Error as e:
        print(f"Error deleting product table: {e}")

def main():
    # Connect to the SQLite database
    conn = sqlite3.connect('app.db')

    # Delete the product table
    delete_product_table(conn)

    # Check available tables
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        print("Available tables:")
        for table in tables:
            print(table[0])
    except sqlite3.Error as e:
        print(f"Error checking available tables: {e}")

    # Close the database connection
    conn.close()

if __name__ == "__main__":
    main()