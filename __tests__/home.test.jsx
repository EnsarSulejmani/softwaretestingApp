import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../app/page";

describe("Credit Card Form", () => {
  test("renders all form fields and submit button", () => {
    render(<Home />);
    expect(screen.getByText("Credit Card Info")).not.toBeNull();
    expect(screen.getByLabelText(/Card Number/i)).not.toBeNull();
    expect(screen.getByLabelText(/Name on Card/i)).not.toBeNull();
    expect(screen.getByLabelText(/Expiry Date/i)).not.toBeNull();
    expect(screen.getByLabelText(/CVC/i)).not.toBeNull();
    expect(
      screen.getByRole("button", { name: /Submit Payment/i })
    ).not.toBeNull();
  });

  test("displays errors for empty fields on form submission", () => {
    render(<Home />);
    fireEvent.submit(screen.getByRole("button", { name: /Submit Payment/i }));
    expect(
      screen.getByLabelText(/Card Number/i).classList.contains("border-red-500")
    ).toBe(true);
    expect(
      screen
        .getByLabelText(/Name on Card/i)
        .classList.contains("border-red-500")
    ).toBe(true);
    expect(
      screen.getByLabelText(/Expiry Date/i).classList.contains("border-red-500")
    ).toBe(true);
    expect(
      screen.getByLabelText(/CVC/i).classList.contains("border-red-500")
    ).toBe(true);
  });

  test("submits form with valid inputs", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<Home />);
    fireEvent.change(screen.getByLabelText(/Card Number/i), {
      target: { value: "1234567812345678" },
    });
    fireEvent.change(screen.getByLabelText(/Name on Card/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Expiry Date/i), {
      target: { value: "12/34" },
    });
    fireEvent.change(screen.getByLabelText(/CVC/i), {
      target: { value: "123" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /Submit Payment/i }));
    expect(consoleSpy).toHaveBeenCalledWith({
      cardNumber: "1234567812345678",
      cardName: "John Doe",
      expiry: "12/34",
      cvc: "123",
    });
    consoleSpy.mockRestore();
  });

  test("does not contain valid inputs", () => {
    render(<Home />);

    // Define some invalid input values
    const invalidCardNumber = "1234"; // Too short, not 16 digits
    const invalidCardName = "John@Doe"; // Contains an invalid character (@)
    const invalidExpiry = "13/20"; // Month is invalid (should be 01-12)
    const invalidCvc = "12"; // Too short, not 3 digits

    // Input the invalid values
    fireEvent.change(screen.getByLabelText(/Card Number/i), {
      target: { value: invalidCardNumber },
    });
    fireEvent.change(screen.getByLabelText(/Name on Card/i), {
      target: { value: invalidCardName },
    });
    fireEvent.change(screen.getByLabelText(/Expiry Date/i), {
      target: { value: invalidExpiry },
    });
    fireEvent.change(screen.getByLabelText(/CVC/i), {
      target: { value: invalidCvc },
    });

    // Regex definitions for valid inputs (adjust these as needed)
    const cardNumberRegex = /^\d{16}$/;
    const cardNameRegex = /^[a-zA-Z\s]+$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvcRegex = /^\d{3}$/;

    // Assert that each invalid input does not pass the corresponding regex test
    expect(cardNumberRegex.test(invalidCardNumber)).toBe(false);
    expect(cardNameRegex.test(invalidCardName)).toBe(false);
    expect(expiryRegex.test(invalidExpiry)).toBe(false);
    expect(cvcRegex.test(invalidCvc)).toBe(false);

    // Submit the form to trigger the validation logic in your component
    fireEvent.submit(screen.getByRole("button", { name: /Submit Payment/i }));

    // Verify that error classes are applied to each field
    expect(
      screen.getByLabelText(/Card Number/i).classList.contains("border-red-500")
    ).toBe(true);
    expect(
      screen
        .getByLabelText(/Name on Card/i)
        .classList.contains("border-red-500")
    ).toBe(true);
    expect(
      screen.getByLabelText(/Expiry Date/i).classList.contains("border-red-500")
    ).toBe(true);
    expect(
      screen.getByLabelText(/CVC/i).classList.contains("border-red-500")
    ).toBe(true);
  });
});
