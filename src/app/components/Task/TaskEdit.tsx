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
            <h1>Editing task...</h1>

            <div className='editForm_wrapper'>

                <form onSubmit={handleSubmit}>
                    <div className='d-flex flex-column input-group input-group-lg'>
                        <input style={{ textAlign: "start", height: "80px" }} maxLength={40} onChange={handleChange} name="title" type="text" defaultValue={selectedTask.title} required className='mb-2 input-group-text' id="inputGroup-sizing-lg" />
                        <textarea maxLength={120} onChange={handleChange} name="description" defaultValue={selectedTask.description} required className='mb-2 input-group-text' id="inputGroup-sizing-lg" style={{ textAlign: "start", height: "120px" }} />

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