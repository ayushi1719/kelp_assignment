# Kelp Application

This is a Node.js application for managing and processing user data. It uploads user data from a CSV file, stores it in a PostgreSQL database, and calculates age group distributions for the users.

## Setup Instructions

### 1. **Clone the Repository**
First, clone the repository to your local machine [From 'main' branch]:

git clone --branch main https://github.com/ayushi1719/kelp_assignment.git --single-branch


### 2. **PostgreSQL DB setup**

Run the postgreSetup.sql script to create the database, user, and required table:

psql -U postgres -f postgreSetup.sql


### 3. **Set Up Environment Variables**

In the project root directory, create a .env file with the following content:

PORT = 4000

CSV_FILE_PATH = src/data/users_details.csv

DATABASE_URL=postgres://kelp_user:kelp@123@localhost:5432/kelp_db


### 4. **Install Dependencies**

npm install


### 5. **Hit the CSV to JSON Convertor API**

API Endpoint:
http://localhost:4000/kelpApi/load_data
