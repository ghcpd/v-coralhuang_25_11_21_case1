import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DebugToDoList from '../components/DebugToDoList';

describe('DebugToDoList', () => {
  test('prevents adding empty/whitespace tasks', () => {
    render(<DebugToDoList />);
    const input = screen.getByTestId('task-input') as HTMLInputElement;
    const add = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(add);

    expect(screen.getByTestId('task-list')).toHaveTextContent('No tasks yet');
  });

  test('adds tasks and displays them with unique ids', () => {
    render(<DebugToDoList />);
    const input = screen.getByTestId('task-input') as HTMLInputElement;
    const add = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'Task A' } });
    fireEvent.click(add);

    expect(screen.getByTestId('task-list')).toHaveTextContent('Task A');

    // Add second task
    fireEvent.change(input, { target: { value: 'Task B' } });
    fireEvent.click(add);

    expect(screen.getByTestId('task-list')).toHaveTextContent('Task A');
    expect(screen.getByTestId('task-list')).toHaveTextContent('Task B');
  });

  test('toggle updates completion state and UI', () => {
    render(<DebugToDoList />);
    const input = screen.getByTestId('task-input') as HTMLInputElement;
    const add = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'ToggleMe' } });
    fireEvent.click(add);

    const list = screen.getByTestId('task-list');
    // locate the checkbox element
    const checkbox = list.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test('delete removes task from the list', () => {
    render(<DebugToDoList />);
    const input = screen.getByTestId('task-input') as HTMLInputElement;
    const add = screen.getByTestId('add-button');

    fireEvent.change(input, { target: { value: 'DeleteMe' } });
    fireEvent.click(add);

    const list = screen.getByTestId('task-list');
    expect(list).toHaveTextContent('DeleteMe');

    const deleteBtn = list.querySelector('button');
    expect(deleteBtn).toBeInTheDocument();
    // click delete
    fireEvent.click(deleteBtn!);
    expect(list).not.toHaveTextContent('DeleteMe');
  });
});
