// Importing necessary modules from React and testing libraries
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BalanceChecker from "./BalanceChecker";

// Test case to check if the BalanceChecker component renders correctly
test("renders BalanceChecker component", () => {
  // Rendering the BalanceChecker component in a virtual DOM for testing
  render(<BalanceChecker />);
  
  // Checking if the text "Wallet Balance Checker" is present in the document
  // This ensures that the component has rendered successfully
  expect(screen.getByText(/Wallet Balance Checker/i)).toBeInTheDocument();
  
  // Checking if the blockchain select input has a default value of "Ethereum"
  expect(screen.getByLabelText(/Select Blockchain/i)).toHaveValue("Ethereum");
  
  // Checking if the address input field is initially empty
  expect(screen.getByLabelText(/Address/i)).toHaveValue("");
  
  // Checking if the "Check Balance" button is enabled
  expect(screen.getByRole("button", { name: /Check Balance/i })).toBeEnabled();
});

// Test case to check if the blockchain network can be changed
test("changes blockchain network", () => {
  // Rendering the BalanceChecker component in a virtual DOM for testing
  render(<BalanceChecker />);
  
  // Finding the blockchain select input
  const blockchainSelect = screen.getByLabelText(/Select Blockchain/i);
  
  // Changing the value of the blockchain select input to "Polygon"
  fireEvent.change(blockchainSelect, { target: { value: "Polygon" } });
  
  // Checking if the value of the blockchain select input is now "Polygon"
  expect(blockchainSelect).toHaveValue("Polygon");
});

// Test case to check if the wallet address can be entered
test("enters wallet address", () => {
  // Rendering the BalanceChecker component in a virtual DOM for testing
  render(<BalanceChecker />);
  
  // Finding the address input field
  const addressInput = screen.getByLabelText(/Address/i);
  
  // Changing the value of the address input field to "0x123..."
  fireEvent.change(addressInput, { target: { value: "0x123..." } });
  
  // Checking if the value of the address input field is now "0x123..."
  expect(addressInput).toHaveValue("0x123...");
});
