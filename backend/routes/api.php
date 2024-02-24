<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/login",[AuthController::class,'login']);
Route::post("/sign_up",[AuthController::class,'sign_up']);
Route::post("/sign_up_v2",[AuthController::class,'sign_up_v2']);
Route::post("/checkEmailIfExist",[AuthController::class,'checkEmailIfExist']);
Route::post("/updatePassword",[AuthController::class,'updatePassword']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post("/logout",[AuthController::class,'logout']);
});