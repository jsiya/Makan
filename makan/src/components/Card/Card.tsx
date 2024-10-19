import React from 'react';
import { Link } from 'react-router-dom';
import './CardStyles.css'


const Card: React.FC = () => {
  return (
    <Link to={`/place/2`} className='card-link'>
    <div className='card'>
        <div className='img-sec'>
        <img className='place-image' src="" alt="" />
        </div>
        <div className='card-info-sec'>
            
        </div>
    </div>
    </Link>
  );
};

export default Card;
