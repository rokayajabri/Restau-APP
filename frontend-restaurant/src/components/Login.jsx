import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/axios';

const Login = () => {
    const navigate = useNavigate();

    // Utilisez un objet pour stocker les valeurs de l'état
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.get('/sanctum/csrf-cookie');
            const response = await api.post('/api/login', formData);
            console.log(response.status);
            if (response.status === 200) {
                navigate("/dashboard");
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
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                {errors.server && <div className="error">{errors.server}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
