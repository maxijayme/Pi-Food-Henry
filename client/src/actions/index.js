import axios from 'axios';
import {GET_RECIPES, GET_DIETS, FILTER_RECIPES, ORDER_BY_NAME, ORDER_BY_SCORE, GET_RECIPE_ID, CREATE_RECIPE, CLEAR_DETAIL} from './actionTypes.js'


// const LOCAL_HOST = "http://localhost:3001";
const LOCAL_HOST = "https://food-750i.onrender.com"

export function getRecipes(){
    return async function(dispatch){
        let recipes = await axios.get(`${LOCAL_HOST}/recipes`);
        return dispatch({
            type: GET_RECIPES,
            payload: recipes.data
        })
    }
}


//obtener recipe por ID
export function getRecipeByID(id) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`${LOCAL_HOST}/recipes/${id}`);
            return dispatch({
                type: GET_RECIPE_ID, payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};


//obtener dietas

export function getDiets(){
    return function (dispatch){
        try{
            axios.get(`${LOCAL_HOST}/diets`)
            .then(diets => 
                dispatch({
               type: GET_DIETS,
               payload: diets.data
               })
           )
        }
        catch(error){
            console.log(error)
        }
    }
}




//crear receta

export function postRecipe(data) {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${LOCAL_HOST}/recipes`, data);
        dispatch({ type: CREATE_RECIPE, payload: response.data });
      } catch (error) {
        dispatch({ type: CREATE_RECIPE, payload: error });
      }
    };
  }



// //filtro las dieta   s

export function filteredRecipes(payload){
    return{
        type: FILTER_RECIPES,
        payload
    }
}


//orden alfabetico

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

//orden por score

export function orderByScore(payload){
    return{
        type: ORDER_BY_SCORE,
        payload
    }
}

//borro detalles
export function clearDetail(){
    return{
        type: CLEAR_DETAIL,
        payload:{}
    }
}