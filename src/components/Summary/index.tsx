import { PlusCircle } from 'phosphor-react';
import Clipboard from '../../assets/Clipboard.svg';
import {v4 as uuidv4}  from 'uuid';
import { FormEvent,ChangeEvent, useState } from 'react';
import { Task } from '../Task'
import styles from './styles.module.css';

interface Task {
  id:string;
  content:string;
  isChecked?:boolean;
}

export function Summary(){
  const [ tasks, setTasks ] = useState([
    {
      id: uuidv4() ,
      content:'dsada',
      isChecked: false
    }
  ])

  const [newTask,setNewTask] = useState(
    {
      id:'',
      content:'',
      isChecked: false
    }
  );

  function handleCreateNewTask(event: FormEvent){
    event.preventDefault()
    setTasks([...tasks, newTask]);
    setNewTask({
      id:'',
      content: '',
      isChecked: false
    })
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTask({
      id:uuidv4(),
      content: event.target.value,
      isChecked: false
    });
};

function DeleteTask(id:string){
  const tasksWithoutDeletedOne = tasks.filter(tasks=>(tasks.id !== id))
  setTasks(tasksWithoutDeletedOne);
}

function toggleTaskCheckedById(id:string){
  const toggleTasks = tasks.map(task => {
    if(task.id === id) {
      return {
        ...task,
        isChecked: !task.isChecked,
      };
    }
    return task;
  });
  setTasks(toggleTasks);
}

const amountTasks = tasks.length;
const completedTasks = tasks.filter(task=> task.isChecked===true).length;

    return (
    <>
      <div className={styles.inputTask}>
        <form onSubmit={handleCreateNewTask}>
          <input 
          onChange={handleNewTaskChange} 
          value={newTask.content}
          type="text" 
          placeholder='Adicione uma nova tarefa'
          required
          />
          <button>Criar <PlusCircle size={16} fontWeight={600}/></button>
        </form>
      </div>
      <div className={styles.main}>
        <header className={styles.statusTask}>
          <div className={styles.created}>
            <strong>Tarefas criadas</strong>
            <span>{tasks.length}</span>
          </div>
          <div className={styles.done}>
            <strong>Concluídas</strong>
            {amountTasks !== 0 ? 
            (<span>{completedTasks} de {amountTasks}</span>) : 
            (<span>{amountTasks}</span>)
          }
            
          </div>
        </header>
        {amountTasks !== 0 ? (
          <div className={styles.taskList}>
          <ul>
            {tasks.map(task=>{
              return (
                <Task 
                key={task.id} 
                id={task.id} 
                content={task.content} 
                isChecked={task.isChecked} 
                onDeleteTask={DeleteTask}
                onCheckTask={toggleTaskCheckedById}
                />
              )
            })}
          </ul>
        </div>
        ) :
        (
          <div className={styles.noTasks} >
            <img src={Clipboard} alt="" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie suas tarefas e organize seus itens a fazer</p>
          </div>
        )
      }
      </div>
    </>
    )
};

