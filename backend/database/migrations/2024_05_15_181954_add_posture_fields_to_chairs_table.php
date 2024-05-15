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
        Schema::table('chairs', function (Blueprint $table) {
            $table->float('totalTimeTracked')->default(0);
            $table->json('postureDurations')->nullable();
            $table->json('posturePercentages')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chairs', function (Blueprint $table) {
            $table->dropColumn('totalTimeTracked');
            $table->dropColumn('postureDurations');
            $table->dropColumn('posturePercentages');
        });
    }
};
