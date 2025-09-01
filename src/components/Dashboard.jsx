import React, { useState, useEffect } from "react";

export default function Dashboard({ setCurrentUser }) {
  const [recipes, setRecipes] = useState(
    JSON.parse(localStorage.getItem("recipes")) || []
  );
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    calories: "",
    instructions: "",
    favorite: false,
  });

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = () => {
    setRecipes([...recipes, { ...form, id: Date.now() }]);
    setForm({ title: "", ingredients: "", calories: "", instructions: "" });
  };

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter((r) => r.id !== id));
  };

  const toggleFavorite = (id) => {
    setRecipes(
      recipes.map((r) =>
        r.id === id ? { ...r, favorite: !r.favorite } : r
      )
    );
  };

  const totalCalories = recipes.reduce(
    (sum, r) => sum + Number(r.calories || 0),
    0
  );

  return (
    <div className="dashboard">
      <h1>Welcome to Recipe App 🍳</h1>
      <button className="logoutbtn"
        onClick={() => {
          setCurrentUser(null);
        }}
      >
        Logout
      </button>

      <div className="stats">
        <p>Total Recipes: {recipes.length}</p>
        <p>Total Calories: {totalCalories}</p>
      </div>

      <div className="card2">
        <h2>Add Recipe</h2>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Ingredients"
          value={form.ingredients}
          onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        />
        <input
          placeholder="Calories"
          value={form.calories}
          onChange={(e) => setForm({ ...form, calories: e.target.value })}
        />
        <textarea
          placeholder="Instructions"
          value={form.instructions}
          onChange={(e) => setForm({ ...form, instructions: e.target.value })}
        />
        <button onClick={addRecipe}>Add</button>
      </div>

      <h2>All Recipes</h2>
      <div className="recipes">
        {recipes.map((r) => (
          <div key={r.id} className="card">
            <h3>{r.title}</h3>
            <p><b>Ingredients:</b> {r.ingredients}</p>
            <p><b>Calories:</b> {r.calories}</p>
            <p><b>Instructions:</b> {r.instructions}</p>
            <button onClick={() => toggleFavorite(r.id)}>
              {r.favorite ? "★ Unfavorite" : "☆ Favorite"}
            </button>
            <button onClick={() => deleteRecipe(r.id)}>Delete</button>
          </div>
        ))}
      </div>

      <h2>Favorites</h2>
      <div className="recipes">
        {recipes
          .filter((r) => r.favorite)
          .map((r) => (
            <div key={r.id} className="card fav">
              <h3>{r.title} ⭐</h3>
            </div>
          ))}
      </div>
    </div>
  );
}
