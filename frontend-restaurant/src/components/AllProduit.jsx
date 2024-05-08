import React, { useState, useEffect } from 'react';
import { api } from '../config/axios';
import { Link } from 'react-router-dom';

const AllProduit = () => {
    const [produits, setProduits] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    
    const fetchProduits = async () => {
        try {
            const response = await api.get('/api/produits');
            setProduits(response.data);
            const categoriesResponse = await api.get('/api/categories');
            setCategories(categoriesResponse.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        fetchProduits();
    }, []);



    const deleteProduit = async (id) => {
        try {
            const response = await api.delete(`/api/delete_produits/${id}`);
            if (response.status === 204) {  // Assurez-vous que le statut attendu est correct
                // Mise à jour de l'état sans refaire une requête au serveur
                const updatedProduits = produits.filter(produit => produit.id !== id);
                setProduits(updatedProduits);
                console.log('product deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
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
            const response = await api.get(`/api/recherche_produit?q=${searchTerm}`);
            setProduits(response.data); // Mettre à jour les produits avec les résultats de la recherche
        } catch (error) {
            console.error('Error searching for products:', error);
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
