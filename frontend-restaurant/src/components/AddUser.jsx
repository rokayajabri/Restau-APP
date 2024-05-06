import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/axios';

const AddUser = () => {
    const navigate = useNavigate();

    // Utilisez un objet pour stocker les valeurs de l'état
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        password: '',
        password_confirmation: '',
        role:'',
    });

    const [errors, setErrors] = useState({});

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.get('/sanctum/csrf-cookie');
            const response = await api.post('/api/register', formData);
            console.log(response.status);
            if (response.status === 200) {
                navigate("/allUser");
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Gérer les erreurs de connexion ici
            setErrors({ server: 'Login failed. Please try again.' });
        }
    };

    const handleChange = (e) => {
        // Mettre à jour les valeurs de l'état en fonction de l'ID de l'input
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
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
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddUser;
