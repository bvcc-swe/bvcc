import React, { FunctionComponent, useEffect, useState } from 'react';
import { ApiClient } from '../clients/ApiClient';
import { ToDoListItem } from '../models/ToDoListItem';
import { ToDoListItemComponent } from './ToDoListItemComponent';

export const ToDoListComponent: FunctionComponent = () => {
    const [items, setItems] = useState<ToDoListItem[]>([]);

    useEffect(() => {
        (async () => {
            const client = new ApiClient();
            const result = await client.getAll();
            setItems(result);
        })();
    }, []);

    const updateItem = async (item: ToDoListItem) => {
        const client = new ApiClient();
        const result = await client.update(item);
        const index = items.findIndex(x => x.id === item.id);
        items[index] = result;
        setItems([...items]);
    }

    const createRequest = () => {
        alert("This feature is not supported.")
    }

    const toDoListItems = items.map(x => <ToDoListItemComponent
        item={x}
        updateItem={updateItem}
        createRequest={createRequest} />);

    return (
        <div>
            <ul className="list">
                {toDoListItems}
            </ul>
        </div>
    )
}