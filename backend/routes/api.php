<?php

use App\Http\Controllers\PhysiotherapistController;
use App\Http\Controllers\SensorsController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\PhysiotherapistMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');

});


Route::middleware(['auth:api']) 
    -> group(function(){
        Route::get('PTs', [UserController::class, 'getAllPhysiotherapists']);
        Route::post('add_chair', [UserController::class, 'addChair']);
        Route::post('store_data',[SensorsController::class,'store']);
        Route::get('get_data',[SensorsController::class,'getPostureData']);
        Route::get('get_chair',[UserController::class,'getChair']);


});


Route::prefix('pt')->middleware(['api', 'auth:api', PhysiotherapistMiddleware::class])
    ->group(function () {
        Route::post('update_profile', [PhysiotherapistController::class, 'updateProfile']);
        Route::post('update_image', [PhysiotherapistController::class, 'updateImage']);
        Route::get('profile', [PhysiotherapistController::class, 'getProfile']);
        Route::get('patients', [PhysiotherapistController::class, 'getPatients']);

    });