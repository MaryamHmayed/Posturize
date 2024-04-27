<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posture_Data extends Model
{
    use HasFactory;
    protected $fillable =['posture_status','time_duration','session_id'];

    public function sensors_data()
    {
        return $this->hasMany(Sensors_Data::class);
    }

    public function sessions()
    {
        return $this->belongsTo(Session::class);
    }
}
