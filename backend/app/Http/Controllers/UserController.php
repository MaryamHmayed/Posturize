<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Chair;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function addChair(Request $req){

        $user = User::find(Auth::id());

        if ($user->chair) {
            return response()->json([
                'message' => 'You already have a chair assigned.'
            ], 409); 
        }

        $validated = $req->validate([
            'chair_name' => 'required|string|max:255' 
        ]);
    
        
        $chair = new Chair();
        $chair->chair_name = $validated['chair_name'];; 
        $chair->user_id = $user->id;
        $chair->save();
    
        return response()->json([
            'message' => 'New chair created successfully',
            'chair' => $chair
        ], 201); 

    }



    public function getChair()
    {
    $user = User::find(Auth::id());

    $chair = $user->chair;

    if ($chair) {
        return response()->json([
            'message' => 'Chair retrieved successfully',
            'chair' => $chair
        ], 200);
    } else {
        return response()->json([
            'message' => 'No chair assigned to this user'
        ], 404); 
        }
    }



    public function getAllPhysiotherapists()
    {

        $physiotherapists = User::where('role_id', 1)->get();

        return response()->json(['data' => $physiotherapists]);


    }

}