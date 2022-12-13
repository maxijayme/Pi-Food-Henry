import React, { useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, getDiets} from "../../actions";
import {Link} from "react-router-dom";
import Card from '../Card/Card.jsx';
import Paged from "../Paged/Paged";
import SearchBar from '../SearchBar/index.jsx'
import NavBar from '../NavBar/NavBar'
// import Loading from "../Loading/Loading";
import './home.css'

export default function Home(){
    const dispatch = useDispatch();
    const allRecipes = useSelector((state)=>state.recipes);
    console.log('home:',allRecipes)
    
    const [ currentPage, setCurrentPage ] = useState(1);
    const [recipesPerPage, ] = useState(9);
    
    const indexOfLastRecipe= currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)
    const totalPages = Math.ceil(allRecipes.length / recipesPerPage);

    const [ , setOrder] = useState('')
    
   
    const paginated = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        if (!allRecipes.length) {
          dispatch(getRecipes());
        }
    },[]);
    
    useEffect(()=>{
        if (!allRecipes.length) {
         dispatch(getDiets()) 
        }
    },[]);
        
    console.log(currentRecipes)
    return(
        <div className="home">
            <SearchBar setCurrentPage={setCurrentPage} setOrder={setOrder} />
            <NavBar/>
            <div className="allhome">      
                <Paged recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginated={paginated} setCurrentPage={setCurrentPage} totalPages={totalPages} currentPage={currentPage}/>
                <div className="allrecipes">
                    {
                        currentRecipes?.map(recipe =>{
                            let diets = recipe.diets.length? recipe.diets[0].name? recipe.diets.map(e=>e.name) : recipe.diets : null
                            return(
                                <div className="eachRecipe" key={recipe.id}>
                                    <Link className="linkRecipes" to = {`/home/${recipe.id}`} >
                                        <Card 
                                            healthScore={recipe.healthScore}
                                            name={recipe.name} 
                                            image={recipe.image ? 
                                                    recipe.image :
                                                    'https://images-na.ssl-images-amazon.com/images/I/71hH8CKVb4S.jpg'}                                             
                                            diets = {diets}                                             
                                            readyInMinutes={recipe.readyInMinutes}
                                            servings={recipe.servings}
                                            weightWatcherSmartPoints={recipe.weightWatcherSmartPoints}
                                            />
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>                
            </div>
        </div>
    )
}