import axios from 'axios'

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from './../constants/productConstants';


export const listProducts = (price={minimum: 0, maximum:950},weight=1000)=> async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST});
        console.log(price);
        const { data } = await axios.get(`/api/cake?price[gte]=${price.minimum}&price[lte]=${price.maximum}&weight[gte]=${weight}`);

        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        })
    }
}