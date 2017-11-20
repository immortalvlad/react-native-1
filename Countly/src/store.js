import { createStore } from 'redux';

const initialState = {
    count: 0
};

const countReducer = (state=initialState,action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
            break;
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
            break;
        case 'ZERO':
            return {
                count: 0
            };
            break;
        default:
            return state;
    }
};


export default createStore(countReducer);