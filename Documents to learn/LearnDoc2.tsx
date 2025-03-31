// test.only
// Runs only this test case, ignoring others.
test.only("runs this test exclusively", () => {
  expect(1 + 1).toBe(2);
});

// describe.only
// Groups tests into a suite that runs exclusively.
describe.only("Exclusive Math operations", () => {
  test("subtracts numbers correctly", () => {
    expect(5 - 2).toBe(3);
  });
});

// test.skip
// Skips this test case.
test.skip("this test is skipped", () => {
  expect(1 + 1).toBe(3);
});

// toHaveBeenCalledTimes
// Asserts that a mock function was called a specific number of times.
const mockFunc = jest.fn();
mockFunc();
mockFunc();
expect(mockFunc).toHaveBeenCalledTimes(2);

// toHaveReturned
// Checks that a function has returned at least once.
const func = jest.fn(() => "value");
func();
expect(func).toHaveReturned();

// toThrow
// Expects that a function throws an error when executed.
function throwError() {
  throw new Error("error occurred");
}
expect(throwError).toThrow("error occurred");

// mockReturnValue
// Sets a specific return value for a mock function.
const mockReturn = jest.fn().mockReturnValue("mocked");
expect(mockReturn()).toBe("mocked");

// mockImplementation
// Provides a custom implementation for a mock function.
const customMock = jest.fn().mockImplementation((a, b) => a * b);
expect(customMock(2, 3)).toBe(6);

// getAllByRole
// Finds all elements with a specified role.
import { render, screen } from "@testing-library/react";
import ListComponent from "./ListComponent";
render(<ListComponent />);
const items = screen.getAllByRole("listitem");
expect(items.length).toBeGreaterThan(0);

// userEvent
// Simulates advanced user interactions (requires @testing-library/user-event).
import userEvent from "@testing-library/user-event";
const inputElement = screen.getByLabelText("Username");
userEvent.type(inputElement, "testuser");
expect(inputElement).toHaveValue("testuser");

// within
// Allows querying within a specific element's subtree.
import { within } from "@testing-library/react";
const list = screen.getByRole("list");
const listItem = within(list).getByText("Item 1");
expect(listItem).toBeInTheDocument();

// Yes, getByRole accepts additional options besides "name" to help narrow down your query.
// For example:

// "hidden": Includes elements that are not visible in the document.
const hiddenButton = screen.getByRole("button", {
  name: /hidden/i,
  hidden: true,
});

// "level": Useful when querying headings, you can specify the heading level.
const heading = screen.getByRole("heading", { name: /welcome/i, level: 2 });

// "checked": For elements like checkboxes or radios that have a checked state.
const checkbox = screen.getByRole("checkbox", { checked: true });

// "selected": For list options or tabs that might be selected.
const selectedOption = screen.getByRole("option", { selected: true });

// "pressed": For toggle buttons that indicate a pressed state.
const toggleButton = screen.getByRole("button", {
  name: /toggle/i,
  pressed: false,
});

// Additional options include "exact", "trim", and "collapseWhitespace"
// to control how the "name" option is matched.
// Refer to the official Testing Library docs for a full list.

// "consoleSpy" is a variable that holds a spy created by jest.spyOn on the console.log method.
// It monitors calls to console.log, allowing you to verify if it was called, how many times,
// and with which arguments during your tests.

const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

// Example usage in a test:
console.log("Test message");
expect(consoleSpy).toHaveBeenCalledWith("Test message");

// After the test, it's important to restore the original console.log implementation:
consoleSpy.mockRestore();
