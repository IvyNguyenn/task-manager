import * as Types from "../constrains/ActionTypes";
import { statuses } from "../constrains/StatusTask";

const data = JSON.parse(localStorage.getItem("TASKS"));
const initialState = data ? data : [];

let reducer = (state = initialState, action) => {
    let index;
    switch (action.type) {
        case Types.ADD_TASK:
            action.task.id = getId();
            state.push(action.task);
            saveToLocalStorage(state);
            return [...state];
        case Types.DELETE_TASK:
            state = state.filter(i => i.id !== action.id);
            saveToLocalStorage(state);
            return [...state];
        case Types.DELETE_ALL_TASK:
            console.log("Delete all");
            state = [];
            localStorage.removeItem("TASKS");
            return [...state];
        case Types.UPDATE_TASK:
            index = state.findIndex(i => i.id === action.task.id);
            state[index] = action.task;
            saveToLocalStorage(state);
            return [...state];
        case Types.TOGGLE_TASK_STATUS:
            let indexTask = state.findIndex(i => i.id === action.id);
            let indexStatus = statuses.indexOf(state[indexTask].status);
            if (indexStatus === statuses.length - 1)
                state[indexTask].status = statuses[0];
            else state[indexTask].status = statuses[indexStatus + 1];
            saveToLocalStorage(state);
            return [...state];
        default:
            return [...state];
    }
};

export default reducer;

const saveToLocalStorage = state => {
    localStorage.setItem("TASKS", JSON.stringify(state));
};

const getId = () => {
    return Math.random()
        .toString(36)
        .substring(2, 15);
};
