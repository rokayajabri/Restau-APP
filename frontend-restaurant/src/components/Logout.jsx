import React from 'react';
import { api } from '../config/axios';

const Logout = (props) => {
  const handleLogout = async () => {
    try {
      await api.post('/api/logout'); // Appel à votre API Laravel pour déconnecter l'utilisateur
      localStorage.removeItem('token'); // Supprimez le jeton d'accès stocké localement si nécessaire
      props.history.push('/login'); // Redirigez l'utilisateur vers la page de connexion après la déconnexion
    } catch (error) {
      console.error('Error logging out:', error);
      // Gérez les erreurs de déconnexion ici
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
