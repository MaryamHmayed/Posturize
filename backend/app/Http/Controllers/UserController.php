<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Chair;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //adding user's chair

    public function addChair(Request $req){

        $req->validate([
            'chair_name' => 'required|string|max:255',
        ]);

        $chair = new Chair();
        $chair->user_id = Auth::id();
        $chair->chair_name = $req->chair_name;
      
        $chair->save();

        return response()->json([
            'success' => true,
            'message' => 'chair added successfully.',
            'data' => $chair
        ]);
    }


    public function updateProfile(Request $req){
        $req->validate([
            'bio' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:255'
        ]);
    
        $user = User::find(Auth::id());
    
        // Ensure a user is authenticated
        if (!$user) {
            return response()->json(['message' => 'No authenticated user found'], 404);
        }
    
        // Update the user with the new data
        $user->update($req->only(['bio', 'location', 'phone_number']));
    
        // Return a success response
        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);

    }
       

}

