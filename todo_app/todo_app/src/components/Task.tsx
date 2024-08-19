import { useState } from "react"
import XIcon from "../icons/XIcon"
import ITask from "../types/ITask"

export default function Task({ task, handleDelete, handleDone }: { task: ITask, handleDelete: (id: number) => void, handleDone: (id: number, doneState: boolean) => void }) {

    const [done, setDone] = useState(task.done)

    function toBool(event: React.ChangeEvent<HTMLInputElement>) {
        if (done) {
            setDone(false);
            return false;
        }
        setDone(true);
        return event.target.value === 'on' ? true : false
    }

    return (
        <div className='border w-96 rounded p-2 flex justify-between items-start' key={task.id}>
            <div>
                <h3 className={!task.done ? 'text-lg font-medium' : 'text-lg font-medium line-through italic text-slate-500'}>{task.title}</h3>
                <p className={!task.done ? '' : 'line-through italic text-slate-500'}>{task.description}</p>
            </div>
            <div className='flex flex-col'>
                <button onClick={() => handleDelete(task.id)}><XIcon strokeWidth={2.0}/></button>
                <input onChange={e => handleDone(task.id, toBool(e))} type="checkbox" checked={done} name="markasdone" id="markasdone" />
            </div>
        </div>
    )
}