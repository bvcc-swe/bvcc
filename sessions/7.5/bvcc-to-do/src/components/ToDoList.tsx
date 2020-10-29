import items from '../data/items.json' 
import React, {FunctionComponent} from 'react'
import {ToDoListItem} from './ToDoListItem'

export let ToDoList: FunctionComponent = () => {
    let c = items.map(x => <ToDoListItem item={x}/>);
    return (
        <ul className= "list">
            {c}
        </ul>

    )
}