import {
    TaskRepository,
} from 'infrastructure/task';

export interface TaskService {

}

export class TaskServiceImpl implements TaskService {
    constructor(
        private readonly repository: TaskRepository,
    ) {}
}