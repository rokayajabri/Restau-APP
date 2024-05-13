import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const AllCategorie = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const fetchCategories = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Doit être "object"

            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
    
            // Set loading state
            setLoading(true);
            const response = await axios.get('http://127.0.0.1:8000/api/categories',{headers});
            setCategories(response.data);
             // Reset loading state
             setLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const deleteCategorie = async (id) => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Doit être "object"

            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
    
            // Set loading state
            setLoading(true);
             await axios.delete(`http://127.0.0.1:8000/api/delete_categories/${id}`, {headers});

              // Mettre à jour l'état produits en supprimant le produit avec l'ID spécifié
              setCategories(categories.filter(category => category.id !== id));
    
              // Reset loading state
              setLoading(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleDeleteConfirmation = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteCategorie(id);  // Assurez-vous que le nom de la fonction ici est correct
        }
    };

 // Fonction pour effectuer une recherche
 const searchCategories = async (e) => {
    if (e) {
        e.preventDefault(); // Vérifiez si l'événement e est défini avant d'appeler preventDefault()
    }
    try {
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log(userData); // Assurez-vous que userData est bien défini

        const headers = {
            Authorization: `Bearer ${userData.access_token}`,
            'Content-Type': 'application/json',
        };

        // Set loading state
        setLoading(true);

        const response = await axios.get(`http://127.0.0.1:8000/api/recherche_categorie?q=${searchTerm}`, { headers });

        // Mettre à jour l'état categories avec les résultats de la recherche
        setCategories(response.data);

        // Réinitialiser l'état de chargement
        setLoading(false);
    } catch (error) {
        console.error('Error searching for categories:', error);
    }
    };
    
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        searchCategories();
    };

    return (
        <div>
            <h2>Category List</h2>
            <Link to="/addCategory">Add Category</Link> 
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchTerm} onChange={handleChange} placeholder="Search by name or id" />
                <button type="submit">Search</button>
            </form> <br />
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.nom}</td>
                            <td>{category.description}</td>
                            <td>
                                <Link to={`/editCategory/${category.id}`}>Edit</Link>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteConfirmation(category.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllCategorie;
