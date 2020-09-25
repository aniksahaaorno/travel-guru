import React from 'react';
import { useParams } from 'react-router-dom';
import location from '../FakeData/Location';

const Booking = () => {

    const {locationId} = useParams();

   
    const place = location.find(lc => lc.id === locationId );
      
   console.log(place);

    return (
        <div>
            <h1>{locationId}</h1>
            <h2>e</h2>
        </div>
    );
};

export default Booking;