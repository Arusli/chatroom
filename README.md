# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Notes
Q: How does the app know if a user is logged out or in? It can add users to the chat but can it remove?
A: Firebase realtime db has event listeners.

## Data flow happy login
set currentUser with a useRef, assigning it the sessionStorage if exists.
Push User to realtime DB when logging in.
onValue knows if userDb was changed, pulls new users and updates users state.
When users state changes, check currentUser with DB users. If same, update currentUser with newId... (maybe just use a uuid so we can avoid needing to update currentUser with newId.. or we can use a createdAt and match them that way.)

## Data flow leave app with back button, returns
(setUserDisconnect should be called when the currentUser is updated...)
On disconnect with DB (onDisconnect), the currentUser is set to online: false. 
Can we just remove the node instead? That would be easier. 
Then I wouldn't need the onValue listener to pull the users, check for offline users, and removeUser. Yes it can:
```
import { ref, onDisconnect, remove } from 'firebase/database';
import { db } from './yourFirebaseConfig'; // Import your Firebase configuration

export const setUserDisconnect = async (user) => {
  console.log("setUserDisconnect runs");
  try {
    const userReference = ref(db, `users/${user.id}`);
    await onDisconnect(userReference).remove();
  } catch (e) {
    console.error(e);
  }
};
```
Then when user returns (onReconnect or similar), the currentUser is set to online: true. 
But in some situations, the user would have been already deleted, 
and we'd need to push a new User... 
we could consider getting rid of the deleteUser functionality and keep record of all users in the Db.
OR
we always delete user onDisconnect, and always create new user on Connect.
Q: would other users list get updated when user is deleted?
A: I think so, because of onValue listener.
In that case we can add a push a newUser onConnect (using this):
```
import { ref, onValue } from 'firebase/database';
import { getDatabase } from 'firebase/app';

function setupConnectionListener() {
  const db = getDatabase();
  const connectedRef = ref(db, '.info/connected');

  onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
      console.log('Connected to Firebase');
      // Perform actions after connecting
    } else {
      console.log('Disconnected from Firebase');
      // Handle disconnection
    }
  });
}

// Call this function in your component or at the start of your app
setupConnectionListener();
```
Everytime a user connects we push the currentUser (unless currentUser is empty...), 
because we always delete user onDisconnect.

The issue with this is, the pushMessage (status: exit) doesn't run now,
now that we skipped the online: false step. 
How do we fix this? 
We could write a message to the messages db onDisconnect
We'll need to create an empty message node with push, and backfill it (with exit) onDisconnect
Because that's how onDisconnect works.
This will cause the message nodes to be out of chronological order, but that's okay because
we can order them by createdAt.

Connect:
onValue connection listener (setUserDisconnect settings: create entrance message, create blank exit message, add user) > 
onValue DB listener (fetch updated user/message state)

Disconnect:
onDisconnect connection listener (delete user, backfill exit message) > onValue DB listener (fetch updated user state, message state)

Reconnect (should be same as connect):
onValue connection listener (setUserDisconnect settings: create entrance message, create blank exit message, add user) > 
onValue DB listener (fetch updated user/message state)

### if sessionUser not blank
- push sessionUser (currentUser?) to DB
- push entrance message to DB
- push blank exit message to DB (status: exit)
- set up onDisconnect logic (delete user from DB, backfill exit message

### if sessionUser blank
- do not set sessionUSer until login
- do not push sessionUSer to DB until login
- do not push entrance message to DB until login
- do not push blank exit message to DB until login
- do not set up onDisconnect logic (delete user from DB, backfill exit message) until logi