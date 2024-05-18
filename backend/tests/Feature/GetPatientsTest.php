<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Http\JsonResponse;
use Tests\TestCase;

class GetPatientsTest extends TestCase
{
    use WithoutMiddleware, DatabaseTransactions;

    public function test_get_patients()
    {

        $patient1 = User::factory()->create([
            'role_id' => 2,
            'username' => 'patient1',
            'email' => 'patient1_test@example.com'
        ]);

        $patient2 = User::factory()->create([
            'role_id' => 2,
            'username' => 'patient2',
            'email' => 'patient2_test@example.com'
        ]);

   
        $response = $this->actingAs($patient1, 'api')->getJson('/api/pt/patients');

        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => [['id', 'username', 'email', 'role_id']]]);
        
        $data = collect($response->json('data'))->whereIn('email', ['patient1_test@example.com', 'patient2_test@example.com']);

        $this->assertCount(2, $data);
        $this->assertEquals('patient1', $data->firstWhere('email', 'patient1_test@example.com')['username']);
        $this->assertEquals('patient2', $data->firstWhere('email', 'patient2_test@example.com')['username']);
    }
}