'use client';

import React, { use, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, addTask, editTask, setTasks } from '../../GlobalRedux/features/task/taskSlice';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import TaskForm from './TaskForm';
import { getOrderTask } from "../../firebase"
import { taskDeleted, taskEdited, confirmationAlert } from '../../utils/sweetalert';
import Swal from 'sweetalert2';
import TaskDetail from './TaskDetail';
import TaskEdit from './TaskEdit';
import { UserAuth } from '@/app/context/AppContext';





const TasksContainer = () => {



    
    const [tasksFromLocalStorage, setTasksFromLocalStorage] = useState<any>()
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

    const { userChanged, user } = UserAuth()



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
                else{
                    setDataLoaded(true);
                   
                }
            } catch (error) {
                console.log(error);
            }
        },1000);
        return () => clearTimeout(timeoutId);
    }, [user]);

 
    const maxNameWords = 2;
    const trimmedName = user?.displayName ? user.displayName.split(' ').slice(0, maxNameWords).join(' ') : '';
 


    return (

        <section className='tasksContainer'>
            {dataLoaded ?
                <div>
                {user? <p className='welcome-message d-flex justify-content-start'>Welcome,<br></br>{trimmedName}</p> : <p className='welcome-message d-flex justify-content-start'>GUEST</p>}
           
                  <TaskDetail tasks={tasks} tasksFromLocalStorage={tasksFromLocalStorage} displayedTask={displayedTask} handleDisplay={handleDisplay}
                  handleTaskEdit={handleTaskEdit} confirmationAlert={confirmationAlert}
                  />
                    {
                        edit && selectedTask ?
                            <>
                            <TaskEdit handleSubmit={handleSubmit} handleChange={handleChange}
                            handleTaskEdit={handleTaskEdit} selectedTask={selectedTask}/>
                            </>
                            :
                            null
                    }
                    <TaskForm edit={edit} dataLoaded={dataLoaded} setTasksFromLocalStorage={setTasksFromLocalStorage} tasksFromLocalStorage={tasksFromLocalStorage} />
                </div>


                :
                <div className='conditional_div'>

                <div className='d-flex justify-content-center' >
                    <div className="spinner-border text-info" style={{ width: "4rem", height: "4rem" }} role="status">
                        <span className="sr-only"></span>
                </div>
            </div>

            <TaskForm edit={edit} dataLoaded={dataLoaded} setTasksFromLocalStorage={setTasksFromLocalStorage} tasksFromLocalStorage={tasksFromLocalStorage}/>

            </div>

            }



        </section>
    )
}

export default TasksContainer
{/* 
 */}