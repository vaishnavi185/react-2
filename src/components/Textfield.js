import React, { useState , useEffect } from 'react';
import '../components/style.css';

export default function Textfield() {
  useEffect(
    ()=>{
      if(localStorage.getItem("localTask")){
        const storedList =JSON.parse(localStorage.getItem("localTask"))
        setTasks([...storedList])
      }
    },[]
  )
  const [task, setTask] = useState("");  // Change the state variable name
  const [tasks, setTasks] = useState([]);  // Use a different name for the state array

  const addTask = () => {
    if (task.trim()) {
      const newTsk = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTsk]);
      localStorage.setItem('localTask', JSON.stringify([...tasks, newTsk]));
      setTask("");
    }
  };
  const handledelete = (taskId) => {
    const deleted = tasks.filter((t) => t.id !== taskId); 
    setTasks(deleted);
    localStorage.setItem('localTask', JSON.stringify(deleted));
  };
  
  return (
    <div className='center-container'>
      <div className='container'>
        <input
          className='in'
          id='myinput'
          placeholder='Task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        ></input>
        <button className='b' onClick={addTask}>
          ADD
        </button>
      </div>
      <div className='task-container'>
        {tasks.map((t) => (
          <React.Fragment key={t.id}>
             <div className='task-list'>
              <div >
              {t.title}</div>
            <button className='delete-button'
            onClick={()=>handledelete(t.id)}
            >Delete</button>
            <br></br>
            </div>
           
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
