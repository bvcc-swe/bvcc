import { ToDoListItemRequest } from './ToDoListItemRequest'

export type ToDoListItem = {
    id: number;
    user: string;
    title: string;
    isComplete: boolean;
    request: ToDoListItemRequest | null;
}
