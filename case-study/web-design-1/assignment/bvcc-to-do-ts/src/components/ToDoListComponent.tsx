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
        try {
            const result = await client.update(item);
            const index = items.findIndex(x => x.id === result.id);
            items[index] = result;
            setItems([...items]);
        }
        catch (error) {
            console.error(error);
        }
    }

    // Hint: Use this anonymous function to create new item.
    const createItem = async (item: ToDoListItem) => {
        const client = new ApiClient();
        const result = await client.create(item);
        setItems([...items, result]);
    }

    const toDoListItems = items.map(x => <ToDoListItemComponent
        item={x}
        updateItem={updateItem} />);

    return (
        <div>
            <ul className="list">
                {toDoListItems}
                {/* Replace the code below with your component, CreateToDoListItemComponent */}
                <ToDoListItemComponent
                    item={{
                        id: -1,
                        user: "john",
                        title: "<!--Replace this code with your component, CreateToDoListItemComponent.-->",
                        isComplete: false,
                        request: null
                    }}
                    updateItem={updateItem} />
            </ul>
        </div>
    )
}