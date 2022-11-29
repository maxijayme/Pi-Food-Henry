import axios from 'axios';
import {GET_RECIPES, GET_DIETS, FILTER_BY_DIET, FILTER_BY_SOURCE, ORDER_BY_NAME, ORDER_BY_SCORE, GET_RECIPE_NAME, GET_RECIPE_ID, CREATE_RECIPE} from './actionTypes.js'


const LOCAL_HOST = "http://localhost:3001";


export function getRecipes(){
    return async function(dispatch){
        let recipes = await axios.get(`${LOCAL_HOST}/recipes`);
        return dispatch({
            type: GET_RECIPES,
            payload: recipes.data
        })
    }
}

//obtener las recipes por nombre
export const getRecipesByName = (name) => dispatch =>{
    return fetch(`${LOCAL_HOST}/recipes?name=${name}`)
        .then(response => response.json())
        .then(recipe => dispatch({
            type: GET_RECIPE_NAME,
            payload: recipe
        }))
        .catch((error) => {
            console.log(error)
        })
};


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



// //filtro por tipo de dieta

export function filterByDietType(payload){
    return{
        type: FILTER_BY_DIET,
        payload
    }
}

// //filtro por tipo origen

export function filterBySource(payload){
    return{
        type: FILTER_BY_SOURCE,
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