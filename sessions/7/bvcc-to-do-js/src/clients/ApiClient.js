import data from '../data/items.json'
import cloneDeep from 'lodash/cloneDeep';

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
        const id = Math.max(...ApiClient.itemsById.keys()) + 1;
        const result = { ...item, id };
        ApiClient.itemsById.set(result.id, result);
        return result;
    }

    /**
     * Gets an item.
     * @param {number} id - The item ID. 
     * @returns {Promise<ToDoListItem | null>} A promise contain the item with the corresponding ID. 
     */
    async get(id) {
        let result = ApiClient.itemsById.get(id);
        result = result ? cloneDeep(result) : null;
        return result;
    }

    /**
     * Gets all items.
     * @returns {Promise<ToDoListItem[]>} A promise containing a collection of all items.
     */
    async getAll() {
        return Array.from(ApiClient.itemsById.values(), x => cloneDeep(x));
    }

    /**
     * Updates an item.
     * @param {ToDoListItem} item - The updated item.
     * @returns {Promise<ToDoListItem>} A promise containing the updated item.
     */
    async update(item) {
        let result = ApiClient.itemsById.get(item.id);
        if (!result) {
            return Promise.reject(new Error(`An item with id, ${item.id}, was not found.`))
        }
        // merge the existing item and the updated item
        result = { ...result, ...item }
        ApiClient.itemsById.set(result.id, result);
        return cloneDeep(result);
    }

    /**
     * 
     * @param {number} id - The item ID.
     * @returns {Promise} An empty promise.
     */
    async delete(id) {
        ApiClient.itemsById.delete(id);
    }
}