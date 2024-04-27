<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;
    protected $fillable =["chair_id","start_time","end_time"];
    public function chair()
    {
        return $this->belongsTo(Chair::class);
    }
}
