import React, { useState, useEffect } from 'react';
import { api } from '../config/axios';
import { Link } from 'react-router-dom';

const AllCategorie = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCategories = async () => {
        try {
            const response = await api.get('/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const deleteCatecorie = async (id) => {
        try {
            const response = await api.delete(`/api/delete_categories/${id}`);
            if (response.status === 200) {
                // Mettre à jour la liste des produits après la suppression
                fetchCategories(); // Utilisation de la fonction fetchUsers ici
                console.log('category deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };
    const handleDeleteConfirmation = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteCatecorie(id);
        }
    };

     // Fonction pour effectuer une recherche
     const searchCategories = async () => {
        try {
            const response = await api.get(`/api/recherche_categorie?q=${searchTerm}`);
            setCategories(response.data);
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
            </form>
            <table border="1">
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
