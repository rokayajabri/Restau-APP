<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\CompositionProduitController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\TableController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/login', [AuthController::class, 'login']);

// Routes pour les administrateurs
Route::middleware('auth:sanctum', 'admin')->group(function () {

     //Product management
     Route::get('/produits', [ProduitController::class, 'index']);
     Route::delete('/delete_produits/{id}', [ProduitController::class, 'destroy']);
     Route::post('/add_produit', [ProduitController::class, 'store']);
     Route::put('/edit_produits/{id}', [ProduitController::class, 'update']);
     Route::get('/recherche_produit', [ProduitController::class, 'recherche']);

     //User Management
     Route::post('/logout', [AuthController::class, 'logout']);
     Route::post('/register', [AuthController::class, 'register']);
     Route::get('/users', [AdminController::class, 'index']);
     Route::put('/edit_users/{id}', [AdminController::class, 'update']);
     Route::delete('/delete_users/{id}', [AdminController::class, 'destroy']);
     Route::get('/recherche_user', [AdminController::class, 'search']);
     Route::get('/users/serveurs', [AdminController::class, 'serveurs']);

     //Category management
     Route::get('/categories', [CategorieController::class, 'index']);
     Route::post('/add_categories', [CategorieController::class, 'store']);
     Route::put('/edit_categories/{id}', [CategorieController::class, 'update']);
     Route::delete('/delete_categories/{id}', [CategorieController::class, 'destroy']);
     Route::get('/recherche_categorie', [CategorieController::class, 'search']);

    //ingredients management
    Route::get('/ingredients', [IngredientController::class, 'index']);
    Route::post('/add_ingredients', [IngredientController::class, 'store']);
    Route::put('/edit_ingredients/{id}', [IngredientController::class, 'update']);
    Route::delete('/delete_ingredients/{id}', [IngredientController::class, 'destroy']);
    Route::get('/recherche_ingredient', [IngredientController::class, 'search']);

    //compositionsProduit management
    Route::get('/compositions', [CompositionProduitController::class, 'index']);
    Route::post('/add_composition', [CompositionProduitController::class, 'store']);
    Route::get('/show_compositions/{id}', [CompositionProduitController::class, 'show']);
    Route::put('/edit_compositions/{id}', [CompositionProduitController::class, 'update']);
    Route::delete('/delete_compositions/{id}', [CompositionProduitController::class, 'destroy']);
    Route::get('/recherche_composition', [CompositionProduitController::class, 'search']);


    //Commande management
    Route::get('/commandes', [CommandeController::class, 'index']);
    Route::post('/add_commande', [CommandeController::class, 'store']);
    Route::get('/show_commandes/{id}', [CommandeController::class, 'show']);
    Route::put('/edit_commandes/{id}', [CommandeController::class, 'update']);
    Route::delete('/delete_commandes/{id}', [CommandeController::class, 'destroy']);
    //Route::get('/recherche_commande', [CommandeController::class, 'search']);


    // Tables
    Route::get('/tables', [TableController::class, 'index']);
    Route::post('/add_table', [TableController::class, 'store']);
    Route::put('/edit_tables/{id}', [TableController::class, 'update']);
    Route::delete('/delete_tables/{id}', [TableController::class, 'destroy']);
    //Route::get('/recherche_table', [CompositionProduitController::class, 'search']);


});

// Routes pour les gérants
Route::middleware('auth:sanctum', 'gerant')->group(function () {

});

// Routes pour les cuisiniers
Route::middleware('auth:sanctum', 'cuisinier')->group(function () {

});

// Routes pour les serveurs
Route::middleware('auth:sanctum', 'serveur')->group(function () {

});

// Routes pour les caissiers
Route::middleware('auth:sanctum', 'caissier')->group(function () {

});


    
    


    




