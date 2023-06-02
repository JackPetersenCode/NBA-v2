import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import BoxScoresAdvancedTable from './BoxScoresAdvancedTable';

it("should render box scores advanced table", async() => {
    render(<BoxScoresAdvancedTable />);
    const tableElement = await screen.findByRole("table")
    expect(tableElement).toBeInTheDocument();
});

