
# OMDB Movie Database Application

This is an application for the OMDB movie database, where users can sign up, log in, search for movies, and create/manage their movie lists. The application is built with modern web technologies and hosted on Vercel.

## Features

- **User Authentication**: Signup, login
- **Search Movies**: Using the OMDB API
- **Create and Manage Movie Lists**: Public and private movie lists
- **User Profile Management**

## Installation

**Go to Url**
https://omdb-frontend-oc49.vercel.app/signup

## Usage

1. Open your browser and go to \`https://omdb-frontend-oc49.vercel.app/signup`.
2. Sign up or log in with your credentials.
3. Use the search bar to find movies.
4. Create and manage your movie lists from the dashboard.

## Endpoints

### Signup

- **URL**: \`/signup\`
- **Method**: \`POST\`
- **Description**: Create a new user account.
- **Body Parameters**:
  - \`FirstName\`: \`String\`, required
  - \`LastName\`: \`String\`, required
  - \`email\`: \`String\`, required
  - \`password\`: \`String\`, required

### Login

- **URL**: \`/login\`
- **Method**: \`POST\`
- **Description**: Log in to an existing user account.
- **Body Parameters**:
  - \`email\`: \`String\`, required
  - \`password\`: \`String\`, required

### Search Movies

- **URL**: \`/home\`
- **Method**: \`GET\`
- **Description**: Search for movies using the OMDB API.
- **Query Parameters**:
  - \`q\`: \`String\`, required (search query)

### Movie Lists

- **URL**: \`/lists\`
- **Method**: \`GET\`, \`POST\`
- **Description**: Get all movie lists (GET) or create a new movie list (POST).


### Movie List Details

- **URL**: \`/lists/:id\`
- **Method**: \`GET\`, \`PUT\`, \`DELETE\`
- **Description**: Get details of a specific movie list (GET) or delete a movie list (DELETE).
- **Body Parameters for PUT**:
  - \`name\`: \`String\`, required
  - \`description\`: \`String\`, optional
  - \`public\`: \`Boolean\`, required

## Technologies Used

- **Frontend**:
  - React.js
  - Redux
  - Axios

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB

- **Hosting**:
  - Vercel
  - Heroku
