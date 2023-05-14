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

    const user = useSelector((state: any) => state.user.user);

   

    return (
        <div>
            <div className='tasks__holder border border-1 rounded border-bottom-0  border-light-subtle mb-4'>
                {tasks && Array.isArray(tasks) && tasks.map((task: any) => (
                    <div className=' mb-1 border-bottom border-light-subtle p-2' key={task.id}>
                        <div className=''>
                            <div className=''>
                                <h4 className='fw-semibold'>{task.title}</h4>

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

        </div>
    )
}

export default TaskDetail
