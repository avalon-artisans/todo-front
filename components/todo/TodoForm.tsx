import {Button, Input, Textarea, Typography} from "@material-tailwind/react";
import React, { useState } from 'react';
import {ArrowLeftIcon} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import TodoService from '@/services/todo.service';
import { useDispatch } from 'react-redux';
import { changeAlertColor, changeAlertVisibility, changeMessage } from '@/store/slices/alertSlice';
import dayjs from 'dayjs';

export default function TodoForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ due, setDue ] = useState('');

  /**
   * Handles form submission
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const todoService = new TodoService();
    try {
      const response = await todoService.processCreateTodo({
        title: title,
        description: description,
        due_date: dayjs(due).format('YYYY-MM-DD HH:mm:ss'),
      });

      if (response.success) {
        dispatch(changeMessage('Todo created successfully!'));
        dispatch(changeAlertVisibility(true));
        dispatch(changeAlertColor('green'));
        return;
      }

      dispatch(changeMessage(response.message));
      dispatch(changeAlertVisibility(true));
      dispatch(changeAlertColor('red'));
      return;
    } catch (error) {
      console.log(error);
      dispatch(changeMessage('An unexpected error has occurred.'));
      dispatch(changeAlertVisibility(true));
      dispatch(changeAlertColor('red'));
    }
  }

  return (
    <>
      <Typography variant="h5" className="mb-6">Create New Todo</Typography>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className="mb-6">
          <Input
            required
            id="todo__title"
            type="text"
            value={title}
            label="Title"
            size="lg"
            onChange={ (e) => setTitle(e.target.value) }
          />
        </div>
        <div className="mb-6">
          <Textarea
            id="todo__description"
            value={description}
            label="Description"
            size="lg"
            onChange={ (e) => setDescription(e.target.value) }
          />
        </div>
        <div className="mb-6">
          <Input
            id="todo__date"
            type="datetime-local"
            value={due}
            label="Due Date"
            size="lg"
            onChange={ (e) => setDue(e.target.value) }
          />
        </div>

        <div className="flex flex-row">
          <Button
            className="flex flex-row w-full mr-5 px-5 py-2.5 justify-center items-center text-center"
            variant="text"
            size="md"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-5 w-5 mr-3" />
            Back
          </Button>
          <Button
            type="submit"
            variant="filled"
            size="md"
            className="w-full px-5 py-2.5 text-center"
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
}