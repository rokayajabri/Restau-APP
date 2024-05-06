import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../config/axios';
import { useNavigate } from 'react-router-dom';

const EditCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Récupère l'ID de la catégorie depuis l'URL
    const [formData, setFormData] = useState({
        nom: '',
        description:'',
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await api.get(`/api/categories/${id}`); // Récupère les détails de la catégorie à modifier
                setFormData(response.data); // Met à jour le formulaire avec les détails de la catégorie
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/edit_categories/${id}`, formData); // Envoie des données modifiées au serveur
            console.log('Category updated successfully');
            navigate("/allCategory");
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <div>
            <h2>Edit Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom:</label>
                    <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="nom">Description:</label>
                    <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditCategory;
