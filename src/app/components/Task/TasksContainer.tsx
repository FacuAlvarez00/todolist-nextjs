'use client';

import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../../GlobalRedux/features/task/taskSlice';


const TasksContainer = () => {

const tasks = useSelector((state: any) => state.tasks);
const dispatch = useDispatch();

const handleTaskDelete = (id: any) => {
    dispatch(deleteTask(id))
    
  };

  

  return (
 
    <div>
     { tasks.value.map((task: any) => (
                <div key={task.id}>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    {
                        task.completed ? <p>Done</p> : <p>Not done</p>
                    }
                    <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
                </div>
        ))} 
    </div>

  )
}

export default TasksContainer
