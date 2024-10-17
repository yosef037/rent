import { useEffect, useState } from "react";
import axios from "axios";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      //   .get(`http://localhost:5000/bookings/user/${userId}`)
      .get(`http://localhost:5000/bookings/available`)
      .then((response) => setBookings(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking.Booking_Id}>
          <p>Vehicle: {booking.Vehicle_Id}</p>
          <p>
            From: {booking.Start_Date} To: {booking.End_Date}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BookingList;

// const BookingList = () => {
//     const [bookings, setBookings] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:5000/bookings')
//             .then(response => {
//                 setBookings(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching bookings:', error);
//             });
//     }, []);

//     return (
//         <div>
//             <h2>All Bookings</h2>
//             <ul>
//                 {bookings.map(booking => (
//                     <li key={booking.Booking_Id}>

//                         {console.log(booking.Vehicle_Id)}
//                         Vehicle {booking.Vehicle_Id} booked by User {booking.User_Id}
//                         from {booking.Start_Date} to {booking.End_Date}
//                         (Status: {booking.Status})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default BookingList;
