import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import location from '../FakeData/Location';

const Home = () => {
    const fakeData = location;
    const [data,setData] = useState(fakeData);
    const [loc,setLoc] = useState({});

   const  info = (event) =>{
        setLoc(event)
    }

    return (
              <div className="container"  styles={{ backgroundImage:`url(${loc.Image})` }}>
                  <div className="location row">
        <div className='col-md-6' style={{marginTop:'100px'}}>
              <h1 style={{color:'white'}}>{loc.Name}</h1>
              <p style={{color:'white'}}>{loc.Discription}</p>
            <Link to={`/booking/${loc.id}`}> {loc.Name && <button className="color-btn">Booking</button>}</Link>
        </div>
        <div className='col-md-6' style={{display: 'flex'}}>
            {
                data.map(data => <div onClick={() =>info(data)} style={{marginLeft:'10px',marginTop:'100px'}}> <img style={{height:'300px',width:'200px'}} src={data.Image}></img>
                                        <h1 style={{fontSize:'30px',color:'white'}}>{data.Name}</h1>
                </div> )
            }
        </div>
                   </div>
              </div>
    );
};

export default Home;