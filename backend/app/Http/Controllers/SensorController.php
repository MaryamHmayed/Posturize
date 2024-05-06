<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SensorsController extends Controller
{
    public function store(Request $request)
    {
    
    $data = $request->validate([
        'session_id' => 'required|integer|exists:sessions,id',
        'sensor_values' => 'required|array',
        'sensor_values.*.sensor_id' => 'required|integer|exists:sensors,id',
        'sensor_values.*.value' => 'required|numeric',
        'sensor_values.*.timestamp' => 'required|date',
    ]);

    }

}
