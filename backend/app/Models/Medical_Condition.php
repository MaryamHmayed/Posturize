<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medical_Condition extends Model
{
    use HasFactory;
    protected $fillable = ['condition'];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
