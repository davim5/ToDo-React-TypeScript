import { Trash } from 'phosphor-react';

import styles from './styles.module.css';

interface TaskProps {
    id: string;
    content: string;
    isChecked: boolean;
    onDeleteTask:(id:string) => void;
    onCheckTask:(id:string) => void;
}

export function Task({content, isChecked, onDeleteTask, onCheckTask, id }:TaskProps){

    function handleDeleteTask(id:string){
        onDeleteTask(id);
    }

    function handleToggleTask(id:string) {
        onCheckTask(id);
    }

    return (      
        <li className={styles.task}>
            <div onClick={() => handleToggleTask(id)}> 
                {isChecked ?
                 <input type="checkbox" id='checkbox'checked/> 
                 : 
                 <input type="checkbox" id='checkbox'/> }
                <p className={isChecked ? styles.textTaskChecked : ''}>{content}</p>
            </div>
            <button onClick={() => handleDeleteTask(id)}>
                <Trash size={20}/>
            </button>
        </li>     
    )
};

