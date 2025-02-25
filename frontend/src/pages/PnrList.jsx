import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchBox from '../components/ui/SearchBox';
import InputBox from '../components/ui/InputBox';
import axios from 'axios';

const PnrList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [seats, setSeats] = useState(1);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});


  //  ------------------- written by abu -------------------

  const [pnrs,setPnrs] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchPnrs = async () => {
      try {
        await axios.get('sanctum/csrf-cookie');
        const response = await axios.get('/api/getpnrs');
        setPnrs(response.data);
      } catch (err) {
        console.error('Error fetching PNR data:', err);
        // setError('Failed to fetch PNR data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPnrs();
  }, []);

  if(loading)return <div>Loading...</div>;

  // ------------------- written by abu -------------------



  const bookings = [
    { id: 1, pnr: 'PNR123', airline: 'Airline', date: '12/11/2025', city: 'Mumbai', seats: 40 },
    { id: 2, pnr: 'PNR456', airline: 'Airline B', date: '15/11/2025', city: 'Delhi', seats: 30 },
  ];

  const handleBookNow = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Passenger name is required';
    if (!seats || seats < 1) newErrors.seats = 'At least one seat must be selected';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    await axios.get('sanctum/csrf-cookie');
    if (validateForm()) {
      try {
        // Prepare data to send
        const bookingData = {
          booking_pnr_number: selectedBooking.pnr_code,
          booking_airline: selectedBooking.airline,
          booking_date: selectedBooking.pnr_date,
          booking_city: selectedBooking.city,
          booking_psngr_name: name,
          booking_seats: seats,
        };
        console.log("submitted data: ", bookingData);
        // Send POST request to the API
        const response = await axios.post('/api/booking', bookingData);
  
        console.log('Booking confirmed [server response]:', response.data);
  
        // Close modal and reset form
        setShowModal(false);
        setName('');
        setSeats(1);
        setErrors({});
      } catch (error) {
        console.error('Error submitting booking:', error);
        setErrors({ apiError: 'Failed to submit booking. Please try again.' });
      }
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
  };

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
                <table className="table table-head-bg-primary mt-4">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">PNR CODE</th>
                      <th scope="col">AIRLINE</th>
                      <th scope="col">DATE</th>
                      <th scope="col">CITY</th>
                      <th scope="col">AVL-SEAT</th>
                      <th>Booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pnrs.map((booking, index) => (
                      <tr key={booking.id} style={{ borderBottom: '1px solid #ddd' }}>
                        <td>{index + 1}</td>
                        <td>{booking.pnr_code}</td>
                        <td>{booking.airline}</td>
                        <td>{booking.pnr_date}</td>
                        <td>{booking.city}</td>
                        <td>{booking.available_seat}</td>
                        <td>
                          <button className="btn btn-primary" onClick={() => handleBookNow(booking)}>
                            Book now
                          </button>
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

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={style} component="form" onSubmit={handleConfirmBooking}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Booking Details</Typography>
            <IconButton onClick={() => setShowModal(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {selectedBooking && (
            <>
              <div className="row my-3">
                <div className="col-md-6">
                  <InputBox label="PNR No" type="text" value={selectedBooking.pnr_code} readOnly={true} />
                </div>
                <div className="col-md-6">
                  <InputBox label="Airline" type="text" value={selectedBooking.airline} readOnly={true} />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-md-6">
                  <InputBox label="Date" type="text" value={selectedBooking.pnr_date} readOnly={true} />
                </div>
                <div className="col-md-6">
                  <InputBox label="City" type="text" value={selectedBooking.city} readOnly={true} />
                </div>
              </div>

              <div className="row my-3">
                <div className="col-md-6">
                  <InputBox
                    label="Enter Passenger Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </div>
                <div className="col-md-6">
                  <InputBox
                    label="Number of Seats"
                    type="number"
                    value={seats}
                    min={1}
                    max={40}
                    onChange={(e) => setSeats(e.target.value)}
                    error={!!errors.seats}
                    helperText={errors.seats}
                  />
                </div>
              </div>
            </>
          )}

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="outlined" onClick={() => setShowModal(false)} style={{ marginRight: '8px' }}>
              Close
            </Button>
            <Button variant="contained" type="submit">
              Confirm Booking
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default PnrList;
