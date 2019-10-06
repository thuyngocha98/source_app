import { combineReducers } from 'redux';
// import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual'

// Import reducer component
import productReducer from './productReducer';
import placeReducer from './placeReducer';
import inforUser from './inforUser';
import getApiForSearchReducer from './getApiForSearchReducer'

const rootReducer = combineReducers({
    products: productReducer,
    places: placeReducer,
    inforUser: inforUser,
    getApiForSearch: getApiForSearchReducer,
});

export default rootReducer;