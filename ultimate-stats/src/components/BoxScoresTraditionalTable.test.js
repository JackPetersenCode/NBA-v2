import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import BoxScoresTraditionalTable from './BoxScoresTraditionalTable';

it("should render box scores traditional table", async() => {
    render(<BoxScoresTraditionalTable />);
    const tableElement = await screen.findByRole("table")
    expect(tableElement).toBeInTheDocument();
});
