import { GET_API_FOR_SEARCH } from "../actions/ActionTypes";


const initialState = {
    data: []
};

const getApiForSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        // case RECEIVE_PRODUCTS_CATEGORY:
        //     return { ...state,
        //         products: action.products };
        case GET_API_FOR_SEARCH:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};
export default getApiForSearchReducer;