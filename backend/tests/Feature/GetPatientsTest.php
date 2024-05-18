<?php
namespace Tests\Feature;

use App\Http\Controllers\PhysiotherapistController;
use App\Models\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Http\JsonResponse;
use Mockery;
use Tests\TestCase;


class GetPatientsTest extends TestCase
{
    use WithoutMiddleware;

    public function test_get_patients()
    {
        // Arrange: Mock the User model
        $userMock = Mockery::mock('overload:' . User::class);
        $userMock->shouldReceive('where->get')
            ->once()
            ->andReturn(collect([
                (object) ['id' => 1, 'username' => 'patient1', 'email' => 'patient1@example.com', 'role_id' => 2],
                (object) ['id' => 2, 'username' => 'patient2', 'email' => 'patient2@example.com', 'role_id' => 2],
            ]));

        $controller = new PhysiotherapistController();

        // Act: Call the getPatients method
        $response = $controller->getPatients();

        // Assert: Check the response
        $this->assertInstanceOf(JsonResponse::class, $response);
        $responseData = $response->getData(true);
        $this->assertArrayHasKey('data', $responseData);
        $this->assertCount(2, $responseData['data']);
        $this->assertEquals('patient1', $responseData['data'][0]['username']);
        $this->assertEquals('patient2', $responseData['data'][1]['username']);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}

