<?php

namespace App\Http\Controllers;
use App\Models\Sensors_Data;
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


    foreach ($data['sensor_values'] as $sensor_value) {
        $sensorData = Sensors_Data::create([
            'sensor_id' => $sensor_value['sensor_id'],
            'sensor_value' => $sensor_value['value'],
            'timestamp' => $sensor_value['timestamp'],
           
        ]);

 
       
    }

    return response()->json(['message' => 'Data uploaded successfully']);
}
}
