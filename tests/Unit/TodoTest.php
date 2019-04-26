<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;

class TodoTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_belongs_to_user()
    {
        $this->withoutExceptionHandling();
        $todo = factory('App\Todo')->create();

        $this->assertInstanceOf(User::class, $todo->user);
    }
}
