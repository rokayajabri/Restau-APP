import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllProduit = () => {
    const [produits, setProduits] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchProduits = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Doit être "object"

            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
    
            // Set loading state
            setLoading(true);
    
            const response = await axios.get('http://127.0.0.1:8000/api/produits', { headers });
            
            setProduits(response.data);
    
            const categoriesResponse = await axios.get('http://127.0.0.1:8000/api/categories', { headers });
            
            setCategories(categoriesResponse.data);
            // Reset loading state
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            // Handle errors (e.g., display error message)
        }
    };

    useEffect(() => {
        fetchProduits();
    }, []);


    const deleteProduit = async (id) => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Assurez-vous que userData est bien défini
    
            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
    
            // Set loading state
            setLoading(true);
    
            // Effectuer la requête de suppression
            await axios.delete(`http://127.0.0.1:8000/api/delete_produits/${id}`, { headers });
    
            // Mettre à jour l'état produits en supprimant le produit avec l'ID spécifié
            setProduits(produits.filter(produit => produit.id !== id));
    
            // Reset loading state
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            // Gérer l'erreur (afficher un message d'erreur, etc.)
        }
    };
    
    const handleDeleteConfirmation = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduit(id);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Assurez-vous que userData est bien défini
    
            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
    
            // Set loading state
            setLoading(true);
    
            // Effectuer la requête de recherche
            const response = await axios.get(`http://127.0.0.1:8000/api/recherche_produit?q=${searchTerm}`, { headers });
    
            // Mettre à jour l'état produits avec les résultats de la recherche
            setProduits(response.data);
    
            // Réinitialiser l'état de chargement
            setLoading(false);
        } catch (error) {
            console.error('Error searching for product:', error);
            // Gérer l'erreur (afficher un message d'erreur, etc.)
        }
    };
    

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.nom : 'Introuvable';
    };

    return (
        <div>
            <h2>All Product</h2>
            <Link to="/addProduit">Add Product</Link> 
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchTerm} onChange={handleChange}  placeholder="Search by name or id"/>
                <button type="submit">Search</button>
            </form>
            <table border='1px'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Categorie</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {produits.map(produit => (
                        <tr key={produit.id}>
                            <td>{produit.id}</td>
                            <td>{produit.nom}</td>
                            <td>{produit.description}</td>
                            <td>{produit.prix}</td>
                            <td>{getCategoryName(produit.id_Categorie)}</td>
                            <td>
                                <Link to={`/editProduit/${produit.id}`}>Edit</Link>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteConfirmation(produit.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllProduit;
