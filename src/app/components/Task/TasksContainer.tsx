'use client';

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, addTask, editTask } from '../../GlobalRedux/features/task/taskSlice';


const TasksContainer = () => {
    const [edit, setEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>()

  

    const [editedTask, setEditedTask] = useState({
        title: selectedTask? selectedTask.title : "",
        description: selectedTask? selectedTask.description : "",
        completed: selectedTask? selectedTask.completed : "",
    }
    );


    useEffect(() => {
        setEditedTask({
          title: selectedTask ? selectedTask.title : "",
          description: selectedTask ? selectedTask.description : "",
          completed: selectedTask ? selectedTask.completed : false,
        });
      }, [selectedTask]);

    


   

    const tasks = useSelector((state: any) => state.tasks);
    const dispatch = useDispatch();

    const handleTaskDelete = (id: any) => {
        dispatch(deleteTask(id))
    };

    const handleTaskEdit = (id: any) => {
        setEdit(!edit) 
        const selectedTask = tasks.value.find((task: any) => task.id === id);
        setSelectedTask(selectedTask)
        
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(editTask({ id: selectedTask.id, ...editedTask }))
        setEdit(!edit) 

      }

      const handleChange = (e: any) => {
        setEditedTask({
          ...editedTask,
          [e.target.name]: e.target.value,
        });
      };
    




    return (

        <div>
            {tasks.value.map((task: any) => (
                <div key={task.id}>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    {task.completed ? <h3>Done</h3> : <h3>Incompleted</h3>}
                    <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
                    <button onClick={() => handleTaskEdit(task.id)}>Edit</button>
                </div>
            ))}

            {
                edit && selectedTask? 
                <>
                    <p>Editing</p>
                    <h1>Editing task...</h1>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} name="title" type="text" defaultValue={selectedTask.title} required />
                        <textarea onChange={handleChange} name="description" defaultValue={selectedTask.description} required />
                        <button>Confirm editing</button>
                    </form>
                </>
                :
                null
            }
          
        </div>

    )
}

export default TasksContainer
