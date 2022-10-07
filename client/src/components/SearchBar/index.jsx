import React from 'react'
import {dietsTypes} from './dietsTypes'
import { getRecipes, filterByDietType, filterBySource, orderByName } from '../../actions'
import {useEffect } from "react";
import {useDispatch} from 'react-redux';

function SearchBar({setOrder}) {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getRecipes())
    },[dispatch]);   

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes())
    };


    const handleFilteredByDietType = (e) =>{
        dispatch(filterByDietType(e.target.value))
    }

    const handleFilteredBySource = (e) =>{
        dispatch(filterBySource(e.target.value))
    }

    const handleOrderByName = (e) =>{
        dispatch(orderByName(e.target.value))
        setOrder(`${e.target.value}`)
    }


    return(
        <div>
            <button onClick={e => {handleClick(e)}}>Resetear</button>
            <div>
                <select name="byName" onChange={e => {handleOrderByName(e)}}>
                    <option value="Asc">Ascending</option>
                    <option value="Desc">Descending</option>
                </select>
                <select name="byScore" >
                    <option value="Low">Lower</option>
                    <option value="Hig">Higher</option>
                </select>
                <select name="dietFilter" onChange={e => {handleFilteredByDietType(e)}}>
                    <option value="All">All</option>
                    {dietsTypes.map(e=>{
                        return <option value={`${e}`} key={`${e}`}>{e}</option>
                    })}
                </select>
                <select name="Source" onChange={e => {handleFilteredBySource(e)}}>
                    <option value="All">All</option>
                    <option value="Api">Api</option>
                    <option value="Db">Data Base</option>
                </select>
            </div>
        </div>
    )
};

export default SearchBar;