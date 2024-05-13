import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
function AllIngredient() {
    const [ingredients, setIngredients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log(userData); // Doit être "object"

        const headers = {
            Authorization: `Bearer ${userData.access_token}`,
            'Content-Type': 'application/json',
        };

        // Set loading state
        setLoading(true);
        axios.get('http://127.0.0.1:8000/api/ingredients',{headers})
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error('Error fetching ingredients:', error);
            });
    }, []);

    const deleteIngredient = async (id) => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Doit être "object"

            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };

            // Set loading state
            setLoading(true);
            await axios.delete(`http://127.0.0.1:8000/api/delete_ingredients/${id}`,{headers});

            // Mettre à jour l'état produits en supprimant le produit avec l'ID spécifié
            setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
    
            // Reset loading state
            setLoading(false);
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
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Doit être "object"

            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
    
            // Set loading state
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/recherche_ingredient?q=${searchTerm}`,{headers});
            
            // Mettre à jour l'état produits avec les résultats de la recherche
            setIngredients(response.data);
    
            // Réinitialiser l'état de chargement
            setLoading(false);
        } catch (error) {
            console.error('Error searching for users:', error);
        }
    };
    return (
        <div>
        <h1>Liste des ingrédients</h1>
        <Link to="/addIngredient">Add Ingredient</Link> 
        <form onSubmit={handleSubmit}>
            <input type="text" value={searchTerm} onChange={handleChange}  placeholder="Search by name or id"/>
            <button type="submit">Search</button>
        </form><br />
        <table className="table">
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
