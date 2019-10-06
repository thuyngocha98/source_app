import { SAVE_INFO_USER } from "../actions/ActionTypes";


const initialState = {
    userName: '',
    userID: '',
    userToken: ''
  };

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_INFO_USER:
            return {...state,
                userName: state.userName, userID: state.userID, userToken:state.userToken}; 
        default:
            return state;
    }
};
export default productReducer;