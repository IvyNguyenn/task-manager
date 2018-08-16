import * as Types from "../constrains/ActionTypes";

const initialState = {
    title: "",
    status: ""
};

let reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FILTER_TASK:
            state = action.filter;
            return action.filter;
        default:
            return state;
    }
};

export default reducer;
