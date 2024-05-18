<?php

namespace Tests\Feature;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;



class Get_Profile_Test extends TestCase
{
   
    use WithoutMiddleware;
    use DatabaseTransactions;

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


        Auth::shouldReceive('id')->andReturn($user->id);

        $response = $this->getJson('/api/pt/profile');

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
          
            ],
        ]);

        $user->delete();
    }
   
}