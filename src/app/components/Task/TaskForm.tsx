'use client';

import { useState } from 'react';
import { addTask } from '../../GlobalRedux/features/task/taskSlice';
import { useDispatch, useSelector } from 'react-redux';


type props = {
  edit: any
}

const TaskForm: React.FC<props>= ({edit}) => {

  const tasks = useSelector((state: any) => state.tasks);
  const dispatch = useDispatch();

  


  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });


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

  const handleCompletedChange = () => {
    setTask({
      ...task,
      completed: !task.completed,
    });
  };




  return (
  <section>
    {
      edit ? null :  <div className='d-flex justify-content-center'>
      <form onSubmit={handleSubmit}>
        <div className='d-flex flex-column input-group input-group-lg'>
          <input maxLength={40} style={{ width: "400px", height: "50px"}} className='mb-2 input-group-text' id="inputGroup-sizing-lg" onChange={handleChange} name="title" type="text" placeholder="title" required />
          <textarea maxLength={120} style={{ width: "400px", height: "120px"}} className='mb-2 input-group-text' id="inputGroup-sizing-lg" onChange={handleChange} name="description" placeholder='description' required />
          <label className='mb-2'>
            Completed:
            <input type="checkbox" checked={task.completed} onChange={handleCompletedChange} />
          </label>
        

        </div>


        <button className='btn btn-success'>Save task</button>

      </form>

    </div>
    }
       

  </section>

  )
}

export default TaskForm
