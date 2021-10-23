/**
 * @typedef {Object} ToDoListItem
 * @property {number} id - The id.
 * @property {string} title - The title.
 * @property {boolean} isComplete - Indicates if the {@link ToDoListItem} is complete.
 */
export class ApiClient {
    constructor() {
        this.baseUrl = `${process.env.REACT_APP_API_HOST}/api/todos`;
    }

    /**
     * Creates an item.
     * @param {ToDoListItem} item - The item.
     * @returns {Promise<ToDoListItem>} A promise containing the created item.
     */
    async create(item) {
        const response = await fetch(this.baseUrl, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            return response.json();
        }

        return Promise.reject(new Error("The item could not be created."))
    }

    /**
     * Gets an item.
     * @param {number} id - The item ID. 
     * @returns {Promise<ToDoListItem | null>} A promise contain the item with the corresponding ID. 
     */
    async get(id) {
        const response = await fetch(`{${this.baseUrl}/${id}`, {
            "Content-Type": "application/json"
        });

        if (response.ok) {
            return response.json()
        }

        return Promise.reject(new Error("The item was not found."));
    }

    /**
     * Gets all items.
     * @returns {Promise<ToDoListItem[]>} A promise containing a collection of all items.
     */
    async getAll() {
        const response = await fetch(this.baseUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            return response.json();
        }

        Promise.reject(new Error("The items could not be retrieved."));
    }

    /**
     * Updates an item.
     * @param {ToDoListItem} item - The updated item.
     * @returns {Promise<ToDoListItem>} A promise containing the updated item.
     */
    async update(item) {
       const response = await fetch(`${this.baseUrl}/${item.id}`, {
           method: "PUT",
           body: JSON.stringify(item),
           headers: {
               "Content-Type": "application/json"
           }
       });

       if (response.ok) {
           return response.json();
       }

       Promise.reject(new Error("The item could not be updated"));
    }

    /**
     * 
     * @param {number} id - The item ID.
     * @returns {Promise} An empty promise.
     */
    async delete(id) {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
 
        if (response.ok) {
            return;
        }
 
        Promise.reject(new Error("The item could not be deleted."));
    }
}