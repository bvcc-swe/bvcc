import { useEffect, useState } from 'react';
import { ApiClient } from '../clients/ApiClient';
import { ToDoListItemComponent } from './ToDoListItemComponent';
import CreateToDoListItemComponent from './CreateTodoListItemComponent';

/**
 * Creates a component that represents a to-do list.
 */
export const ToDoListComponent = () => {
    const [items, setItems] = useState([]);

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

    // Hint: Use this anonymous function to create new item.
    const createItem = async (item) => {
        const client = new ApiClient();
        const result = await client.create(item);
        setItems([...items, result]);
    }

    const toDoListItems = items.map(x => <ToDoListItemComponent
        item={x}
        updateItem={updateItem}
        key={x.id}
    />);

    return (
        <div>
            <ul className="list">
                {toDoListItems}
                {/* Replace the code below with your component, CreateToDoListItemComponent */}
                {/* <ToDoListItemComponent
                    item={{
                        id: -1,
                        // title: "<!--Replace this code with your component, CreateToDoListItemComponent.-->",
                        title: "",
                        isComplete: false,
                        request: null
                    }}
                    updateItem={updateItem} /> */}
                <CreateToDoListItemComponent
                    item={{
                        title: "",
                        isComplete: false,
                        request: null
                    }}
                    createItem={createItem}
                />
            </ul>
        </div>
    )
}