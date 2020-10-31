import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from './../constants/productConstants';


export const productListReducer = (state = {products:{}},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
             return {loading:true, products:{}};
        case PRODUCT_LIST_SUCCESS:
             return{
                 loading:false,
                 products: action.payload
             }
        case PRODUCT_LIST_FAIL:
             return {loading: false , error: action.payload}
        default :return state
    }
}

export const reviewListReducer = (state = {reviews:{}},action)=>{
    switch(action.type){
        case REVIEW_LIST_REQUEST:
             return {loading:true, reviews:{}};
        case REVIEW_LIST_SUCCESS:
             return{
                 loading:false,
                 reviews: action.payload
             }
        case REVIEW_LIST_FAIL:
             return {loading: false , error: action.payload}
        default :return state
    }
}

export const productDetailsReducer = (state = {product:{ reviews: [] }},action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
             return {loading:true, ...state};
        case PRODUCT_DETAILS_SUCCESS:
             return{
                 loading:false,
                 product: action.payload.data
             }
        case PRODUCT_DETAILS_FAIL:
             return {loading: false , error: action.payload}
        default:
            return {...state};
    }
}