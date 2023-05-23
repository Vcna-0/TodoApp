export type TaskType = {
    id: number;
    text: string;
    completed: boolean;
};

export type DragEndDropParams = {
    destination?: {
        droppableId: string;
        index: number;
    };
    source: {
        index: number;
    };
};