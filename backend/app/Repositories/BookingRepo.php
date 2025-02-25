<?php

namespace App\Repositories;
use App\Models\Booking;
use App\Interfaces\BookingInterface;
use Carbon\Carbon;

class BookingRepo implements BookingInterface
{
    public function create(array $data, int $bookingId){
        $data['booking_date']=Carbon::now()->format('Y-m-d');
       
        $data['booking_Id'] = $bookingId;
        return Booking::create($data);
    }

    public function getBooking(){
        return Booking::where('delete_status',1)->get();
    }
}
