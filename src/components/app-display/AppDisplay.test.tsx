// library
import { render, screen } from "@testing-library/react";
// components
import { AppDisplay } from "./AppDisplay";

test("App Icon", () => {
  render(<AppDisplay />);
  const element = screen.getByRole("app-icon", { hidden: true });
  expect(element).toBeInTheDocument();
});
test("App Display Text", () => {
  render(<AppDisplay />);
  const linkElement = screen.getByText('My Gullak', { exact: true });
  expect(linkElement).toBeInTheDocument();
});
