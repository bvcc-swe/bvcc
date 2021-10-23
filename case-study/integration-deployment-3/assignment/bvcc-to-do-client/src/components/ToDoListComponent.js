import { useEffect, useState } from 'react';
import { ApiClient } from '../clients/ApiClient';
import { ToDoListItemComponent } from './ToDoListItemComponent';
import { CreateToDoListItemComponent } from './CreateToDoListItemComponent'
import { CreateRequestComponent } from './CreateRequestComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToDoListItemControlComponent } from './ToDoListItemControlComponent'
/**
 * Creates a component that represents a to-do list.
 */
export const ToDoListComponent = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const client = new ApiClient();
            const result = await client.getAll();
            setItems(result);
        })();
    }, []);

    const updateItem = async (item) => {
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

    const createItem = async (item) => {
        const client = new ApiClient();
        const result = await client.create(item);
        setItems([...items, result]);
    }

    const deleteItem = item => {
        return async () => {
            const client = new ApiClient();
            await client.delete(item.id);
            const index = items.findIndex(x => x.id === item.id);
            items.splice(index, 1);
            setItems([...items]);
        }
    }

    const openDialog = (item) => {
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
        createRequest={openDialog}>
        <ToDoListItemControlComponent onClick={deleteItem(x)}>
            <FontAwesomeIcon icon="trash" />
        </ToDoListItemControlComponent>
    </ToDoListItemComponent>);

    return (
        <div>
            <ul className="list">
                {toDoListItems}
                <CreateToDoListItemComponent createItem={createItem} />
            </ul>
            {
                isDialogOpen &&
                (<div className={`overlay ${isDialogOpen && "active"}`}>
                    <CreateRequestComponent item={selectedItem} updateItem={updateItem} closeDialog={closeDialog} />
                </div>)
            }
        </div>
    )
}