<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Commande;

use Illuminate\Http\Request;
use App\Models\DetailCommande; 
use Illuminate\Support\Facades\Log;


class CommandeController extends Controller
{
    public function index()
    {
        try {
            // Chargez les commandes avec les informations du serveur, de la table et des détails de la commande
            $commandes = Commande::with(['serveur', 'table', 'detailCommande.produit'])->get();
           

            return response()->json($commandes);
        } catch (\Exception $e) {
            Log::error("Erreur lors de la récupération des commandes: " . $e->getMessage());
            return response()->json(['error' => 'Erreur serveur interne'], 500);
        }
    }
    

    

    public function store(Request $request)
    {
        // Convertir la date et préparer les données de la commande principale
        $data = $request->all();
        $data['dateCmd'] = Carbon::createFromFormat('Y-m-d\TH:i', $request->dateTimeCmd)->format('Y-m-d H:i:s');
    
        // Créer la commande principale
        try {
            $commande = Commande::create($data);
        } catch (\Exception $e) {
            Log::error("Erreur lors de la création de la commande: " . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la création de la commande'], 500);
        }
    
        // Vérifier si les détails de commande existent et les créer
        try {
            if (isset($data['details']) && is_array($data['details'])) {
                foreach ($data['details'] as $detail) {
                    $commande->detailCommande()->create([
                        'id_Produit' => $detail['idProduit'],
                        'quantite' => $detail['quantite'],
                        'prix_un' => $detail['prix_un']
                    ]);
                }
            }
        } catch (\Exception $e) {
            Log::error("Erreur lors de l'ajout des détails de commande: " . $e->getMessage());
            // Optionnel: vous pouvez décider de supprimer la commande principale si les détails échouent
            $commande->delete();
            return response()->json(['error' => 'Erreur lors de l\'ajout des détails de la commande'], 500);
        }
    
        // Retourner la commande avec ses détails
        $fullCommande = Commande::with(['serveur', 'table', 'detailCommande.produit'])->find($commande->id);
        return response()->json($fullCommande, 201);
    }
    
    


    public function show($id)
    {
        $commande = Commande::with(['table', 'serveur', 'detailCommande.produit'])->find($id);
      

        if (!$commande) {
            return response()->json(['message' => 'Commande not found'], 404);
        }
        return response()->json($commande);
    }

    public function update(Request $request, $id)
    {
        Log::info('Received data: ', $request->all()); // Pour déboguer et voir les données reçues
    
        try {
            $commande = Commande::with('detailCommande')->findOrFail($id);
            
            // Mise à jour des informations de la commande
            $commande->update([
                'dateCmd' => Carbon::parse($request->dateCmd)->format('Y-m-d H:i:s'),
                'statut' => $request->statut,
                'id_serveur' => $request->id_serveur,
                'id_table' => $request->id_table,
                'total' => $request->total,
            ]);
    
            // Récupération des IDs actuels des détails pour détecter les suppressions
            $existingIds = $commande->detailCommande->pluck('id')->toArray();
            $newIds = collect($request->details)->pluck('id')->filter()->toArray(); // Filtrer les nulls
    
            // Détails à supprimer
            $toDelete = array_diff($existingIds, $newIds);
            DetailCommande::destroy($toDelete);
    
            // Gérer les détails de la commande
            foreach ($request->details as $detailData) {
                if (isset($detailData['id'])) {
                    $detail = DetailCommande::find($detailData['id']);
                    if ($detail) {
                        $detail->update([
                            'id_Produit' => $detailData['id_Produit'],
                            'quantite' => $detailData['quantite'],
                            'prix_un' => $detailData['prix_un'],
                        ]);
                    }
                } else {
                    $commande->detailCommande()->create([
                        'id_Produit' => $detailData['id_Produit'],
                        'quantite' => $detailData['quantite'],
                        'prix_un' => $detailData['prix_un'],
                    ]);
                }
            }
    
            return response()->json(['message' => 'Commande updated successfully', 'commande' => $commande->load('detailCommande.produit')], 200);
        } catch (\Exception $e) {
            Log::error("Erreur lors de la mise à jour de la commande: " . $e->getMessage());
            return response()->json(['error' => 'Erreur serveur interne'], 500);
        }
    }
    

    public function destroy($id)
{
    $commande = Commande::with('detailCommande')->findOrFail($id);

    // Supprimez d'abord les détails de la commande pour éviter les violations de contrainte
    foreach ($commande->detailCommande as $detail) {
        $detail->delete();
    }

    // Ensuite, supprimez la commande elle-même
    $commande->delete();

    return response()->json(['message' => 'Commande deleted successfully'], 204);
}

}
