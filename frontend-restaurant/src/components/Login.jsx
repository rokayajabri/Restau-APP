import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';  // Vérifiez que le chemin est correct

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

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