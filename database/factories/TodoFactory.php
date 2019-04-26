<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Todo;
use Faker\Generator as Faker;

$factory->define(Todo::class, function (Faker $faker) {
    return [
        'user_id' => factory('App\User')->create()->id,
        'content' => $faker->sentence,
        'completed' => $faker->boolean,
    ];
});
