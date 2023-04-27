'use client';

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, addTask, editTask } from '../../GlobalRedux/features/task/taskSlice';
import { AiFillCheckCircle } from "react-icons/ai"
import { RxCrossCircled } from "react-icons/rx"
import { RiArrowDropDownLine } from "react-icons/ri"
import TaskForm from './TaskForm';


const TasksContainer = () => {
    const [edit, setEdit] = useState(false);

    const [selectedTask, setSelectedTask] = useState<any>()
    const [displayedTask, setDisplayedTask] = useState<any>()
    const [editedTask, setEditedTask] = useState<any>({
        title: selectedTask ? selectedTask.title : "",
        description: selectedTask ? selectedTask.description : "",
        completed: selectedTask ? selectedTask.completed : "",
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


    const handleDisplay = (id: any) => {
        if (displayedTask === id) {
            setDisplayedTask(null)
        } else {
            setDisplayedTask(id)
        }
    }


    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setEditedTask({
            ...editedTask,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    useEffect(() => {
        console.log(tasks)
    }, [handleSubmit])


    return (
        <section className='d-flex justify-content-center'>
            <div>
                <div style={{ minWidth: "700px" }} className='tasks__holder border border-1 rounded border-bottom-0  border-light-subtle mb-4'>
                    {tasks.value.map((task: any) => (
                        <div className='d-flex flex-column mb-1 border-bottom border-light-subtle p-2' key={task.id}>
                            <div className='d-flex flex-column'>
                                <div className='d-flex'>
                                    <h4>{task.title}</h4>
                                    {/*   {task.completed ? <AiFillCheckCircle style={{ width: "30px", height: "30px" }} /> : <RxCrossCircled style={{ width: "30px", height: "30px" }} />} */}

                                    <span role="button" onClick={() => handleDisplay(task.id)}>
                                        <RiArrowDropDownLine style={{ width: "30px", height: "30px" }} />
                                    </span>

                                </div>


                                <div>
                                    {displayedTask === task.id ? <p className='fs-5'>{task.description}</p> : null}
                                </div>
                            </div>

                            <div className='d-flex justify-content-between gap-2 me-2 mb-1'>

                                <div className='d-flex align-items-end'>
                                    {task.completed ? <span className='text-success'>Completed</span> : <span className='text-danger'>Not Completed</span>
                                    }

                                </div>

                                <div>
                                    <button className='btn btn-dark' onClick={() => handleTaskEdit(task.id)}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => handleTaskDelete(task.id)}>Delete</button>

                                </div>


                            </div>


                        </div>
                    ))}
                </div>


                {
                    edit && selectedTask ?
                        <>
                            <h1>Editing task...</h1>
                            <form onSubmit={handleSubmit}>
                                <input maxLength={40} onChange={handleChange} name="title" type="text" defaultValue={selectedTask.title} required />
                                <textarea maxLength={120} onChange={handleChange} name="description" defaultValue={selectedTask.description} required />
                                <label>
                                    Completed:
                                    <input onChange={handleChange} type="checkbox" name="completed" defaultChecked={selectedTask.completed} />
                                </label>

                                <button className='btn btn-success'>Confirm editing</button>
                            </form>
                        </>
                        :
                        null
                }
                <TaskForm edit={edit}/>
            </div>
        </section>
    )
}

export default TasksContainer
