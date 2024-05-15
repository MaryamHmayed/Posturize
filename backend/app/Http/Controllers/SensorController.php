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
    $user = User::find(Auth::id());


    $validatedData = $request->validate([
        'date' => 'required|date',
        'totalTimeTracked' => 'required|numeric',
        'postureDurations' => 'required|array',
        'posturePercentages' => 'required|array',
    ]);
}












}
