<?php

namespace App\Services;
use App\Repositories\BookingRepo;
use function Symfony\Component\Clock\now;

class BookingService
{
    /**
     * Create a new class instance.
     */
    protected $bookingRepo;
    public function __construct(BookingRepo $bookingRepo)
    {
        $this->bookingRepo = $bookingRepo;
    }

    public function create(array $data){
        $bookingId = now()->format('YmdHis');
        return $this->bookingRepo->create($data,$bookingId);
    }

    public function getBooking(){
        return $this->bookingRepo->getBooking();
    }
}
