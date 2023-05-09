'use client';

import { useEffect, useState, useRef } from 'react';
import { addTask } from '../../GlobalRedux/features/task/taskSlice';
import { setUser } from '../../GlobalRedux/features/account/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import {createOrder} from "../../firebase"
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../../app/firebase"
import {infoSent}  from '../../utils/sweetalert';




type props = {
  edit: any
  dataLoaded: any
}

const TaskForm: React.FC<props>= ({edit, dataLoaded}) => {

  const tasks = useSelector((state: any) => state.tasks);
  const user = useSelector((state: any) => state.user.user);

  const [completed, setCompleted] = useState<boolean>(false)

  const handleCompleted = () => {
    setCompleted(!completed)
    }




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
    }, [tasks, user, dataLoaded])    
 

  return (
  <section>
    {
      edit ? null :  <div className='d-flex justify-content-center'>
      <form onSubmit={handleSubmit}>
      <h1>Add your task</h1>
        <div className='d-flex flex-column input-group input-group-lg'>
          <input /* ref={ref} */ maxLength={40} style={{ width: "700px", height: "80px"}} className='mb-2 input-group-text' id="inputGroup-sizing-lg" onChange={handleChange} name="title" type="text" placeholder="Title" required />
          <textarea maxLength={120} style={{ width: "100%", height: "120px"}} className='mb-2 input-group-text' id="inputGroup-sizing-lg" onChange={handleChange} name="description" placeholder='Description' required />

         {/*  <label className='mb-2'>
           <span className='fs-5'>Completed:</span> 
            <input type="checkbox" checked={task.completed} onChange={handleCompletedChange} />
          </label> */}
          <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">

          <input type="checkbox" className="btn-check" id="btncheck1" name='completed' onChange={handleCompletedChange}  />
        
        <label onClick={handleCompleted} htmlFor='btncheck1'className={
        completed? "btn btn-success mb-2" : "btn btn-danger mb-2"}>
                          {completed?  "Completed" : "Uncompleted"}
        </label>

          </div>

      
      
        </div>

        {dataLoaded?
        <button className='btn btn-primary '>Save task</button> 
        :
        <button className='btn btn-primary disabled'>Save task</button> 


        }
        
     


      </form>

    </div>
    }
       

  </section>

  )
}

export default TaskForm
