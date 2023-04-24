'use client';

import { useState } from 'react';
import { addTask } from '../../GlobalRedux/features/task/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

const TaskForm = () => {

  const tasks = useSelector((state: any) => state.tasks);
  const dispatch = useDispatch();


  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [inputValue, setInputValue] = useState('');
  

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addTask(task));
    console.log(tasks)
  }

  const handleChange = (e: any) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
  



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name="title" type="text" placeholder="title"/>
        <textarea onChange={handleChange} name="description" placeholder='description'/>
        <button>Save task</button>

      </form>
      
    </div>
  )
}

export default TaskForm
