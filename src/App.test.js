// Importing necessary modules from React and testing libraries
import React from 'react'; // Importing React to be able to use JSX and React components
import { render, screen } from '@testing-library/react'; // Importing render function for rendering components in tests and screen object to access queries
import '@testing-library/jest-dom'; // Importing custom matchers to extend Jest assertions
import App from './App'; // Importing the App component that we want to test

// Defining a test case with a descriptive name
test('renders App component', () => {
  // Rendering the App component in a virtual DOM for testing
  render(<App />);
  
  // Using a query from the screen object to find an element with the text "Wallet Balance Checker"
  // The 'i' flag in the regex makes the search case-insensitive
  // The assertion checks if the found element is present in the document
  // If the element is not found, the test will fail
  expect(screen.getByText(/Wallet Balance Checker/i)).toBeInTheDocument();
});
