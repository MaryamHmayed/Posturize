<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chair extends Model
{
    
    use HasFactory;

    protected $fillable = [
        'chair_name',
        
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


