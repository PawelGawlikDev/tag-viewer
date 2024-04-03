import React from "react";
import { render, screen } from "./utils/testUtils";
import App from "../App";
import TableToolbar from "../components/TableToolbar/TableToolbar";

test("Check header text", async () => {
  render(<TableToolbar />);
  const tableTitle = screen.getByTestId("header");
  expect(tableTitle).toHaveTextContent("StackOverflow Tags Viewer");
});

test("Renders table name", () => {
  render(<App />);
  const header = screen.getByTestId("header");
  expect(header).toBeInTheDocument();
});

test("Render table rows", async () => {
  render(<App />);
  const table = screen.getByLabelText("table");
  expect(table).toBeInTheDocument();
});

test("Render table controls", () => {
  render(<App />);
  const controls = screen.getByLabelText("controls");
  expect(controls).toBeInTheDocument();
});
