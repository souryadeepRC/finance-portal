// library
import { render, screen } from "@testing-library/react";
// components
import { AppDisplay } from "./AppDisplay";

test("App icon exist", () => {
  render(<AppDisplay />);
  const element = screen.getByRole("app-icon", { hidden: true });
  expect(element).toBeInTheDocument();
});
test("App display text exist", () => {
  render(<AppDisplay />);
  const linkElement = screen.getByText('My Gullak', { exact: true });
  expect(linkElement).toBeInTheDocument();
});
