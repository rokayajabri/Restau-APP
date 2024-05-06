import React, { useState, useEffect } from 'react';
import { api } from '../config/axios';
import { useNavigate } from 'react-router-dom';
const AddProduit = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: '',
        description: '',
        prix: '',
        id_Categorie: '',
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/add_produit', formData);
            console.log('Produit ajouté avec succès !');
            navigate("/allProduit");
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit :', error);
        }
    };

    return (
        <div>
            <h2>add Product</h2>
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
                    <label htmlFor="categorie_id">Catégorie:</label>
                    <select id="id_Categorie" name="id_Categorie" value={formData.id_Categorie} onChange={handleChange}>
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.nom}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">add Product</button>
            </form>
        </div>
    );
};

export default AddProduit;
