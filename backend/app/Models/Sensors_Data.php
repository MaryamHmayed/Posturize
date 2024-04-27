<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sensors_Data extends Model
{
    use HasFactory;
   
    protected $fillable = ['posture_data_id', 'pressure_value'];

    public function postureData()
    {
        return $this->belongsTo(Posture_Data::class);
    }
}
