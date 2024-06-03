
This is an application for the OMDB movie database, where users can sign up, log in, search for movies, and create/manage their movie lists. The application is built with modern web technologies and hosted on Vercel.

Features
User authentication (signup, login)
Search for movies using OMDB API
Create and manage movie lists
Public and private movie lists
User profile management
Installation
Clone the repository:
Navigate to the project directory:

cd omdb-frontend
Install dependencies:
npm install
Start the development server:
npm start
Usage
Open your browser and go to http://localhost.
Sign up or log in with your credentials.
Use the search bar to find movies.
Create and manage your movie lists from the dashboard.

Endpoints
Signup
URL: /signup
Method: POST
Description: Create a new user account.
Body Parameters:
username: String, required
email: String, required
password: String, required
Login
URL: /login
Method: POST
Description: Log in to an existing user account.
Body Parameters:
email: String, required
password: String, required
Search Movies
URL: /home
Method: GET
Description: Search for movies using the OMDB API.
Query Parameters:
q: String, required (search query)
Movie Lists
URL: /lists
Method: GET, POST
Description: Get all movie lists (GET) or create a new movie list (POST).
Body Parameters for POST:
name: String, required
description: String, optional
public: Boolean, required
Movie List Details
URL: /lists/:id
Method: GET, PUT, DELETE
Description: Get details of a specific movie list (GET), update a movie list (PUT), or delete a movie list (DELETE).
Body Parameters for PUT:
name: String, required
description: String, optional
public: Boolean, required

Technologies Used
React.js
Redux
Axios
OMDB API
Node.js
Express.js
MongoDB
Vercel
