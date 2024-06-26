<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;


class AdminController extends Controller
{
    public function index()
    {
        $users = User::all(['id', 'name', 'email', 'password', 'role']);
        return response()->json($users);
    }
    public function serveurs()
    {
        
        $serveurs = User::where('role', 'serveur')->get();
        return response()->json($serveurs);
    }
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json($user);
    }
    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully'], 200);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }
    public function search(Request $request)
    {
        // Récupérer le terme de recherche du formulaire
        $query = $request->get('q');

        // Rechercher des utilisateurs par nom ou email
        $users = User::where('name', 'like', "%$query%")
                     ->orWhere('email', 'like', "%$query%")
                     ->get();

        // Retourner les résultats de la recherche au format JSON
        return response()->json($users);
    }
}
