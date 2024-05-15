<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\Facture;
use Illuminate\Http\Request;

class FactureController extends Controller
{
    public function getAllFactures()
    {
        $factures = Facture::all();
        return response()->json($factures);
    }

        // Ajouter un facture
    public function ajouterFacture(Request $request)
    {
        $facture = Facture::create($request->all());
        return response()->json($facture, 201);
    }

     // Supprimer un produit
     public function destroy($id)
     {
         $facture = Facture::findOrFail($id);
         $facture->delete();
         return response()->json(null, 204);
     }

     public function search(Request $request)
     {
         // Récupérer le terme de recherche du formulaire
         $query = $request->get('q');

         // Recherche des produits par nom ou ID
         $facture = Facture::where('statut', 'like', "%$query%")
                            ->orWhere('id_Commande', $query)
                            ->get();

         return response()->json($facture);

     }

       // Mettre à jour un produit
    public function update(Request $request, $id)
    {
        $facture = Facture::findOrFail($id);
        $facture->update($request->all());
        return response()->json($facture, 200);
    }
}
