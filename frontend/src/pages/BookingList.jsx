import React, { useEffect, useState } from 'react';
import SearchBox from '../components/ui/SearchBox';
import axios from 'axios';
import StatusBadge from '../components/ui/StatusBadge';
const BookingList = () => {
    //  ------------------- written by abu -------------------
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try{
                // await axios.get('sanctum/csrf-cookie');
                const response = await axios.get('/api/getbookings');
                console.log("Booking Response data: ",response.data.bookings);
                setBookings(response.data.bookings);
          

            }catch(err){
                console.error('Error fetching Booking data:', err);
            }finally{
                setLoading(false);
            }
        }
        fetchBookings();
    }, []);

    if(loading)return <div>Loading...</div>;
    //  ------------------- written by abu -------------------


    return (
        <div className="container">
            <div className="page-inner">
                <div className="page-header d-flex justify-content-between" style={{ marginBottom: '0px' }}>
                    <div>
                        <ul className="breadcrumbs mb-3" style={{ marginLeft: '0px', paddingLeft: '0px' }}>
                            <li className="nav-home">
                                <a href="#">
                                    <i className="icon-home"></i>
                                </a>
                            </li>
                            <li className="separator">
                                <i className="icon-arrow-right"></i>
                            </li>
                            {/* <li className="nav-item">
                                <a href="#">Company Management</a>
                            </li> */}
                            <li className="separator">
                                <i className="icon-arrow-right"></i>
                            </li>
                            <li className="nav-item">
                                <a href="#">Bookings</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="d-flex justify-content-between mt-3">
                                <div className="card-header" style={{ paddingLeft: '0px' }}>
                                    <div className="card-title">Bookings</div>
                                </div>
                                <div>
                                    <SearchBox />
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table
                                        id="basic-datatables"
                                        className="display table table-striped table-hover"
                                    >
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid #ddd' }}>
                                                <th>S.No</th>
                                                <th>BOOKING_ID</th>
                                                <th>PNR_CODE</th>
                                                <th>PASSENGER_NAME</th>
                                                <th>DATE</th>
                                                <th>AIRLINE</th>
                                                <th>PAX</th>
                                                <th>BOOKING_STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking, index) => (

                                            <tr key={booking.id} style={{ borderBottom: '1px solid #ddd' }}>
                                                <td>{index + 1}</td>
                                                <td>{booking.booking_id}</td>
                                                <td>{booking.booking_pnr_number}</td>
                                                <td>{booking.booking_psngr_name}</td>
                                                <td>{booking.booking_date}</td>
                                                <td>{booking.booking_airline}</td>
                                                <td>{booking.booking_seats}</td>
                                                <td>
                                                    <StatusBadge status={booking.pnr_status} />
                                                </td>
                                            </tr>
                                            ))}
                                            
                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingList
