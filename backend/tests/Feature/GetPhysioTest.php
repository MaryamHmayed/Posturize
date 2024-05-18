<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Models\User;

use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;


class GetPhysioTest extends TestCase
{
     use DatabaseTransactions;

    public function test_get_all_physiotherapists()
    {
       
        $physio1 = User::factory()->create([
            'role_id' => 1,
            'username' => 'physio1',
            'email' => 'physio1_test@example.com'
        ]);

        $physio2 = User::factory()->create([
            'role_id' => 1,
            'username' => 'physio2',
            'email' => 'physio2_test@example.com'
        ]);

        $response = $this->actingAs($physio1, 'api')->getJson('/api/PTs');

        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => [['id', 'username', 'email', 'role_id']]]);


        $data = collect($response->json('data'))->whereIn('email', ['physio1_test@example.com', 'physio2_test@example.com']);

        $this->assertCount(2, $data);
        $this->assertEquals('physio1', $data->firstWhere('email', 'physio1_test@example.com')['username']);
        $this->assertEquals('physio2', $data->firstWhere('email', 'physio2_test@example.com')['username']);
    }
    
}
