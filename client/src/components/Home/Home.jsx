import {React, useState} from "react";
import {useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes } from "../../actions";
import {Link} from "react-router-dom";
import Card from '../Card/Card.jsx';
import Loading from "../Loading/Loading";
import Paged from "../Paged/Page";
import NavBar from '../NavBar/NavBar'

export default function Home(){
    const dispatch = useDispatch();
    const [ currentPage, SetCurrentPage ] = useState(0);
    const [ search, setSearch ] = useState('')
    const allRecipes = useSelector((state)=>state.recipesCopy);
    const [order, setOrder] = useState('')
    const recipesPP = 9;

    const filtereds = allRecipes.filter( recipe =>  recipe.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    useEffect(()=>{
        dispatch(getRecipes()) 
    },[dispatch])
  
    const filteredRecipes = () =>{
        if(search.length === 0)
            return allRecipes.slice(currentPage, currentPage + recipesPP);
        const filtered = filtereds;
        return filtered.slice(currentPage, currentPage + recipesPP);
    }

    const currentPageNum = (pagenum)=>{
        SetCurrentPage(pagenum)
    }

    const prevPage = ()=>{
        if (currentPage >= recipesPP)
            SetCurrentPage( currentPage - recipesPP);
    }

    const nextPage = ()=>{
        if(filtereds.length > currentPage + recipesPP)
            SetCurrentPage( currentPage + recipesPP);
    }

    const onSearchChange = (e) =>{
        SetCurrentPage(0)
        setSearch( e.target.value )
    }

  
    return(
        <div>
            <NavBar setOrder={setOrder}/>
            {allRecipes.length > 0?
             <div>
                <div>
                    <input 
                        type="text" 
                        name="search" 
                        placeholder="Search recipe by name" 
                        value={search}
                        onChange={ (e) => onSearchChange(e) } 
                    />
                </div>
                <div>
                    <button 
                        onClick={prevPage}
                        className="btn btn-primary"
                    >
                        Previus
                    </button>
                    <Paged recipesPP={recipesPP} filteredRecipes={filtereds.length} currentPageNum={currentPageNum}/>
                    <button 
                        onClick={nextPage}
                        className="btn btn-primary"
                    >
                        Next
                    </button>
                </div>
                {
                    filteredRecipes().map(recipe =>{
                        return(
                            <div key={recipe.id}>
                                <Link to = {`/home/${recipe.id}`} >
                                    <Card name={recipe.name} 
                                        image={recipe.image ? 
                                                recipe.image :
                                                'https://images-na.ssl-images-amazon.com/images/I/71hH8CKVb4S.jpg'} 
                                        diets = {recipe.diets}
                                        
                                        />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>:
            <Loading/>}
        </div>
    )
}