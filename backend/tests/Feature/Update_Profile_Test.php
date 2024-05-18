<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Mockery;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class Update_Profile_Test extends TestCase
{
    use WithoutMiddleware;

    /**
     * Test successful profile update.
     *
     * @return void
     */
    public function test_update_profile_success()
    {
   
        Auth::shouldReceive('id')->andReturn(1);

      
        $user = new User([
            'id' => 1,
            'username' => 'Sara',
            'email' => 'sara@gmail.com',
            'role_id' => 1,
            'profile_image' => 'profile_images/1715627257.jpg',
            'bio' => null,
            'location' => null,
            'phone_number' => null,
            'created_at' => '2024-05-06T10:48:22.000000Z',
            'updated_at' => '2024-05-18T19:14:43.000000Z',
        ]);

        $userMock = Mockery::mock($user)->makePartial();
        $userMock->shouldReceive('find')
                 ->with(1)
                 ->andReturn($userMock);

        $userMock->shouldReceive('update')
                 ->with(['bio' => 'Updated bio', 'location' => 'Updated location', 'phone_number' => '1234567890'])
                 ->andReturn(true);


        $this->app->instance(User::class, $userMock);

        $requestData = [
            'bio' => 'Updated bio',
            'location' => 'Updated location',
            'phone_number' => '1234567890',
        ];

   
        $response = $this->postJson('/api/pt/update_profile', $requestData);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
            'user' => [
                'id',
                'username',
                'email',
                'bio',
                'location',
                'phone_number',
                'role_id',
                'profile_image',
                'created_at',
                'updated_at',
            ],
        ]);

        $response->assertJson([
            'message' => 'Profile updated successfully',
            'user' => [
                'id' => 1,
                'username' => 'Sara',
                'email' => 'sara@gmail.com',
                'bio' => 'Updated bio',
                'location' => 'Updated location',
                'phone_number' => '1234567890',
                'role_id' => 1,
                'profile_image' => 'profile_images/1715627257.jpg',
                'created_at' => '2024-05-06T10:48:22.000000Z',
                'updated_at' => '2024-05-18T19:14:43.000000Z',
            ],
        ]);
    }

    protected function tearDown(): void
    {
        Mockery::close();

        parent::tearDown();
    }
}