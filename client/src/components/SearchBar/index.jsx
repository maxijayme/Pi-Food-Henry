import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipesByName } from '../../actions'
import { filterByDietType, filterBySource, orderByName, orderByScore } from '../../actions'

import './searchbar.css'

export default function SearchBar({setCurrentPage, setOrder}){
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const diets = useSelector(state => state.diets);
    
    useEffect(() => {
    
    },[input])

    const handleInputChange=(e) => {
        e.preventDefault();
        setInput(e.target.value)
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        if(!input){
            return alert ("Please enter a search term")
        } 
        else{
            dispatch(getRecipesByName(input))
            setInput(e)
            setCurrentPage(1)
        }
    }

    const handleFilteredByDietType = (e) =>{
        dispatch(filterByDietType(e.target.value))
        setCurrentPage(1)
    }

    const handleFilteredBySource = (e) =>{
        dispatch(filterBySource(e.target.value))
        setCurrentPage(1)
    }

    const handleOrderByName = (e) =>{
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`${e.target.value}`)
    }
    
    const handleOrderByScore = (e) =>{
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrder(`${e.target.value}`)
    }


    return(
        <div className='searchbar'>
            <div className='form-container'>
                <form  className='form' onSubmit={(e) => handleSubmit(e)}>
                    <button type='reset' value='input' className='reset-search-btn'  >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                        <input 
                        className="input" 
                        placeholder="Search by name..." 
                        required=""
                        onChange={(e) => handleInputChange(e)}
                        type="text"
                        />
                    <button id='land' type="submit" className='search-btn'>
                        <svg width="20" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                </form>
            </div>
            <div className='filters'>
                <select className="select" name="byName" onChange={e => {handleOrderByName(e)}}>
                     <option value="Desc">A to Z</option>
                     <option value="Asc">Z to A</option>
                </select>
                 <select className="select" name="byScore" onChange={e => {handleOrderByScore(e)}}>
                     <option value="Hig">Higher to Lower</option>
                     <option value="Low">Lower to Higher</option>
                 </select>
                 <select className="select" name="dietFilter" onChange={e => {handleFilteredByDietType(e)}}>
                     <option value="All">All</option>
                     {diets.map(e=>{                  
                        return <option value={`${e}`} key={`${e}`}>{e}</option>
                     })}
                </select>
                <select className="select" name="Source" onChange={e => {handleFilteredBySource(e)}}>
                    <option value="All">All</option>
                    <option value="Api">Api</option>
                    <option value="Db">Data Base</option>
                </select>
            </div>
            <div className='refresh-container'>
                <button className="refreshButton" onClick={() => window.location.reload()}> Clear Filters </button>
            </div>

        </div>
    )
    
}