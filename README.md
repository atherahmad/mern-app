## MERN APPLICATION

### Target 
-   We will start building a fullstack application using React, express and MongoDB(will use mongoose)
-   We will implement the things that you have learnt yesterday in this app just for recap (speed).
-   We will learn new topics and implement them in our MERN app.

## What can our React Application can do ?

    -   We can register a user
    -   we can login a user
    -   User can update his profile
    -   User can Create a post
    -   User can update a post
    -   User can delete a post
    -   To design the components we will use `Bootstrap` 


##  Application Development


-   Create a mern-app folder
-   create to child folders named client and server
-   Inside the client folder run command `npm create vite@latest . -- --template react`
-   Inside the client directory run command `npm install`
-   To start react app run command `npm run dev`
-   Create a `components` folder inside the `client` folder
-   Clear the `main.js`
-   Create a `Register` component inside the components folder, containing a form having firstName, lastName, email and password fields.
-   Create a `NavBar` component inside the components folder, containing nav links.
-   Create a `Posts` component containing all posts
-   Create a `CreatePost` component, containing form elements having PostMessage field and a `submit` button ('Create Post')
-   Install the react router dom `npm i react-router-dom`
-   Install bootstrap with command `npm i bootstrap`
-   Add cdn link for bootstrap in `index.html`
-   `<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossorigin="anonymous"
/>`
   
-   Inside the `Register` component, import axios and inside the `submitHandler` make an API request using `POST` method
  with `axios` to register a user to the end point `/api/user/register`
-   In the backend server create `models`, `routes` and `controllers` folders
-   Inside the `models` folder create `userModel.js`, in which you need to first import the `mongoose` and then using the `mongoose` define a `userSchema`. Decide about the fields that you want to have in `userSchema` (Be sure that front end is sending values for those fields that are declared  `required:true`).
-   Then create `userModel` use mongoose, e.g. `const userModel =  new mongoose.model('User', userSchema)` from the above declared `userSchema`. And don't forget to export the `userModel`
-   In the `routes` folder create a `userRoutes.js`
-   First import express in this file to use the `express.Router()`
-   Then define `/register` end point with `POST` method that will be responsible to handle user registration requests coming from 
  front end`
-   In the controllers create `userControllers.js` and import the `userModel` at start of the file, then declare `registrationHandler` controller / function that will be responsible to store the user data (coming in req.body object) inside the database using the `userModel` (as it is was default export you can name it as `User`while importing) .
-   export this `registrationHandler`
-   In side the `userRoutes` import the `registrationHandler` and pass it as the call back to `/register` route. (like `router.post('/register', registrationHandler`)

-   Create a `Login` component inside components folder, containing a form having email and password fields
-   Using the `axios` post the email and password the backend to endpoint `/api/user/login`
-   Develop an route for `/login`in `userRoutes` and also develop `loginHandler` function in userControllers that will handle the
login request. Find a user in the `User` collection in the database where `email` and `password` are same that you received in `req.body`
-   If found send back the user object to the front end in response, if no user found throw 401- Invalid credential error
-   On frontend side if post request was successfully completed( promise accepted) then redirect the user to home page using
`useNavigator` hook from react.
-   Declare two state variables in `App.js` (authenticated, user) one to see either user is logged in and second to maintain the user details like name and _id. When Login is successful set the Authenticated to true and update the user also.

-   You need to share the global state of authenticated and user also to different components.
-   NavBar will have different links depending on the authenticated state variable value
-   As only logged in users can create posts
-   Develop a createPost component in react, through which user can create different posts.
-   we need to pass the title and text of the post to the backend and also the id of current logged in user
-   Create a route to handle createPost request on backend also create a model for the posts and `createPostHandler` controller in side the `postControllers.js`
-   That will be responsible to create new post inside the database(post document / schema should have title, text and owner fields)
-   After successfully posting the post you can redirect the user to the `/posts` route in react app.
-   in the `Posts` component , on first load fetch all the posts from the backend by defining some route and controller in backend
-   Back end will fetch all the posts from database and send back to frontend that will be an aray
-   Map the array of posts that you received from back end to render them using `bootstrap card` component or your own component.
-   It will be better to create a `PostCard` component and use it in `Posts` component to render all the posts.
-   In `PostCard` component add three buttons `delete` , `edit` and `reply`.
-   Make a check in `PostCard` component to see wether this current logged in user is the owner of the post or not
-   if he is the owner then show him `delete` and `edit` buttons
-   for other posts just show the `reply` button
-   Define and attach the `deleteHandler` event listener to the `delete` button for the event of `onClick`
-   When ever user click on delete button we will send the id of that specific post to the back end as params in an API request backend with delete method
-   Backend should listen to that request in `postRoutes.js` 
-   In postController declare a `postDeleteHandler` function that must get the id of the post in `params` and using that it should delete that specific `post` from the database.
-   In the `PostCard`component define `editHandler` and attach it to the `edit` button 
-   When user clicks that edit button he should be redirected to `/edit-post/:postId` route in react app
-   Surely you need to define above `route` in your react app and also need to create a`EditPost` component in react
-   When `EditPost` component is loaded it must get detail of that specific post from backend whose id it got in params
-   You need to build an endpoint in the back end that will send back the complete details of a specific post to frontend
-   Create a form in the editPost component similar to the form we used in `CreatePost`component.
-   the value of text boxes in this form will come from backend
-   User can update those values
-   After updating user will make a api request with patch method to backend with new updated values of the post
-   you need to define and endpoint on back end for it and controller that will update the specific post depending on its id on the data base.
