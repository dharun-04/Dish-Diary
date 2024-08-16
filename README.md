This project is a full-stack web application built using React for the frontend and Express.js with MongoDB for the backend. The frontend uses various packages such as Formik, Yup, FontAwesome, and React-Axios to create a sign-up page with form validation and file upload, a home page with a search bar to fetch data from Spoonacular API, and a profile page that displays user details and saved recipes.

The backend uses packages such as bcrypt, body-parser, cors, helmet, jsonwebtoken, mongoose, and multer to handle user authentication, password encryption, and database operations. It checks whether the user exists before storing the user's information in the database and uses JSON web tokens for secure communication between the client and server.

The Redux store is used to store the user's details, saved recipes, and the authentication token. The state is also persisted using Redux persist to ensure that the user's details are saved even after refreshing the page.

The application also has a recipe detail page that displays information such as cooking time, instructions, summary, and ingredients for each recipe. Users can save recipes to their profile, and the application provides a way to search for recipes based on keywords.

To use the application, users must first sign up with their name, email, password, and profile picture. Once signed in, they can search for recipes, save their favorite recipes, and view their saved recipes on their profile page. The application also provides a logout button to ensure the user's privacy and security.

