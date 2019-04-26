<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TodosTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function a_user_can_add_a_todo()
    {
        $this->withoutExceptionHandling();

        // given ....
        $user = factory('App\User')->create();
        $this->actingAs($user, 'api');

        $attributes = [
            'content' => $this->faker->sentence,
            'completed' => false,
        ];

        $response = $this->json('post', '/api/todos', $attributes);

        // expected (assertions)
        $this->assertDatabaseHas('todos', $attributes);

        $response->assertJson($attributes, true);
    }

    /** @test */
    public function a_user_can_retrieve_his_todos()
    {
        $this->withoutExceptionHandling();

        $todo = factory('App\Todo')->create();

        $this->actingAs($todo->user, 'api');

        $response = $this->json('get', '/api/todos');

        $response->assertJson($todo->user->todos->toArray(), true);
    }

    /** @test */
    public function a_user_can_delete_his_todo()
    {
        $todo = factory('App\Todo')->create();
        $this->actingAs($todo->user, 'api');

        $response = $this->json('delete', '/api/todos/' . $todo->id);

        $this->assertDatabaseMissing('todos', ['id' => $todo->id]);
    }

    /** @test */
    public function a_user_can_update_his_todo()
    {
        $todo = factory('App\Todo')->create();
        $this->actingAs($todo->user, 'api');

        $attributes = [
            'content' => 'Changed',
            'completed' => true,
        ];
        $response = $this->json('patch', '/api/todos/' . $todo->id, $attributes);

        $this->assertDatabaseHas('todos', array_merge($attributes, ['id' => $todo->id]));

        $response->assertJson($attributes, true);
    }

    /** @test */
    public function guest_can_not_add_a_todo()
    {
        $attributes = [
            'content' => $this->faker->sentence,
            'completed' => false,
        ];

        $response = $this->json('post', '/api/todos', $attributes);

        $response->assertStatus(401);
    }
}
