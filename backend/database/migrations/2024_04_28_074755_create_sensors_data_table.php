<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sensors_data', function (Blueprint $table) {
            $table->id();
            $table->float('pressure_value');
            $table->unsignedBigInteger("posture_data_id");
            $table->timestamps();
            $table->foreign('posture_data_id')->references('id')->on('posture_data');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sensors_data');
    }
};
