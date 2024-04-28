<?php

namespace App\Http\Controllers;

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
       

}

