<?php

namespace Tests\Feature;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
class Get_Profile_Test extends TestCase
{
    /**
     * Test successful profile retrieval.
     *
     * @return void
     */
    public function test_get_profile_success()
    {
        $user = User::factory()->create([
            'username' => 'testphysio',
            'email' => 'physio@example.com',
            'password' => bcrypt('password123'),
        ]);

        
        $token = JWTAuth::fromUser($user);

        
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
                         ->getJson('/api/pt/profile');

        
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'user' => [
                'id',
                'username',
                'email',
               
            ],
        ]);

    
        $response->assertJson([
            'success' => true,
            'user' => [
                'id' => $user->id,
                'username' => 'testphysio',
                'email' => 'physio@example.com',
            ]
        ]);
    }
       
}
