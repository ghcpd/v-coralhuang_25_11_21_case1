import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DebugToDoList from '../src/DebugToDoList';

describe('DebugToDoList', () => {
  test('does not add empty tasks', () => {
    render(<DebugToDoList />);
    const input = screen.getByLabelText('task-input');
    const add = screen.getByLabelText('add-button');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(add);

    const list = screen.getByLabelText('task-list');
    expect(list.children.length).toBe(0);
  });

  test('adds, toggles and deletes tasks immutably', () => {
    render(<DebugToDoList />);
    const input = screen.getByLabelText('task-input');
    const add = screen.getByLabelText('add-button');

    fireEvent.change(input, { target: { value: 'Task A' } });
    fireEvent.click(add);

    let list = screen.getByLabelText('task-list');
    expect(list.children.length).toBe(1);

    const checkbox = screen.getByLabelText(/toggle-/i);
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const delBtn = screen.getByLabelText(/delete-/i);
    fireEvent.click(delBtn);
    list = screen.getByLabelText('task-list');
    expect(list.children.length).toBe(0);
  });
});
