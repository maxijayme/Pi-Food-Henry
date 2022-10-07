//declaro las variables con las action types

export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_NAME = 'GET_RECIPE_NAME'
export const GET_RECIPE_ID = 'GET_RECIPE_ID';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE;';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';

const LOCAL_HOST = "http://localhost:3001";


//Obtener todas las recipes
export const getRecipes = () => dispatch =>{
    return fetch(`${LOCAL_HOST}/recipes`)
        .then(response => response.json())
        .then(recipes => dispatch({
            type: GET_RECIPES,
            payload: recipes
        }))
        .catch((error) => {
            console.log(error)
        })
};

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
export function getRecipeByID(id){
    return function(dispatch){
        return fetch(`${LOCAL_HOST}/recipes/${id}`)
        .then(response => response.json())
            .then(recipe => dispatch({
                type: GET_RECIPE_ID,
                payload: recipe
            }))
            .catch((error) => {
                console.log(error)
        })
    }
};

//filtro por tipo de dieta

export function filterByDietType(payload){
    return{
        type: FILTER_BY_TYPE,
        payload
    }
}

//filtro por tipo origen

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