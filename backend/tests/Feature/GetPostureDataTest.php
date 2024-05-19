<?php

namespace Tests\Feature;



use App\Models\User;
use App\Models\Chair;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;


class GetPostureDataTest extends TestCase
{
    use DatabaseTransactions;

    public function test_get_posture_data_success()
    {
        $user = User::factory()->create([
            'username' => 'testuser',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $chair = Chair::factory()->create([
            'user_id' => $user->id,
            'chair_name' => 'ErgoChair',
            'totalTimeTracked' => 5000,
            'postureDurations' => json_encode(['good' => 3000, 'bad' => 2000]),
            'posturePercentages' => json_encode(['good' => 0.6, 'bad' => 0.4]),
        ]);

        $token = auth('api')->login($user);

      
    }

   
}
