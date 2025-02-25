<?php

use App\Http\Controllers\PackageController;

use App\Http\Controllers\BookingController;
use App\Http\Controllers\staff_management\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\company_management\BranchController;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/api/packages', [PackageController::class, 'index']);


Route::post('/api/departure-city',[PackageController::class,'store']);
Route::post('/api/company-management/branches',[BranchController::class,'createBranch']);

Route::post('/api/city',[PackageController::class,'store']);

Route::post('/api/createrole',[RoleController::class,'createRole']);
Route::get('/api/optimize' ,[PackageController::class,'clearCache']);
Route::get('/api/migrate' ,[PackageController::class,'migrate']);

Route::post('/api/booking',[BookingController::class,'createBooking']);
Route::get('/api/getbookings',[BookingController::class,'getBooking']);

//PNR MANAGEMENT
Route::get('/api/getpnrs',[PackageController::class,'getPnrs']);


// Route::get('/api/bookings',[BookingController::class,'createbook']);

Route::middleware('api.key')->post('/departure-city',
    function(Request $request){
    return response()->json(['cityname' => $request->cityname]);
});

