import items from '../data/items.json' 
import TodoListItem from 'ToDoListItem'

export let ToDoListItem = () => {
    let c = items.map(x => <TodoListItem {x}/>);
    return (
        <ul>
            {c}
        </ul>
    )
}