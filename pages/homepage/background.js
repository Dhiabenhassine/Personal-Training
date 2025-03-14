// src/components/Slider.jsx
import React from 'react';
import './styles/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Slider = () => {
  const slides = [
    {
      image: '/images/traning2.jpeg',
      name: 'Kickboxing Coach',
     // description: 'Renowned for its breathtaking Alpine scenery and precision in craftsmanship',
    },
    {
      image: '/images/traning4.jpg',
      name: 'CrossFit Coach',
      //description: 'Known for its saunas, lakes, and a deep connection to nature',
    },
    {
      image: '/images/traning3.jpeg',
      name: 'Bootcamp Coach',
      //description: 'Famous for its rich culture, historical landmarks, natural beauty, and diverse cuisine',
    },
    {
      image: '/images/Australia.png',
      name: 'Running Coach',
      //description: 'Distinguished by its diverse ecosystems, ranging from beaches to bushland',
    },
    {
      image: '/images/traning123.jpg',
      name: 'Athletic Performance Coach',
      //description: 'Characterized by its iconic canals, tulip fields, and windmills',
    },
    {
      image: '/images/traning124.jpeg',
      name: 'Personal Trainer',
      //description: 'Known for its lush green landscapes and rich cultural heritage',
    },
  ];

  const handleNext = () => {
    const items = document.querySelectorAll('.item');
    document.querySelector('.slide').appendChild(items[0]);
  };

  const handlePrev = () => {
    const items = document.querySelectorAll('.item');
    document.querySelector('.slide').prepend(items[items.length - 1]);
  };

  return (
    <div className="container">
      <div className="slide">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="item"
            style={{ background: `url(${slide.image})` }}
          >
            <div className="content">
              <div className="name">{slide.name}</div>
              <div className="description">{slide.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="button">
      <button className="prev" onClick={handlePrev}>
  <FontAwesomeIcon icon={faArrowLeft} />
</button>
<button className="next" onClick={handleNext}>
  <FontAwesomeIcon icon={faArrowRight} />
</button>
      </div>
    </div>
  );
};

export default Slider;