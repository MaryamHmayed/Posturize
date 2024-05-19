<?php

namespace Tests\Feature;
use App\Models\User;
use App\Models\Chair;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AddChairTest extends TestCase
{

    use DatabaseTransactions;

    public function test_add_chair_success()
    {
       
        $user = User::factory()->create([
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);
        $token = auth('api')->login($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/add_chair', [
            'chair_name' => 'ErgoChair',
        ]);

        $response->assertStatus(201);
        $response->assertJson([
            'message' => 'New chair created successfully',
            'chair' => [
                'chair_name' => 'ErgoChair',
                'user_id' => $user->id,
            ],
        ]);
    }

    public function test_add_chair_already_assigned_same_name()
    {

        $user = User::factory()->create([
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $chair = Chair::factory()->create([
            'chair_name' => 'ErgoChair',
            'user_id' => $user->id,
        ]);

        $token = auth('api')->login($user);

       
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/add_chair', [
            'chair_name' => 'ErgoChair',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'You already have this chair assigned.',
            'chair' => [
                'chair_name' => 'ErgoChair',
                'user_id' => $user->id,
            ],
        ]);
    }


}
