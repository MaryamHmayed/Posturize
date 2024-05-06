<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'Sara34',
            'email' => 'sara@gmail.com',
            'password' => Hash::make('sara12345'),
            'role_id' => 1
        ]);

        User::create([
            'username' => 'Mariam34',
            'email' => 'mariam@gmail.com',
            'password' => Hash::make('Mariam12345'),
            'role_id' => 2
        ]);
    }
}
