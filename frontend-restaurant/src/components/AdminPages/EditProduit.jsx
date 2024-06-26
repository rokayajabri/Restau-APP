import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

const EditProduit = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Récupérer l'ID du produit depuis les paramètres de l'URL
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        prix: '',
        id_Categorie: '',
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem("user"));
                console.log(userData); // Assurez-vous que userData est bien défini
        
                const headers = {
                    Authorization: `Bearer ${userData.access_token}`,
                    'Content-Type': 'application/json',
                };
        
                // Set loading state
                setLoading(true);

                const response = await axios.get(`http://127.0.0.1:8000/api/produits/${id}`,{headers}); 
                const produitData = response.data;
                setFormData({
                    nom: produitData.nom,
                    description: produitData.description,
                    prix: produitData.prix,
                    id_Categorie: produitData.id_Categorie,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching produit details:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem("user"));
                console.log(userData); // Assurez-vous que userData est bien défini
        
                const headers = {
                    Authorization: `Bearer ${userData.access_token}`,
                    'Content-Type': 'application/json',
                };
    
            // Set loading state
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:8000/api/categories',{headers});
                    setCategories(response.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProduit();
        fetchCategories();
    }, [id]); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

            await axios.put(`http://127.0.0.1:8000/api/edit_produits/${id}`, formData,{headers}); // Envoyer une requête PUT pour mettre à jour les détails du produit
            console.log('Produit mis à jour avec succès !');
            navigate("/allProduit");
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit :', error);
        }
    };

    return (
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom:</label>
                    <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="prix">Prix:</label>
                    <input type="number" id="prix" name="prix" value={formData.prix} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="id_Categorie">Catégorie:</label>
                    <select id="id_Categorie" name="id_Categorie" value={formData.id_Categorie} onChange={handleChange}>
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.nom}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Edit Product</button>
            </form>
        </div>
    );
};

export default EditProduit;
