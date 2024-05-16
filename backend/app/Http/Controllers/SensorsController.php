<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Chair;
class SensorsController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();  
        
        $validatedData = $request->validate([
            'totalTimeTracked' => 'required|numeric',
            'postureDurations' => 'required|array',
            'posturePercentages' => 'required|array',
        ]);
    
      
        $chair = Chair::where('user_id', $user->id)->first();
    
        if ($chair) {

            $chair->totalTimeTracked = $validatedData['totalTimeTracked'];
            $chair->postureDurations = $validatedData['postureDurations'];
            $chair->posturePercentages = $validatedData['posturePercentages'];
            $chair->save();
    
            return response()->json([
                'message' => 'Posture data updated successfully.',
                'data' => $chair
            ], 200);
        } else {
            return response()->json(['message' => 'Chair record not found'], 404);
        }
    }

public function getPostureData(Request $request)
{
    $user = User::find(Auth::id());

    $chair = Chair::where('user_id', $user->id)->first();

    if ($chair) {
        return response()->json($chair, 200);
    } else {
        return response()->json(['message' => 'Chair record not found'], 404);
    }
}
}
