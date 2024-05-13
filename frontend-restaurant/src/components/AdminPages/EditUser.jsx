import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role:'',
    });

    const [errors, setErrors] = useState({});

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

            await axios.put(`http://127.0.0.1:8000/api/edit_users/${id}`, formData,{headers}); // Envoyer une requête PUT pour mettre à jour les détails du produit
            console.log('user mis à jour avec succès !');
            navigate("/allUser");
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du user :', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    return (
        <div>
           <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="error">{errors.name}</div>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <select id="role" value={formData.role} onChange={handleChange}>
                        <option value="">Select of role</option>
                        <option value="Admin">Admin</option>
                        <option value="Gerant">Gerant</option>
                        <option value="Cuisinier">Cuisinier</option>
                        <option value="Serveur">Serveur</option>
                        <option value="Caissier">Caissier</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                <div>
                    <label htmlFor="password_confirmation">Confirm Password:</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                    />
                    {errors.password_confirmation && <div className="error">{errors.password_confirmation}</div>}
                </div>
                {errors.server && <div className="error">{errors.server}</div>}
                <button type="submit">{id ? 'Update User' : 'Add User'}</button>
            </form>
        </div>
    );
};

export default EditUser;
