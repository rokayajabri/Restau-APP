import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const getUserRole = (userData) => {
        // Supposons que le rôle de l'utilisateur est stocké dans une propriété nommée 'role' des données utilisateur
        return userData.role;
    };
    
    const login = async (email, password) => {
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/login", {
            email,
            password,
            });

            if (response.status === 200) {
                const userData = response.data;
                userData.role = getUserRole(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                console.log(userData);
                return userData;
               
            } else {
                throw new Error("Login failed");
            }
    
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setErrors({
                ...errors,
                email: !formData.email ? 'Email is required' : '',
                password: !formData.password ? 'Password is required' : '',
            });
            return;
        }

        try {
            await login(formData.email, formData.password);
            const userData = JSON.parse(localStorage.getItem("user"));
            switch (userData.role) {
                case 'Admin':
                    navigate("/adminDashboard");
                    break;
                case 'Cuisinier':
                    navigate("/cuisinierDashboard");
                    break;
                case 'Serveur':
                    navigate("/serveurDashboard");
                    break;
                case 'Gerant':
                    navigate("/gerantDashboard");
                    break;
                case 'Caissier':
                    navigate("/caissierDashboard");
                    break;
                // Ajoutez des cas pour les autres rôles
                default:
                    navigate("/"); // Redirection par défaut vers la page d'accueil
            }

         
        } catch (error) {
            const errorMsg = error.response ? error.response.data.message : 'Login failed. Please try again.';
            setErrors({ ...errors, server: errorMsg });
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
