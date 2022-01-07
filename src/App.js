import React, {useEffect, useState} from "react";
import Recipe from "./Recipe";
import './App.css';
import 'tachyons';


const App = () =>{

// const APP_ID = "eac0311b";
// const APP_KEY = "e5ea3acc2f316974020d8f02e53af588";
 
const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState("");
const [query, setQuery]=useState('chicken'); 

 useEffect(()=>{
    getRecipes();
  },[query]);

  const getRecipes = async () =>{
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=eac0311b&app_key=e5ea3acc2f316974020d8f02e53af588`
      );
    const data = await response.json();
    setRecipes (data.hits);
    console.log(data.hits);
  };

  const updateSearch = e =>{
    setSearch(e.target.value);
    
  };

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search); 
    setSearch('');
  }

  return(
    <div className="App">
    <form onSubmit={getSearch} className="search-form">
    <input className="search-bar" placeholder="Enter any food!" type="text" value={search} onChange={updateSearch} />
    <button className="search-button" type="submit">Search</button>
    </form>

    <div className="tip" >
    <center><p>You might need to wait about 4seconds after clicking</p>
    <h1>THE ULTIMATE RECIPE APP!!!</h1></center>
    </div>

    <div className="recipes">
    {recipes.map(recipe =>(
      <Recipe 
      key={recipe.recipe.label}
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />
    ))}
    </div> 
    </div>

  );
};

export default App;
