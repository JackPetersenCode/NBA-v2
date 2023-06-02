import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import TeamName from './TeamName';

describe("TeamName input component", () => {
/*
    it("change on input causes change on team name", async() => {
        await act(async() => {
            const { findByTestId } = render(<TeamName />);
            const input2 = findByTestId("teamNameInput");
            const header = findByTestId("teamNameDisplay");
            const inputWord = "BeanStalks";
            await fireEvent.change(input2, {target: {value: inputWord}});
            expect(header.innerHTML).toBe(inputWord);
        })
    })
    */
    it("renders team name submit button", () => {
        render(<TeamName />);
        const buttonElement = screen.getByRole("button");
        expect(buttonElement).toBeInTheDocument();
    });

    it("renders team name text box", () => {
        render(<TeamName />);
        const textboxElement = screen.getByRole("textbox")
        expect(textboxElement).toBeInTheDocument();
    });

    it("renders team name heading", () => {
        render(<TeamName />);
        const headingElement = screen.getByRole("heading", {name: 'User Roster'})
        expect(headingElement).toBeInTheDocument();
    });
    
    it('should render input element', async() => {
        render(<TeamName />);
        const inputElement = screen.getByRole("textbox")
        expect(inputElement).toBeInTheDocument();
    });

    it('should be able to type in team name', async() => {
        render(<TeamName />);
        const inputElement = screen.getByRole("textbox")
        fireEvent.change(inputElement, { target: { value: "Sugar Kittens"}})
        expect(inputElement.value).toBe("Sugar Kittens");
    });

    it('should have empty input when submit button is clicked', async() => {
        render(<TeamName />);
        const inputElement = screen.getByRole("textbox")
        const buttonElement = screen.getByRole("button", { name: /Submit/i })
        fireEvent.change(inputElement, { target: { value: "Sugar Kittens"}})
        fireEvent.click(buttonElement)
        expect(inputElement).not.toBeVisible();
    });

})

