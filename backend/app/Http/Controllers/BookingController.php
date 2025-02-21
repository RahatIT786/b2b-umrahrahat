<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BookingService;
use App\Models\Booking;

class BookingController extends Controller
{
    protected $booking;
    public function __construct(BookingService $bookingService){
        $this->booking = $bookingService;
    }
    public function createBooking(Request $request){
        $validated = $request->validate([
            'booking_pnr_number' => 'required|string',
            'booking_airline' => 'required|string',
            'booking_date' => 'required',
            'booking_city' => 'required',
            'booking_psngr_name' => 'required|string',
            'booking_seats' => 'required|numeric',
        ]);

        $booking=$this->booking->create($validated);
        return response()->json(['message' => 'Branch is Successfully','branch'=>$booking],201);
    }
    public function createbook(){

        try {
            Booking::create([
                'booking_Id' => 1, // Or let the DB auto-increment if it's set as primary key
                'booking_pnr_number' => 'PNR789',
                'booking_airline' => 'Test Airlines',
                'booking_date' => '2025-12-20',
                'booking_city' => 'Bangalore',
                'booking_psngr_name' => 'Alice Johnson',
                'booking_seats' => 4,
                'pnr_status' => 1, // Example status
                'delete_status' => 1, // 0 for active, 1 for deleted
            ]);

            return response()->json(['message' => 'Booking created successfully!'], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating booking!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
