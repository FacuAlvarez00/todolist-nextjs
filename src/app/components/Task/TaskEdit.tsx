'use client'

import React from 'react'

type props = {
    handleSubmit: any
    handleChange: any
    handleTaskEdit: any
    selectedTask: any



}

const TaskEdit: React.FC<props> = ({
    handleSubmit, handleChange, handleTaskEdit, selectedTask
}) => {
    return (
        <>
            

            <div className='editForm_wrapper mt-2'>
                <h2>Editing task...</h2>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex flex-column input-group input-group-lg'>
                        <input maxLength={40} onChange={handleChange} name="title" type="text" defaultValue={selectedTask.title} required className='mb-2 input-group-text input-edit input-edit-title' id="inputGroup-sizing-lg" />
                        <textarea maxLength={120} onChange={handleChange} name="description" defaultValue={selectedTask.description} className='mb-2 input-group-text input-edit input-edit-text' id="inputGroup-sizing-lg" />

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
    )
}

export default TaskEdit