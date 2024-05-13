import axios from 'axios';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function AddIngredient() {
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [quantiteStock, setQuantiteStock] = useState('');
    const [uniteMesure, setUniteMesure] = useState('');
    const [seuilReapprovisionnement, setSeuilReapprovisionnement] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
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
            const response = await axios.post('http://127.0.0.1:8000/api/add_ingredients', {
                nom,
                quantite_Stock: quantiteStock,
                uniteMesure,
                seuil_Reapprovisionnement: seuilReapprovisionnement
            },{headers});
            console.log('Ingredient added:', response.data);
            // Réinitialiser les champs après l'ajout réussi
            setNom('');
            setQuantiteStock('');
            setUniteMesure('');
            setSeuilReapprovisionnement('');

            navigate("/allIngredient");
        } catch (error) {
            console.error('Error adding ingredient:', error);
        }
    };

    return (
        <div>
            <h2>Add new ingredient</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Nom:</label>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>
                    
                <div>
                    <label>Quantité en stock: </label>
                    <input type="number" value={quantiteStock} onChange={(e) => setQuantiteStock(e.target.value)} />
                </div>
                
                <div>
                    <label>Unité de mesure:  </label>
                    <input type="text" value={uniteMesure} onChange={(e) => setUniteMesure(e.target.value)} />
                </div>
                <div>
                    <label>Seuil de réapprovisionnement: </label>
                    <input type="number" value={seuilReapprovisionnement} onChange={(e) => setSeuilReapprovisionnement(e.target.value)} />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    );
}

export default AddIngredient;
