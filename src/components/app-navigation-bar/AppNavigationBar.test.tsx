import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
// constants
import { AppNavigationBar } from "./AppNavigationBar";
// utils
import { resizeScreenSize } from "src/utils/common-utils";

test("In Desktop :: Navigation Links should exist", () => {
  render(
    <Router>
      <AppNavigationBar />
    </Router>
  );
  expect(screen.getByText("Home Loan")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();
});
test("navigation link Home Loan Click", () => {
  render(
    <Router>
      <AppNavigationBar />
    </Router>
  );
  const element = screen.getByText("Home Loan");
  fireEvent.click(element);
  expect(window.location.pathname).toMatch("/homeLoan");
});
test("navigation link About Click", () => {
  render(
    <Router>
      <AppNavigationBar />
    </Router>
  );
  const element = screen.getByText("About");
  fireEvent.click(element);
  expect(window.location.pathname).toMatch("/about");
});
// Responsiveness Testing
test("In Mobile Navigation Links should not exist", () => {
  resizeScreenSize(400);
  render(
    <Router>
      <AppNavigationBar />
    </Router>
  );
  expect(screen.queryByText("Home Loan")).not.toBeInTheDocument();
  expect(screen.queryByText("About")).not.toBeInTheDocument();
});
test("In Mobile :: Menu Button should Exist and click Event", async () => {
  resizeScreenSize(400);
  render(
    <Router>
      <AppNavigationBar />
    </Router>
  );
  const element = await screen.findByRole("navigation-menu-icon", {
    hidden: true,
  });
  expect(element).toBeInTheDocument();
  fireEvent.click(element);

  expect(screen.getByTestId("app-navigation-drawer")).toBeInTheDocument();
  // Links Existence
  expect(screen.getByText("Home Loan")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();
});
test("In Mobile :: Navigation Drawer Open and Exit", async () => {
  resizeScreenSize(400);
  render(
    <Router>
      <AppNavigationBar />
    </Router>
  );
  const element = await screen.findByRole("navigation-menu-icon", {
    hidden: true,
  });
  expect(element).toBeInTheDocument();
  fireEvent.click(element);
  // Open
  expect(screen.getByTestId("app-navigation-drawer")).toBeInTheDocument();

  const AboutElement = screen.getByText("About");
  expect(AboutElement).toBeInTheDocument();
  expect(document.body.style.overflow).toMatch("hidden");

  // Exit
  fireEvent.click(AboutElement);
  expect(document.body.style.overflow).toMatch("");
});
