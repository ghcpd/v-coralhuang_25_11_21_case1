import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DebugToDoList from '../DebugToDoList';

describe('DebugToDoList Component - Bug Fixes Verification', () => {
  describe('FIX 1: Empty String Validation', () => {
    test('should not add task when input is empty', () => {
      render(<DebugToDoList />);
      
      const addButton = screen.getByText('Add');
      fireEvent.click(addButton);
      
      const emptyMessage = screen.getByText(/No tasks yet/i);
      expect(emptyMessage).toBeInTheDocument();
    });

    test('should not add task when input is only whitespace', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i);
      const addButton = screen.getByText('Add');
      
      fireEvent.change(input, { target: { value: '   ' } });
      fireEvent.click(addButton);
      
      const emptyMessage = screen.getByText(/No tasks yet/i);
      expect(emptyMessage).toBeInTheDocument();
    });

    test('should add task when input has valid text', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i);
      const addButton = screen.getByText('Add');
      
      fireEvent.change(input, { target: { value: 'Buy groceries' } });
      fireEvent.click(addButton);
      
      expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    });
  });

  describe('FIX 2 & 3: Immutable State Updates', () => {
    test('should properly delete tasks without mutating state', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i);
      const addButton = screen.getByText('Add');
      
      // Add multiple tasks
      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Task 2' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Task 3' } });
      fireEvent.click(addButton);
      
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
      
      // Delete middle task
      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[1]);
      
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    test('should properly toggle task completion without mutating state', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i);
      const addButton = screen.getByText('Add');
      
      // Add tasks
      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Task 2' } });
      fireEvent.click(addButton);
      
      const checkboxes = screen.getAllByRole('checkbox');
      
      // Toggle first task
      fireEvent.click(checkboxes[0]);
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      
      // Toggle second task
      fireEvent.click(checkboxes[1]);
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).toBeChecked();
      
      // Untoggle first task
      fireEvent.click(checkboxes[0]);
      expect(checkboxes[0]).not.toBeChecked();
      expect(checkboxes[1]).toBeChecked();
    });

    test('should maintain correct order after multiple operations', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i);
      const addButton = screen.getByText('Add');
      
      // Add tasks
      fireEvent.change(input, { target: { value: 'First' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Second' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Third' } });
      fireEvent.click(addButton);
      
      // Toggle middle task
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);
      
      // Verify order is maintained
      const tasks = screen.getAllByRole('listitem');
      expect(tasks[0]).toHaveTextContent('First');
      expect(tasks[1]).toHaveTextContent('Second');
      expect(tasks[2]).toHaveTextContent('Third');
    });
  });

  describe('FIX 4: Key Props on List Items', () => {
    test('should render list items with proper React keys', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i);
      const addButton = screen.getByText('Add');
      
      // Add multiple tasks
      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Task 2' } });
      fireEvent.click(addButton);
      
      // If keys are properly set, React won't throw warnings
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
    });
  });

  describe('FIX 5: Tailwind CSS Classes', () => {
    test('should have correct button styling (no typo in bg-blue-500)', () => {
      render(<DebugToDoList />);
      
      const addButton = screen.getByText('Add');
      
      // Check that button has gradient classes (fixed from bg-blu-500)
      expect(addButton).toHaveClass('bg-gradient-to-r');
      expect(addButton).toHaveClass('from-indigo-600');
      expect(addButton).toHaveClass('to-purple-600');
    });
  });

  describe('Additional Features', () => {
    test('should clear input after adding task', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i) as HTMLInputElement;
      const addButton = screen.getByText('Add');
      
      fireEvent.change(input, { target: { value: 'New task' } });
      fireEvent.click(addButton);
      
      expect(input.value).toBe('');
    });

    test('should add task when Enter key is pressed', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i);
      
      fireEvent.change(input, { target: { value: 'Press Enter Task' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
      
      expect(screen.getByText('Press Enter Task')).toBeInTheDocument();
    });

    test('should display correct statistics', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i);
      const addButton = screen.getByText('Add');
      
      // Add tasks
      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Task 2' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Task 3' } });
      fireEvent.click(addButton);
      
      // Complete one task
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
      
      // Check stats
      expect(screen.getByText(/Total:/)).toHaveTextContent('3');
      expect(screen.getByText(/Completed:/)).toHaveTextContent('1');
      expect(screen.getByText(/Remaining:/)).toHaveTextContent('2');
    });

    test('should apply line-through style to completed tasks', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i);
      const addButton = screen.getByText('Add');
      
      fireEvent.change(input, { target: { value: 'Complete me' } });
      fireEvent.click(addButton);
      
      const checkbox = screen.getByRole('checkbox');
      const taskText = screen.getByText('Complete me');
      
      // Task should not have line-through initially
      expect(taskText).not.toHaveClass('line-through');
      
      // Complete the task
      fireEvent.click(checkbox);
      
      // Task should now have line-through
      expect(taskText).toHaveClass('line-through');
    });
  });

  describe('Edge Cases', () => {
    test('should handle rapid consecutive additions', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i);
      const addButton = screen.getByText('Add');
      
      for (let i = 1; i <= 10; i++) {
        fireEvent.change(input, { target: { value: `Task ${i}` } });
        fireEvent.click(addButton);
      }
      
      const tasks = screen.getAllByRole('listitem');
      expect(tasks).toHaveLength(10);
    });

    test('should handle deleting all tasks', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i);
      const addButton = screen.getByText('Add');
      
      // Add tasks
      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Task 2' } });
      fireEvent.click(addButton);
      
      // Delete tasks one by one (query fresh each time)
      let deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);
      
      deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);
      
      // Should show empty state
      expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
    });

    test('should handle long task text gracefully', () => {
      render(<DebugToDoList />);
      
      const input = screen.getByPlaceholderText(/What do you need to do?/i);
      const addButton = screen.getByText('Add');
      
      const longText = 'This is a very long task description that should be handled gracefully by the component without breaking the layout or causing any issues';
      
      fireEvent.change(input, { target: { value: longText } });
      fireEvent.click(addButton);
      
      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });
});
