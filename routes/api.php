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

Route::post('/login', function(Request $request) {
    $user = App\User::where('email', $request->email);

    if($user->count()) {
        if(password_verify($request->password, $user->first()->password)) {
            $user->update([
                'api_token' => Str::random(60)
            ]);
            return $user->first();
        } else {
            return abort(401, "error");
        }
    } else {
        return abort(401, "error");
    }

});

Route::get('/check-login/{api_token}', function($api_token) {

    $user = App\User::where('api_token', $api_token);

    if($user->count() > 0) {
        return $user->first();
    } else {
        return abort(401);
    }

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
