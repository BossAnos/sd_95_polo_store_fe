import { PATCH_PRODUCT_FORM, PUT_PRODUCT_FORM, SET_PRODUCTS } from "./constant"

const putProductForm = (payload) => {
    return {
        type: PUT_PRODUCT_FORM,
        payload
    }
}

const patchProductForm = (payload) => {
    return {
        type: PATCH_PRODUCT_FORM,
        payload
    }
}

const setProducts = (payload) => {
    return {
        type: SET_PRODUCTS,
        payload
    }
}

export {
    putProductForm,
    patchProductForm,
    setProducts
}