import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
function AllIngredient() {
    const [ingredients, setIngredients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        fetch('/api/ingredients')
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    }, []);

    const deleteIngredient = async (id) => {
        try {
            const response = await fetch(`/api/delete_ingredients/${id}`);
            if (response.status === 204) { 
                // Mise à jour de l'état sans refaire une requête au serveur
                const updatedIngredients = ingredients.filter(ingredient => ingredient.id !== id);
                setIngredients(updatedIngredients);
                console.log('ingredient deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting ingredient:', error);
        }
    };
    const handleDeleteConfirmation = (id) => {
        if (window.confirm('Are you sure you want to delete this ingredient?')) {
            deleteIngredient(id);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/recherche_ingredient?q=${searchTerm}`);
            setIngredients(response.data); // Mettre à jour les produits avec les résultats de la recherche
        } catch (error) {
            console.error('Error searching for ingredient:', error);
        }
    };

    return (
        <div>
        <h1>Liste des ingrédients</h1>
        <Link to="/addIngredient">Add Ingredient</Link> 
        <form onSubmit={handleSubmit}>
            <input type="text" value={searchTerm} onChange={handleChange}  placeholder="Search by name or id"/>
            <button type="submit">Search</button>
        </form>
        <table border="1px">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Quantité en stock</th>
                    <th>Unité de mesure</th>
                    <th>Seuil de réapprovisionnement</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {ingredients.map(ingredient => (
                    <tr key={ingredient.id}>
                        <td>{ingredient.id}</td>
                        <td>{ingredient.nom}</td>
                        <td>{ingredient.quantite_Stock}</td>
                        <td>{ingredient.uniteMesure}</td>
                        <td>{ingredient.seuil_Reapprovisionnement}</td>
                        <td>
                            <Link to={`/editIngredient/${ingredient.id}`}>Edit</Link>
                        </td>
                        <td>
                            <button onClick={() => handleDeleteConfirmation(ingredient.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}

export default AllIngredient;
