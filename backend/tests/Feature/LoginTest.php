<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class LoginTest extends TestCase
{
    /**
     * Test successful login.
     *
     * @return void
     * 
     */
    public function test_successful_login()
    {
   
        $user = User::factory()->create([
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'user',
            'authorisation' => [
                'token',
                'type',
            ],
        ]);

        $response->assertJson([
            'status' => 'success',
            'user' => [
                'id' => $user->id,
                'username' => 'testuser',
                'email' => 'test@example.com',
                
            ],
            'authorisation' => [
                'token' => $response['authorisation']['token'], 
                'type' => 'bearer',
            ],
        ]);

        $user->delete();
    }
}