# WTWR (What to Wear?): Back End

**Deployed Project Domain:** https://whattowearproject.twilightparadox.com/

**Frontend GitHub Repository:** https://github.com/klport/se_project_react

**Project Pitch Video:** https://www.loom.com/share/b5641483532d47128ccd9aa211d88679

- Description of the project and its functionality:

This project is the backend (server) part of What to Wear, an app that helps users like or dislike clothing items. Users can “like” clothes they like and “dislike” clothes they don’t, so later the app can use this info to suggest outfits or keep track of favorites.

The backend stores clothing items and user likes in a database and provides routes (API endpoints) so the frontend can get and update this data.

- What It Does
  Lets a user like a clothing item (adds their ID to the item’s list of likes).

Lets a user dislike a clothing item (removes their ID from the item’s list of likes).

Checks if the item ID sent in the request is valid before trying to update it.

Sends back the updated item info after liking or disliking.

Handles errors when the item isn’t found or something goes wrong.

Uses simple middleware to pretend the user is logged in by adding a test user ID to each request.

- Description of the technologies and techniques used:

* Node.js and Express: Used to build the server and handle requests and responses.

* MongoDB and Mongoose: Database to store clothing items and users’ likes, with Mongoose helping to work with the data.

* Middleware: A function that adds a test user ID to each request so we can pretend the user is logged in.

Mongoose functions:

findByIdAndUpdate to add or remove likes from clothing items.

$addToSet to add a like only if it’s not already there.

$pull to remove a like.

ID validation: Uses mongoose.isValidObjectId() to check if the item ID looks right before trying to update.

Error handling: Catches errors and sends back clear messages if something goes wrong.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature
