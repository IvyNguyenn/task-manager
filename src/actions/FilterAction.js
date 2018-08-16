import * as Types from "../constrains/ActionTypes";

export const filterTask = filter => {
    return {
        type: Types.FILTER_TASK,
        filter
    };
};
