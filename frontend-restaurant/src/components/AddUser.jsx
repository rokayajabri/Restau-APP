import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    const [errors, setErrors] = useState({});

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(userData); // Doit être "object"

            const headers = {
                Authorization: `Bearer ${userData.access_token}`,
                'Content-Type': 'application/json',
            };
    
            // Set loading state
            setLoading(true);
            await axios.post('http://127.0.0.1:8000/api/register', formData,{headers});
            console.log('User ajouté avec succès !');
            navigate("/allUser");
        } catch (error) {
            console.error('Erreur lors de l\'ajout du user :', error);
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
            <h2>Add User</h2>
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
                        <option value="">Select a role</option>
                        <option value="Admin">Admin</option>
                        <option value="Gerant">Gerant</option>
                        <option value="Cuisinier">Cuisinier</option>
                        <option value="Serveur">Serveur</option>
                        <option value="Caissier">Caissier</option>
                    </select>
                    {errors.role && <div className="error">{errors.role}</div>}
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
