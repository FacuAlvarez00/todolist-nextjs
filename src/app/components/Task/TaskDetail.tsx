'use client'

import React from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import { useSelector } from 'react-redux'




type props = {
    tasks: any
    displayedTask: any
    handleDisplay: any
    handleTaskEdit: any
    confirmationAlert: any
    tasksFromLocalStorage: any
  }




const TaskDetail: React.FC<props> = ({tasks, displayedTask, handleDisplay, handleTaskEdit, confirmationAlert, tasksFromLocalStorage}) => {


   

    return (
        <div>
            <div className='tasks__holder'>
                {tasks && Array.isArray(tasks) && tasks.map((task: any) => (
                    <div className='task' key={task.id}>
                  
                            <div className=''>
                                <h4 className='fw-semibold task__title'>{task.title}</h4>

                                <span role="button" onClick={() => handleDisplay(task.id)}>
                                    {displayedTask === task.id ?
                                        <RiArrowDropDownLine className='display_arrow'  />
                                        :
                                        <RiArrowDropUpLine className='display_arrow'  />

                                    }

                                </span>

                            </div>


                            <div className='mb-3'>
                                {displayedTask === task.id ? <p style={{ margin: "0" }} className='fst-italic task__desc'>{task.description}</p> : null}
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
                                <button className='btn btn-dark btn__task' onClick={() => handleTaskEdit(task.id)}>Edit</button>
                                <button className='btn btn-danger btn__task' onClick={() => confirmationAlert(task.id)}>Delete</button>

                            </div>


                        </div>


                    </div>
                ))}
            </div>

        </div>
    )
}

export default TaskDetail