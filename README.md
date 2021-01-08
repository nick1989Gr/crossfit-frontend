# Crossfit App - React Frontend

This is a pet project for the frontend of a crossfit application.
The application has the following functionalities:

- A user can log in using Oauth2 and OpenID (Auth0 is being used as authentication and authorization server)
- A authorized user can see all the registered athletes
- A user can get information about the instructors and their specialties
- A user can get information about the existing classes
- A user can see information about his current profile
- An authorized user can see the schedule of the week:
  - can see the available spots in the class
  - can see other athletes registered in the class
  - can register himself in the class
  - can deregister himself from the class

This frontend makes calls to a crossfit backend that handles a database with all the data required. Make sure that you update the globalConsts.js file in the root directory. API_HOST and AUTH0_AUDIENCE variables should point to the backend service. The latter variable refers to authentication audience, meaning the resource server. The former is used for the api calls made to the crossfit backend.

## Views

### Home page view:

![image](https://user-images.githubusercontent.com/34338768/103912088-26a68400-5107-11eb-8e91-45d70fbcd89e.png)

### Signing in view - Auth0 login:

![image](https://user-images.githubusercontent.com/34338768/103912155-3b831780-5107-11eb-9e57-7d9d4e377f4b.png)

### Callendar View:

![image](https://user-images.githubusercontent.com/34338768/103911513-6caf1800-5106-11eb-9032-94c2b3c3c5ba.png)

### Signing in a class

![image](https://user-images.githubusercontent.com/34338768/103911823-cfa0af00-5106-11eb-816f-a038f5523ba0.png)
![image](https://user-images.githubusercontent.com/34338768/103911753-b4ce3a80-5106-11eb-8d4e-98f0a648ed68.png)

### Looking for classes that a user is registered

![image](https://user-images.githubusercontent.com/34338768/103911978-024aa780-5107-11eb-8f0c-eddd261c77ff.png)

## TODO List

- Achievements page:
  - The user will be able to add new achievements and retrieve his data from the backend
  - The user can compare to other athletes achievements
- Currently we do not support new registrations
- bug: when going back to the previous year calendar gets messed up
- Add new classes instances

## How to setup an auth0 account

In order to have all the functionality needed for this frontend app you need
to create a new account in [Auth0](https://auth0.com/). Then you need to create a new domain
in order to get a clientId. You can configure your domain with a redirect uri.
This is the URL that will get called once authentication is finsihed. For
more information on how to setup your account follow the instructions in auth0 [quick start guide](https://auth0.com/docs/quickstart/spa/react).

## Creating an .env file

To run this frontend you need to create a .env file in the root directory. Then you
need to define the auth0 domain and client id. You can fetch those from your auth0 account after you choose the application that you created in the previous step. After
creating the .env file do not forget to restart your development server so that the
new enviromental variables are loaded. Below you can see a sample of the .env file.
The values are random so please make sure that you add your own values.

```
REACT_APP_AUTH0_DOMAIN=your-application.eu.auth0.com
REACT_APP_AUTH0_CLIENT_ID=I9McoPMQ4kxhKDUhlJ9NILvXNvBB6X58
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
