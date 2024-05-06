<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;
    protected $fillable = [
        'dateCmd',
        'statut',
        'total',
        'id_serveur',
        'id_table',
    ];

    public function table(){
        return $this->belongsTo(Table::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function detailCommande(){
        return $this->hasMany(DetailCommande::class);
    }
    public function facture(){
        return $this->hasMany(Facture::class);
    }
}
