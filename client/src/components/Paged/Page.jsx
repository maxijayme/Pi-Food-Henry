import React from "react";

export default function Paged({recipesPP, filteredRecipes, currentPageNum}) {
    
    const pages = [];
        
    for (let i = 1; i <= Math.ceil(filteredRecipes/recipesPP); i++) {
        pages.push(i)
    };    
      
    return(
        
        <div>
            {pages.length <= 1 ? 
            <></> :
            <nav className="pagination">
                
                <ul className="pages">
                    {pages?.map(p =>(
                        <li className="page" key={p}>
                            <button className="pageBtn" onClick={() => currentPageNum(p-1)}>{p}</button>
                        </li>
                    ))}
                </ul>
    
            </nav>
            }  

        </div>
    )
};