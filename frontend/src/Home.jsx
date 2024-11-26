import React from 'react';
import UserNavBar from './layouts/UserNavBar';
import ProductListing from './components/ProductListing';
import Slider from 'react-slick'; // Import the Slick Slider component

// Corrected image paths (ensure these are correct based on your actual file structure)
import banner1 from './assets/img/home page cover.png';
import banner2 from './assets/img/auroracarousel.jpg';
import banner3 from './assets/img/bratcarousel.jpg';
import banner4 from './assets/img/cascarousel.jpg';
import banner5 from './assets/img/keshicarousel.jpg';
import banner6 from './assets/img/nikicarousel.jpg';
import banner7 from './assets/img/snccarousel.jpg';
import banner8 from './assets/img/svtcarousel.png';
import banner9 from './assets/img/tscarousel.jpg';
import banner10 from './assets/img/w2ecarousel.jpg';

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {


  const settings = {
    dots: true,         
    infinite: true,     
    speed: 300,         
    slidesToShow: 1,    
    slidesToScroll: 1,  
    autoplay: true,     
    autoplaySpeed: 2000 
  };

  return (
    <>
      <UserNavBar />

      {/* Carousel for Banners */}
      <div style={{ margin: '20px 0' }}>
        <Slider {...settings}>
          <div>
            <img src={banner1} alt="Banner 1" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={banner2} alt="Banner 2" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={banner3} alt="Banner 3" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={banner4} alt="Banner 4" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={banner5} alt="Banner 5" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={banner6} alt="Banner 6" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={banner7} alt="Banner 7" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={banner8} alt="Banner 8" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={banner9} alt="Banner 9" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
          </div>
          <div>
            <img src={banner10} alt="Banner 10" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
          </div>
        </Slider>
      </div>

      {/* Product Listing Section */}
      <div>
        <ProductListing />
      </div>
    </>
  );
}
