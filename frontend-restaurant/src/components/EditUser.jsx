import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role:'',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Si un ID est présent dans l'URL, récupérez les données de l'utilisateur existant
        if (id) {
            fetchUser(id);
        }
    }, [id]);

    const fetchUser = async (id) => {
        try {
            const response = await fetch(`/api/edit_users/${id}`);
            const userData = response.data;
            // Mettez à jour le formulaire avec les données de l'utilisateur existant
            setFormData(userData);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Si un ID est présent, il s'agit d'une mise à jour. Sinon, c'est un ajout.
            const url = id ? `/api/edit_users/${id}` : '/api/register';
            const method = id ? 'put' : 'post';
            const response = await fetch[method](url, formData);
            if (response.status === 200) {
                navigate("/allUser");
            }
        } catch (error) {
            console.error('Operation failed:', error);
            setErrors({ server: 'Operation failed. Please try again.' });
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
                <button type="submit">{id ? 'Update User' : 'Add User'}</button>
            </form>
        </div>
    );
};

export default EditUser;
