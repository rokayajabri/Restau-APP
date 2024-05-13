import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditIngredient() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nom, setNom] = useState('');
    const [quantiteStock, setQuantiteStock] = useState('');
    const [uniteMesure, setUniteMesure] = useState('');
    const [seuilReapprovisionnement, setSeuilReapprovisionnement] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        console.log(userData); // Doit être "object"

        const headers = {
            Authorization: `Bearer ${userData.access_token}`,
            'Content-Type': 'application/json',
        };

        // Set loading state
        setLoading(true);
        // Récupérer les détails de l'ingrédient à mettre à jour
        axios.get(`http://127.0.0.1:8000/api/ingredients/${id}`,{headers})
            .then(response => {
                const ingredient = response.data;
                setNom(ingredient.nom);
                setQuantiteStock(ingredient.quantite_Stock);
                setUniteMesure(ingredient.uniteMesure);
                setSeuilReapprovisionnement(ingredient.seuil_Reapprovisionnement);
            })
            .catch(error => {
                console.error('Error fetching ingredient details:', error);
            });
    }, [id]);

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
            // Envoyer une requête PUT pour mettre à jour l'ingrédient
            const response = await axios.put(`http://127.0.0.1:8000/api/edit_ingredients/${id}`, {
                nom,
                quantite_Stock: quantiteStock,
                uniteMesure,
                seuil_Reapprovisionnement: seuilReapprovisionnement
            },{headers});
            console.log('Ingredient updated:', response.data);
            navigate("/allIngredient");
        } catch (error) {
            console.error('Error updating ingredient:', error);
        }
    };

    return (
        <div>
            <h2>Modifier l'ingrédient</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Nom: </label>
                    <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>
                <div>
                    <label>  Quantité en stock: </label>
                    <input type="number" value={quantiteStock} onChange={(e) => setQuantiteStock(e.target.value)} />
                </div>
                <div>
                    <label> Unité de mesure: </label>
                    <input type="text" value={uniteMesure} onChange={(e) => setUniteMesure(e.target.value)} />
                </div>
                <div>
                    <label>Seuil de réapprovisionnement: </label>
                    <input type="number" value={seuilReapprovisionnement} onChange={(e) => setSeuilReapprovisionnement(e.target.value)} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditIngredient;
