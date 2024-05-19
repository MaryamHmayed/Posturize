<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Chair;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chair>
 */
class ChairFactory extends Factory
{   protected $model = Chair::class;

    /**
     * Define the model's default state.
     *
     *
     */
    public function definition(): array
    {
        return [
            'chair_name' => $this->faker->word,
            'totalTimeTracked' => $this->faker->numberBetween(1000, 10000),
            'postureDurations' => [
                'good' => $this->faker->numberBetween(100, 500),
                'bad' => $this->faker->numberBetween(50, 300),
            ],
            'posturePercentages' => [
                'good' => $this->faker->randomFloat(2, 0, 1),
                'bad' => $this->faker->randomFloat(2, 0, 1),
            ],
            'user_id' => User::factory(),
        ];
    }
}
