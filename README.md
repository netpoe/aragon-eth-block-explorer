# Aragon Block Explorer

Simple Ethereum block explorer.

- [x] Display at least the ten latest blocks.
- [x] Allow the user to see the transactions from a block. Only the transactions sending Ether should be displayed.
- [x] Allow the user to see some details about a transaction.
- [x] Bonus: search for any valid block number
- [x] Bonus: searching for a valid transaction ID will display the block that contains it
- [x] Bonus: get the total value of ETH transferred for each block
- [x] Bonus: load 1 more block
- [x] Bonus: web & mobile browser interfaces
- [x] Bonus: detects metamask networkVersion otherwise it defaults to Infura provider
- [x] Bonus: loads blocks by network

## Code structure

The project is structured in a very intuitive way with a base `Home` component in the `src/pages` directory and its nested components are located in the same directory.

"Global" components, meaning those that are meant to be reused, are located in `src/components`.

Web3 methods live inside `src/web`.

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
