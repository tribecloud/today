<?php

use Illuminate\Http\Request;
use App\Todo;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/todos', function(Request $request) {
    // validation

    // store to database / persists
    $todo = auth()->user()->todos()->create($request->all());

    // return response
    return $todo;
})->middleware('auth:api');

Route::get('/todos', function(){
    return auth()->user()->todos;
})->middleware('auth:api');

Route::delete('/todos/{todo}', function(Todo $todo) {
    $todo->delete();
})->middleware('auth:api');

Route::patch('/todos/{todo}', function(Todo $todo, Request $request) {
    $todo->update($request->all());

    return $todo;
})->middleware('auth:api');
