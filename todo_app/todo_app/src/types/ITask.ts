export default interface ITask {
    id: number
    title: string
    description: string
    done: boolean
    dueDate: string
    priority: 'High' | 'Medium' | 'Low'
}