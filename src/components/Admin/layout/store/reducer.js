import { act } from "react-dom/test-utils";
import { PATCH_PRODUCT_FORM, PUT_PRODUCT_FORM, SET_PRODUCTS } from "./constant";


const INIT_STATE = {
    productForm: {

    },
    products: []
}

const reducer = (state,action) => {
    switch (action.type) {
        case PUT_PRODUCT_FORM: 
            return {
                ...state,
                productForm: {
                    ...action.payload
                }
            }
         case PATCH_PRODUCT_FORM: 
            return {
                ...state,
                productForm: {
                    ...state.productForm,
                    ...action.payload
                }
            }
          case SET_PRODUCTS:
            return {
                ...state,
                products: [...state.payload]
            }   
        default:
            throw new Error("Invalid action type");
    }
}

export default reducer;

export {
    INIT_STATE
}