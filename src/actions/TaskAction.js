import * as Types from "../constrains/ActionTypes";
import { fetchDB } from "../components/util/firebaseCaller";

export const fetchTasksFirebase = () => {
    return dispatch => {
        return fetchDB().then(res => {
            dispatch(fetchTasks(res));
        });
    };
};

export const fetchTasks = tasks => {
    return {
        type: Types.FETCH_TASKS,
        tasks
    };
};

export const addTask = task => {
    return {
        type: Types.ADD_TASK,
        task
    };
};

export const deleteTask = id => {
    return {
        type: Types.DELETE_TASK,
        id
    };
};

export const deleteAllTask = () => {
    return {
        type: Types.DELETE_ALL_TASK
    };
};

export const updateTask = task => {
    return {
        type: Types.UPDATE_TASK,
        task
    };
};

export const toggleTaskStatus = id => {
    return {
        type: Types.TOGGLE_TASK_STATUS,
        id
    };
};

export const setTaskStatus = (id, status) => {
    return {
        type: Types.SET_TASK_STATUS,
        id,
        status
    };
};
