'use client';

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, addTask, editTask, setTasks } from '../../GlobalRedux/features/task/taskSlice';
import { AiFillCheckCircle } from "react-icons/ai"
import { RxCrossCircled } from "react-icons/rx"
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import TaskForm from './TaskForm';
import { getOrderTask } from "../../firebase"
import { taskDeleted, taskEdited, confirmationAlert } from '../../utils/sweetalert';
import Swal from 'sweetalert2';





const TasksContainer = () => {

    const user = useSelector((state: any) => state.user.user);

    const [dataLoaded, setDataLoaded] = useState(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [taskState, setTaskState] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<any>()
    const [displayedTask, setDisplayedTask] = useState<any>()
    const [displayedTaskEdit, setDisplayedTaskEdit] = useState<boolean>(false)
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

    const handleTaskCompleted = () => {
        setTaskState(!taskState)
    }

    function confirmationAlert(id: any) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Changes can't be reverted",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTask(id))
                taskDeleted()

            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
            }
        })
    }


    /*     const handleTaskDelete = (id: any) => {
            dispatch(deleteTask(id)) 
            confirmationAlert()
        }; */

    const handleTaskEdit = (id: any) => {
        setEdit(!edit)
        const selectedTask = tasks.find((task: any) => task.id === id);
        setSelectedTask(selectedTask)
        /*   setTaskState(!taskState) */

    };

    const displayedTaskEditHandler = () => {
        setDisplayedTaskEdit(!displayedTaskEdit)

    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(editTask({ id: selectedTask.id, ...editedTask }))
        taskEdited()
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


    /* 
        useEffect(() => {
            async function fetchData() {
                try {
                    if (user) { 
                        const { tasksFromDatabase } = await getOrderTask(user.uid);
                        dispatch(setTasks(tasksFromDatabase));
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData();
    
        }, [user]);
     */

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            try {
                if (user) {
                    const { tasksFromDatabase } = await getOrderTask(user.uid);
                    dispatch(setTasks(tasksFromDatabase));
                    setDataLoaded(true);
                }
            } catch (error) {
                console.log(error);
            }
        },);
        return () => clearTimeout(timeoutId);
    }, [user]);



    return (

        <section className='d-flex justify-content-center'>
            {dataLoaded ?
                <div>
                    <div className='tasks__holder border border-1 rounded border-bottom-0  border-light-subtle mb-4'>
                        {tasks && Array.isArray(tasks) && tasks.map((task: any) => (
                            <div className='d-flex flex-column mb-1 border-bottom border-light-subtle p-2' key={task.id}>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex'>
                                        <h4 className='fw-semibold'>{task.title}</h4>
                                        {/*   {task.completed ? <AiFillCheckCircle style={{ width: "30px", height: "30px" }} /> : <RxCrossCircled style={{ width: "30px", height: "30px" }} />} */}

                                        <span role="button" onClick={() => handleDisplay(task.id)}>
                                            {displayedTask === task.id ?
                                                <RiArrowDropDownLine className='display_arrow' style={{ width: "30px", height: "30px" }} />
                                                :
                                                <RiArrowDropUpLine className='display_arrow' style={{ width: "30px", height: "30px" }} />

                                            }

                                        </span>

                                    </div>


                                    <div>
                                        {displayedTask === task.id ? <p style={{ margin: "0" }} className='fs-5 fst-italic'>{task.description}</p> : null}
                                    </div>
                                </div>

                                <div className='d-flex justify-content-between gap-2 me-2 mb-1'>

                                    <div className='d-flex align-items-end'>

                                        {
                                            task.completed ?

                                                (<span className='text-success'>Completed</span>)
                                                :
                                                (<span className='text-danger'>Uncompleted</span>)
                                        }

                                    </div>

                                    <div className='d-flex gap-2'>
                                        <button className='btn btn-dark' onClick={() => handleTaskEdit(task.id)}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => confirmationAlert(task.id)}>Delete</button>

                                    </div>


                                </div>


                            </div>
                        ))}
                    </div>


                    {
                        edit && selectedTask ?
                            <>
                                <h1>Editing task...</h1>

                                <div className='editForm_wrapper'>

                                    <form onSubmit={handleSubmit}>
                                        <div className='d-flex flex-column input-group input-group-lg'>
                                            <input style={{ textAlign: "start", height: "80px" }} maxLength={40} onChange={handleChange} name="title" type="text" defaultValue={selectedTask.title} required className='mb-2 input-group-text' id="inputGroup-sizing-lg" />
                                            <textarea maxLength={120} onChange={handleChange} name="description" defaultValue={selectedTask.description} required className='mb-2 input-group-text' id="inputGroup-sizing-lg" style={{ textAlign: "start", height: "120px" }} />

                                            {/* <div className="form-check form-switch">
                                       <input onChange={handleChange}  className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" defaultChecked={selectedTask.completed} />
                                       <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Status</label>
                                   </div> */}

                                            <div className="form-check form-switch">
                                                <input onChange={handleChange} type="checkbox" className="form-check-input" id="btncheck1" name='completed' defaultChecked={selectedTask.completed} />
                                                <label className="form-check-label" htmlFor='btncheck1'>
                                                    Task status
                                                </label>
                                            </div>


                                        </div>
                                        <div className='d-flex gap-2'>
                                            <button className='btn btn-primary'>Confirm</button>
                                            <button onClick={handleTaskEdit} className='btn btn-secondary '>Cancel</button>
                                        </div>




                                    </form>

                                </div>

                            </>
                            :
                            null
                    }
                    <TaskForm edit={edit} dataLoaded={dataLoaded} />
                </div>


                :
                <div className='conditional_div'>
                    <div className='d-flex justify-content-center' >
                        <div className="spinner-border text-info" style={{ width: "4rem", height: "4rem" }} role="status">
                            <span className="sr-only"></span>
                        </div>

                    </div>

                    <TaskForm edit={edit} dataLoaded={dataLoaded} />
                </div>

            }



        </section>
    )
}

export default TasksContainer
{/* 
 */}