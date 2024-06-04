import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import '../Components/Styles/Card.css';

const Card = ({ data }) => {
  const {_id, houseName, houseImage, minPrice, maxPrice, priceType, location, houseType, postingDate, description } = data;
  return (
    <div>
      <section className='card'>
        <Link to={`/house/${_id}`} className='flex gap-4 flex-col sm:flex-row items-start'>
          <div className='image-container'>
            <img className='card-image rounded' src={houseImage} alt="houseimage" />
          </div>
          <div>
            <h4 className='text-primary mb-1'>{houseType}</h4>
            <h3 className='text-lg font-semibold mb-2'>{houseName}</h3>
            <div className='text-primary/70 text-base flex flex-wrap gap-2 mb-2'>
              <span className='flex items-center gap-2'><FiMapPin />{location}</span>
              <span className='flex items-center gap-2'><FiClock />{priceType}</span>
              <span className='flex items-center gap-2'><FiDollarSign />{minPrice}-{maxPrice}</span>
              <span className='flex items-center gap-2'><FiCalendar />{postingDate}</span>
            </div>
            <p className='text-base text-primary/70'>{description}</p>
          </div>
        </Link>
      </section>
    </div>
  );
}

export default Card;
