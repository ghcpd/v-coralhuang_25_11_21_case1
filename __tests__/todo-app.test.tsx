import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoApp from "../components/TodoApp";

describe("TodoApp", () => {
  it("renders hero copy and gradient CTA", () => {
    render(<TodoApp />);

    expect(screen.getByText(/plan the perfect day/i)).toBeInTheDocument();

    const cta = screen.getByRole("button", { name: /add task/i });
    expect(cta).toHaveClass("bg-gradient-to-r");
  });

  it("prevents blank submissions and surfaces guidance", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByLabelText(/task description/i);
    await user.type(input, "   ");
    await user.keyboard("{Enter}");

    expect(screen.getByRole("status")).toHaveTextContent(/add some details/i);
    expect(screen.getByText(/highlight your first win/i)).toBeInTheDocument();
  });

  it("adds, toggles, and deletes tasks without mutating unrelated entries", async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByLabelText(/task description/i);
    const submit = screen.getByRole("button", { name: /add task/i });

    await user.type(input, "Write tests");
    await user.click(submit);
    await user.type(input, "Polish UI");
    await user.click(submit);

    const list = screen.getByTestId("task-list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);

    const getCheckboxFor = (label: string) => {
      const taskElement = screen.getByText(label).closest("li");
      if (!taskElement) throw new Error(`No task row for ${label}`);
      return within(taskElement).getByRole<HTMLInputElement>("checkbox");
    };

    await user.click(getCheckboxFor("Write tests"));
    const untouchedTask = screen.getByText("Polish UI");
    expect(untouchedTask).not.toHaveClass("line-through");

    const deleteButtons = within(list).getAllByRole("button", { name: /delete/i });
    await user.click(deleteButtons[0]);
    expect(within(list).getAllByRole("listitem")).toHaveLength(1);
  });
});
