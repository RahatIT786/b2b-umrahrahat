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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->integer('booking_Id'); // Primary Key
            $table->string('booking_pnr_number');
            $table->string('booking_airline');
            $table->date('booking_date');
            $table->string('booking_city');
            $table->string('booking_psngr_name');
            $table->integer('booking_seats');
            $table->integer('pnr_status')->default(1); // Example default value
            $table->integer('delete_status')->default(1); // Soft delete flag
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
