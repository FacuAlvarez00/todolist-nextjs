'use client';

import { useEffect, useState } from 'react';
import { addTask } from '../../GlobalRedux/features/task/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from "../../firebase"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../app/firebase"
import { infoSent } from '../../utils/sweetalert';
import { UserAuth } from '@/app/context/AppContext';





type props = {
  edit: any
  dataLoaded: any
  setTasksFromLocalStorage: any
  tasksFromLocalStorage: any
}

const TaskForm: React.FC<props> = ({ edit, dataLoaded,
  setTasksFromLocalStorage, tasksFromLocalStorage }) => {

  const tasks = useSelector((state: any) => state.tasks);
  /* const user = useSelector((state: any) => state.user.user); */
  const { userChanged, setUserChanged, handleSignOut, completed, setCompleted, handleCompleted, user, setUser} = UserAuth()



  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser)
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
    e.target.reset();
    infoSent()
    setCompleted(true)

  }

  const handleChange = (e: any) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  /*   const ref = useRef<HTMLInputElement>(null); */
  /* 
    const clearInputs = () => {
      ref.current.value = "";
  
    };
   */
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
    setCompleted(true)
  }


  useEffect(() => {
    if (user && dataLoaded) {
      const timer = setTimeout(() => {
        sendInfo();
      },);

      return () => clearTimeout(timer);
    }
  }, [user, dataLoaded, tasks])

  /*    useEffect(() => {
       if (user === null && dataLoaded) {
         const timer = setTimeout(() => {
           localStorage.setItem("tasks", JSON.stringify(tasks))
           console.log("test")
         },);
         
         return () => clearTimeout(timer);
       }
     }, [tasks, user, dataLoaded])   
   */


  return (
    <section className='form__container mt-2'>
      {
        edit ? null : 
          <form onSubmit={handleSubmit}>
            <h1 className='form__container__title'>Add your task</h1>
            <div className='input-group input-group-lg'>
              <input /* ref={ref} */ maxLength={40} className='mb-2 input-group-text formField' id="inputGroup-sizing-lg" onChange={handleChange} name="title" type="text" placeholder="Title" required />
              <textarea maxLength={120} className='mb-2 input-group-text formField__text' id="inputGroup-sizing-lg" onChange={handleChange} name="description" placeholder='Description' required />

              {/*  <label className='mb-2'>
           <span className='fs-5'>Completed:</span> 
            <input type="checkbox" checked={task.completed} onChange={handleCompletedChange} />
          </label> */}
            {/*   <div className="btn-group btn-status" role="group" aria-label="Basic checkbox toggle button group">

                <input type="checkbox" className="btn-check" id="btncheck1" name='completed' onChange={handleCompletedChange} />

                <label onClick={handleCompleted} htmlFor='btncheck1' className={
                  completed ? "btn btn-success  btn-status" : "btn btn-danger  btn-status"}>
                  {completed ? "Completed" : "Uncompleted"}
                </label>

              </div> */}
            </div>

            {dataLoaded ?
              <button className='btn btn-success btn-save'>Save task</button>
              :
              <button className='btn btn-success disabled btn-save'>Save task</button>
            }


          </form>

    
      }


    </section>

  )
}

export default TaskForm