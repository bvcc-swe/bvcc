import data from '../data/items.json'

/**
 * @typedef {Object} ToDoListItem
 * @property {number} id - The id.
 * @property {string} title - The title.
 * @property {boolean} isComplete - Indicates if the {@link ToDoListItem} is complete.
 */
export class ApiClient {
    /**@type {Map<number, ToDoListItem>} */
    static itemsById;
    constructor() {
        this.host = "https//localhost:3002"
        if (!ApiClient.itemsById) {
            ApiClient.itemsById = data.reduce((map, item) => map.set(item.id, item), new Map());
        }
    }

    /**
     * Creates an item.
     * @param {ToDoListItem} item - The item.
     * @returns {Promise<ToDoListItem>} A promise containing the created item.
     */
    async create(item) {
        const content = JSON.stringify(item);
        const response = await fetch(`${this.host}/api/todo`, {
            method: "POST", 
            body: content,
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (response !== 200) {
            Promise.reject(new Error("The item could not be created."));
        }

        return item.json();
    }

    /**
     * Gets an item.
     * @param {number} id - The item ID. 
     * @returns {Promise<ToDoListItem | null>} A promise contain the item with the corresponding ID. 
     */
    async get(id) {
        const response = await fetch(`${this.host}/api/todo/${id}`);
        if (response.status !== 200) {
            return null;
        }
        const item = response.json();
        return item;
    }

    /**
     * Gets all items.
     * @returns {Promise<ToDoListItem[]>} A promise containing a collection of all items.
     */
    async getAll() {
        const response = await fetch(`${this.host}/api/todo`);
        const items = await response.json();
        return items;
    } 

    /**
     * Updates an item.
     * @param {ToDoListItem} item - The updated item.
     * @returns {Promise<ToDoListItem>} A promise containing the updated item.
     */
    async update(item) {
        const response = await fetch(`${this.host}/api/todo/${item.id}`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        if (response.status !== 200) {
            Promise.reject(new Error("The item could not be updated."));
        }

        return item.json();
    }

    /**
     * 
     * @param {number} id - The item ID.
     * @returns {Promise} An empty promise.
     */
    async delete(id) {
        const response = await fetch(`${this.host}/api/todo/${id}`, { method: "DELETE" });
        if (response.status !== 200) {
            Promise.reject(new Error("The item could not be deleted."));
        }
    }
}