import sqlite3

def get_all_tables(cursor):
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    return [table[0] for table in tables]

def get_table_schema(cursor, table_name):
    cursor.execute(f"PRAGMA table_info({table_name});")
    schema = cursor.fetchall()
    return schema

def main(database_file):
    try:
        # Connect to the SQLite database
        connection = sqlite3.connect(database_file)
        cursor = connection.cursor()

        # Get all tables in the database
        tables = get_all_tables(cursor)

        # Display schema for each table
        for table in tables:
            print(f"Table: {table}")
            schema = get_table_schema(cursor, table)
            for column in schema:
                print(column)
            print()

    except sqlite3.Error as e:
        print("Error:", e)

    finally:
        if connection:
            connection.close()

if __name__ == "__main__":
    database_file = "app.db"  # Replace with your database file name
    main(database_file)