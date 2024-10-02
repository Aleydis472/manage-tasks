import { Person } from "./person.model";

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    dateEnd: string;
    people: Person[];
}
