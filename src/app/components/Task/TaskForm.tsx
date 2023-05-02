'use client';

import { useEffect, useState } from 'react';
import { addTask } from '../../GlobalRedux/features/task/taskSlice';
import { setUser } from '../../GlobalRedux/features/account/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import {createOrder} from "../../firebase"
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../../app/firebase"




type props = {
  edit: any
}

const TaskForm: React.FC<props>= ({edit}) => {

  const tasks = useSelector((state: any) => state.tasks);

  const user = useSelector((state: any) => state.user.user);


  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      dispatch(setUser(currentUser))
    })
    return () => {
      unsubscribe()
    }
  }, [dispatch])

  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addTask(task));
    
  }

  const handleChange = (e: any) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompletedChange = () => {
    setTask({
      ...task,
      completed: !task.completed,
    });
  };

  function sendInfo() {
    const order = {
        userinfo: user?.uid,
        username: user?.displayName,
        tasks: tasks,
        date: new Date(),
      };
    createOrder(order)
    }


    useEffect(() => {
      if (user) {
        const timer = setTimeout(() => {
          sendInfo();
        }, 500);
        
        return () => clearTimeout(timer);
      }
    }, [handleSubmit, sendInfo, user]);

  return (
  <section>
    {
      edit ? null :  <div className='d-flex justify-content-center'>
      <form onSubmit={handleSubmit}>
        <div className='d-flex flex-column input-group input-group-lg'>
          <input maxLength={40} style={{ width: "400px", height: "50px"}} className='mb-2 input-group-text' id="inputGroup-sizing-lg" onChange={handleChange} name="title" type="text" placeholder="title" required />
          <textarea maxLength={120} style={{ width: "400px", height: "120px"}} className='mb-2 input-group-text' id="inputGroup-sizing-lg" onChange={handleChange} name="description" placeholder='description' required />
          <label className='mb-2'>
           <span className='fs-5'>Completed:</span> 
            <input type="checkbox" checked={task.completed} onChange={handleCompletedChange} />
          </label>
        

        </div>


        <button className='btn btn-success'>Save task</button> 

      </form>

    </div>
    }
       

  </section>

  )
}

export default TaskForm
