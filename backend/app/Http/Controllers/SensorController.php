<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Chair;
class SensorsController extends Controller
{
    public function store(Request $request){

    $user = User::find(Auth::id());
    $validatedData = $request->validate([
        'date' => 'required|date',
        'totalTimeTracked' => 'required|numeric',
        'postureDurations' => 'required|array',
        'posturePercentages' => 'required|array',
    ]);
    $chair = Chair::where('user_id', $user->id)->first();

    if ($chair) {
        $chair->update([
            'date' => $validatedData['date'],
            'totalTimeTracked' => $validatedData['totalTimeTracked'],
            'postureDurations' => $validatedData['postureDurations'],
            'posturePercentages' => $validatedData['posturePercentages'],
        ]);

        return response()->json($chair, 200);
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
