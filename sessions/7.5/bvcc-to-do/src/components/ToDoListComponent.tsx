import React, { FunctionComponent, useEffect, useState } from 'react';
import { ApiClient } from '../clients/ApiClient';
import { ToDoListItem } from '../models/ToDoListItem';
import { CreateRequestComponent } from './CreateRequestComponent';
import { CreateToDoListItemComponent } from './CreateToDoListItemComponent';
import { ToDoListItemComponent } from './ToDoListItemComponent';

export const ToDoListComponent: FunctionComponent = () => {
    const [items, setItems] = useState([] as ToDoListItem[]);
    const [selectedItem, setSelectedItem] = useState(null as ToDoListItem | null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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

    const createItem = async (item: ToDoListItem) => {
        const client = new ApiClient();
        const result = await client.create(item);
        setItems([...items, result]);
    }

    const openDialog = (item: ToDoListItem) => {
        if (!item) {
            return;
        }
        setSelectedItem(item);
        setIsDialogOpen(true);
    }

    const closeDialog = () => {
        setSelectedItem(null);
        setIsDialogOpen(false);
    }

    const toDoListItems = items.map(x => <ToDoListItemComponent
        item={x}
        updateItem={updateItem}
        createRequest={openDialog} />);

    return (
        <div>
            <ul className="list">
                {toDoListItems}
                <CreateToDoListItemComponent createItem={createItem} />
            </ul>
            {
                isDialogOpen &&
                (<div className={`overlay ${isDialogOpen && "active"}`}>
                    <CreateRequestComponent item={selectedItem as ToDoListItem} updateItem={updateItem} closeDialog={closeDialog} />
                </div>)
            }
        </div>
    )
}