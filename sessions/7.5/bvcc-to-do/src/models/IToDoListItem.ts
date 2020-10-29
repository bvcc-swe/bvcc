export type IToDoListItem = {
    id: number;
    user: string;
    title: string;
    isComplete: boolean;
    request: Request | null;
}

type Request = {
    distance: number;
    duration: number;
    ask: number;
}