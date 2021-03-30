import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useState } from 'react';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} style={{ backgroundColor: 'rgb(50, 50, 50)', marginTop: '10px' }}>
      <Carousel.Item >
        <img
          style={{ marginLeft: '190px', marginBottom: "53px", marginTop: "20px", borderRadius: "13px", width: "75%" }}
          className="d-block"
          src="https://miro.medium.com/max/2048/0*E7q3Ps-HQ5pgbP5Y.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item >
        <img
          style={{ marginLeft: '190px', marginBottom: "53px", marginTop: "20px", borderRadius: "13px", width: "75%" }}
          className="d-block w-90"
          src="https://3.bp.blogspot.com/-Pchp7U6kcO0/XHF7PUPgwEI/AAAAAAAAK54/U2uAE2gCWfANMjtVotKGMys-SBJP_PzaQCLcBGAs/s1600/tokopedia%2Baffiliate%2Bmarketing.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item >
        <img
          style={{ marginLeft: '190px', marginBottom: "53px", marginTop: "20px", borderRadius: "13px", width: "75%" }}
          className="d-block w-90"
          src="https://ecs7.tokopedia.net/img/blog/seller/2019/04/SellerCenter-2.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;