import React, { useState } from 'react';
import { api } from '../config/axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nom: '',
        description:'',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/add_categories', formData); // Envoie des données du formulaire au serveur
            console.log('Category added successfully');
            navigate("/allCategory");
            // Effacer les champs du formulaire après l'ajout de la catégorie
            setFormData({
                nom: '',
            });
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom:</label>
                    <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="nom">Nom:</label>
                    <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <button type="submit">Add Category</button>
            </form>
        </div>
    );
};

export default AddCategory;
