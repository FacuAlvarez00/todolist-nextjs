'use client';

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, addTask, editTask } from '../../GlobalRedux/features/task/taskSlice';
import {AiFillCheckCircle} from "react-icons/ai"
import {RxCrossCircled} from "react-icons/rx"


const TasksContainer = () => {
    const [edit, setEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState<any>()

  

    const [editedTask, setEditedTask] = useState<any>({
        title: selectedTask? selectedTask.title : "",
        description: selectedTask? selectedTask.description : "",
        completed: selectedTask? selectedTask.completed : "",
    }
    );


    useEffect(() => {
        setEditedTask({
          title: selectedTask ? selectedTask.title : "",
          description: selectedTask ? selectedTask.description : "",
          completed: selectedTask ? selectedTask.completed : "",
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
        const { name, value, type, checked } = e.target;
        setEditedTask({
          ...editedTask,
          [name]: type === "checkbox" ? checked : value,
        });
      };

      useEffect (() => {
        console.log(tasks)
        }, [handleSubmit])


    return (
        <section className='d-flex justify-content-center'>

     

        <div>
            <div style={{minWidth: "700px"}} className='tasks__holder border border-light-subtle
            mb-4'>

            
            {
            tasks.value.map((task: any) => (
                <div className='d-flex mb-5 justify-content-between' key={task.id}>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    {task.completed ? <AiFillCheckCircle style={{ width: "30px", height: "30px"}}/> : <RxCrossCircled style={{ width: "30px", height: "30px"}}/>}
                    <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
                    <button onClick={() => handleTaskEdit(task.id)}>Edit</button>
                </div>
            ))}
            </div>

            {
                edit && selectedTask? 
                <>
                    <h1>Editing task...</h1>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleChange} name="title" type="text" defaultValue={selectedTask.title} required />
                        <textarea onChange={handleChange} name="description" defaultValue={selectedTask.description} required />
                        <label>
                        Completed:
                        <input onChange={handleChange} type="checkbox" name="completed" defaultChecked={selectedTask.completed} />
                        </label>
                        
                        <button>Confirm editing</button>
                    </form>
                </>
                :
                null
            }
          
        </div>
    </section>
    )
}

export default TasksContainer
