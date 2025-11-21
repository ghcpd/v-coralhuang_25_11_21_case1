import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DebugToDoList from '../components/DebugToDoList';
import fs from 'fs';
import path from 'path';

describe('DebugToDoList component', () => {
  test('does not add empty tasks', () => {
    render(<DebugToDoList />);
    const addButton = screen.getByTestId('add-button');
    const input = screen.getByTestId('task-input') as HTMLInputElement;
    // initial empty state message
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    input.value = '    ';
    fireEvent.change(input, { target: { value: input.value } });
    fireEvent.click(addButton);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  test('renders tasks and can delete specific items', () => {
    render(<DebugToDoList />);
    const addButton = screen.getByTestId('add-button');
    const input = screen.getByTestId('task-input') as HTMLInputElement;

    // add two tasks
    fireEvent.change(input, { target: { value: 'Task A' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Task B' } });
    fireEvent.click(addButton);

    expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument();
    expect(screen.getByTestId('task-text-0')).toHaveTextContent('Task A');
    expect(screen.getByTestId('task-text-1')).toHaveTextContent('Task B');

    // delete first task
    fireEvent.click(screen.getByTestId('task-delete-0'));
    // now the first task should be the original Task B
    expect(screen.getByTestId('task-text-0')).toHaveTextContent('Task B');
  });

  test('checkbox toggles completed status', () => {
    render(<DebugToDoList />);
    const addButton = screen.getByTestId('add-button');
    const input = screen.getByTestId('task-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Task C' } });
    fireEvent.click(addButton);
    const checkbox = screen.getByTestId('task-checkbox-0') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test('ui & code checks: no .splice or direct mutation patterns and correct tailwind class', () => {
    const componentFilePath = path.resolve(__dirname, '../components/DebugToDoList.tsx');
    const content = fs.readFileSync(componentFilePath, 'utf8');
    expect(content).not.toMatch(/\.splice\(/);
    expect(content).not.toMatch(/\.completed\s*=\s*/);
    expect(content).not.toMatch(/setTasks\(tasks\)/);
    // ensure we don't have the typo class
    expect(content).not.toMatch(/bg-blu-500/);
    // ensure the button uses the correct class
    expect(content).toMatch(/bg-blue-500/);
  });
});
