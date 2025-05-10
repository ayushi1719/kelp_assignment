-- Step 1: Create the database
CREATE DATABASE kelp_db;

-- Step 2: Connect to the database
\c kelp_db

-- Step 3: Create the user
CREATE USER kelp_user WITH PASSWORD 'kelp@123';

-- Step 4: Grant privileges to the user
GRANT ALL PRIVILEGES ON DATABASE kelp_db TO kelp_user;

-- Step 5: Create the table
CREATE TABLE public.users (
  name VARCHAR NOT NULL,           
  age INT NOT NULL,
  address JSONB NULL,                
  additional_info JSONB NULL,       
  id SERIAL PRIMARY KEY              
);
