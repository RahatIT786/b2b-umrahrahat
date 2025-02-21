<?php

namespace App\Repositories;
use App\Models\Booking;
use App\Interfaces\BookingInterface;


class BookingRepo implements BookingInterface
{
    public function create(array $data, int $bookingId){
        $data['bookingId'] = $bookingId;
        return Booking::create($data);
    }
}
