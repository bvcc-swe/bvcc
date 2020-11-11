import { ToDoListItem } from '../models/ToDoListItem'
import data from '../data/items.json'

export class ApiClient {
    static itemsById: Map<number, ToDoListItem>;

    constructor() {
        if (!ApiClient.itemsById) {
            ApiClient.itemsById = data.reduce((map, item) => map.set(item.id, item), new Map<number, ToDoListItem>());
        }
    }

    async create(item: ToDoListItem) {
        const id = Math.max(...ApiClient.itemsById.keys()) + 1;
        const result = {...item, id};
        ApiClient.itemsById.set(result.id, result);
        return result;
    }

    async get(id: number): Promise<ToDoListItem | null> {
        return ApiClient.itemsById.get(id) || null;
    }

    async getAll(): Promise<ToDoListItem[]> {
        return [...ApiClient.itemsById.values()];
    }

    async update(item: ToDoListItem): Promise<ToDoListItem> {
        let result = ApiClient.itemsById.get(item.id);
        if (!result) {
            return Promise.reject(new Error(`An item with id, ${item.id}, was not found.`))
        }
        // merge the existing item and the updated item
        result = {...result, ...item}
        ApiClient.itemsById.set(result.id, result);
        return result;
    }

    async delete(id: number): Promise<void> {
        ApiClient.itemsById.delete(id);
    }
}