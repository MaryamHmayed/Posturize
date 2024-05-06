<?php

use App\Http\Controllers\PhysiotherapistController;
use App\Http\Middleware\PhysiotherapistMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
});


Route::prefix('pt')->middleware(['api', 'auth:api', PhysiotherapistMiddleware::class])
    ->group(function () {
        Route::post('update_profile', [PhysiotherapistController::class, 'updateProfile']);
    });