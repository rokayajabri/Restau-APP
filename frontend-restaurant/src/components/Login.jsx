import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const login = async (email, password) => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email,
              password,
            })
          });
    
          if (response.ok) {
            const userData = await response.json();
            // Enregistrez l'utilisateur dans le localStorage ou utilisez une autre méthode pour le stocker localement si nécessaire
            localStorage.setItem('user', JSON.stringify(userData));
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
            navigate("/dashboard");
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
