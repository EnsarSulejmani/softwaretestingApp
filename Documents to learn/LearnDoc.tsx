// describe
// Groups related tests into a suite.

describe("Math operations", () => {
  // Tests go here
});

// test / it
// Defines an individual test case (both are interchangeable).

test("adds numbers correctly", () => {
  expect(1 + 1).toBe(2);
});
// or using it:
it("multiplies numbers correctly", () => {
  expect(2 * 3).toBe(6);
});

// expect
// Creates an assertion to check a value against a condition.

expect(4).toBe(4);

// beforeAll / afterAll
// Runs code once before/after all tests in a suite.

beforeAll(() => {
  // Setup code
});
afterAll(() => {
  // Cleanup code
});

// beforeEach / afterEach
// Runs code before/after each individual test.

beforeEach(() => {
  // Code to run before each test
});
afterEach(() => {
  // Code to run after each test
});

// jest.fn()
// Creates a mock function to track calls and arguments.

const mockFn = jest.fn();
mockFn("hello");
expect(mockFn).toHaveBeenCalledWith("hello");

// jest.spyOn()
// Creates a spy on an existing function to monitor its calls.

const obj = { add: (a, b) => a + b };
const spy = jest.spyOn(obj, "add");
obj.add(2, 3);
expect(spy).toHaveBeenCalledWith(2, 3);

// Jest Matchers

// toBe
// Checks for strict equality (using ===).

expect(5).toBe(5);

// toEqual
// Checks for deep equality of objects or arrays.

expect({ a: 1 }).toEqual({ a: 1 });

// toBeNull
// Asserts that a value is exactly null.

expect(null).toBeNull();

// toBeDefined
// Asserts that a value is not undefined.

let x = 5;
expect(x).toBeDefined();

// toBeTruthy / toBeFalsy
// Checks whether a value is truthy or falsy.

expect(true).toBeTruthy();
expect(0).toBeFalsy();

// toContain
// Verifies that an item exists in an array or substring exists within a string.

expect([1, 2, 3]).toContain(2);

// toMatch
// Checks if a string matches a regular expression.

expect("hello world").toMatch(/world/);

// React Testing Library Functions

// render
// Renders a React component into a virtual DOM for testing.

import { render } from "@testing-library/react";
import MyComponent from "./MyComponent";
render(<MyComponent />);

// screen
// Provides queries to access elements from the rendered output.

import { screen } from "@testing-library/react";
expect(screen.getByText("Submit")).toBeInTheDocument();

// getByRole
// Finds an element by its ARIA role (throws error if not found).

const button = screen.getByRole("button", { name: /submit/i });

// queryByRole
// Finds an element by role, returns null if not found (doesn't throw an error).

const link = screen.queryByRole("link", { name: /home/i });
expect(link).toBeNull();

// findByRole
// Asynchronously finds an element by its role (returns a promise).

const header = await screen.findByRole("heading", { name: /welcome/i });

// getByText
// Finds an element by its text content.

const element = screen.getByText("Hello World");

// getByLabelText
// Finds an element associated with a <label> by the label’s text.

const input = screen.getByLabelText("Username");

// fireEvent
// Simulates user events such as clicks, typing, etc.

import { fireEvent } from "@testing-library/react";
fireEvent.click(screen.getByRole("button", { name: /submit/i }));

// waitFor
// Waits for asynchronous changes to occur in the component before making assertions.

import { waitFor } from "@testing-library/react";
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});
