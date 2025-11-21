import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoApp from '../components/TodoApp';

describe('TodoApp', () => {
  test('prevents adding empty or whitespace-only tasks', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const addButton = screen.getByTestId('add-button');
    expect(addButton).toBeDisabled();

    const input = screen.getByTestId('task-input');
    await user.type(input, '    ');
    expect(addButton).toBeDisabled();

    // Trigger validation via Enter key
    await user.keyboard('{Enter}');
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    expect(await screen.findByRole('alert')).toHaveTextContent(/please enter a task/i);
  });

  test('adds a task and displays it with correct count', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByTestId('task-input');
    const addButton = screen.getByTestId('add-button');

    await user.type(input, 'Buy milk');
    await user.click(addButton);

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByTestId('tasks-remaining')).toHaveTextContent('1 task');
  });

  test('toggles task completion without affecting other tasks', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByTestId('task-input');
    const addButton = screen.getByTestId('add-button');

    await user.type(input, 'Task A');
    await user.click(addButton);
    await user.type(input, 'Task B');
    await user.click(addButton);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2);

    await user.click(checkboxes[1]); // toggle Task B

    const taskA = screen.getByText('Task A');
    const taskB = screen.getByText('Task B');

    expect(taskA).not.toHaveClass('line-through');
    expect(taskB).toHaveClass('line-through');
    expect(screen.getByTestId('tasks-remaining')).toHaveTextContent('1 task');
  });

  test('deletes the correct task', async () => {
    const user = userEvent.setup();
    render(<TodoApp />);

    const input = screen.getByTestId('task-input');
    const addButton = screen.getByTestId('add-button');

    await user.type(input, 'Task 1');
    await user.click(addButton);
    await user.type(input, 'Task 2');
    await user.click(addButton);

    const deleteButtons = screen.getAllByTestId('delete-button');
    await user.click(deleteButtons[0]); // delete Task 1

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByTestId('tasks-remaining')).toHaveTextContent('1 task');
  });

  test('renders list items with keys (no React key warnings)', async () => {
    const user = userEvent.setup();
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<TodoApp />);

    const input = screen.getByTestId('task-input');
    const addButton = screen.getByTestId('add-button');

    await user.type(input, 'First');
    await user.click(addButton);
    await user.type(input, 'Second');
    await user.click(addButton);

    const keyWarning = consoleSpy.mock.calls.find((call) =>
      call.join(' ').includes('Each child in a list should have a unique key')
    );
    expect(keyWarning).toBeUndefined();

    consoleSpy.mockRestore();
  });

  test('uses the correct Tailwind class on Add button', () => {
    render(<TodoApp />);
    const addButton = screen.getByTestId('add-button');
    expect(addButton).toHaveClass('bg-blue-500');
    expect(addButton).not.toHaveClass('bg-blu-500');
  });
});
