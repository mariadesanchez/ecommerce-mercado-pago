// eslint-disable-next-line no-unused-vars
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar el CSS de Bootstrap
import Carousel from 'react-bootstrap/Carousel';
const MyCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img 
          className="d-block w-100"
          src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
          alt="First slide"
        />
        <Carousel.Caption>
          {/* <h3>Descripción 1</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
          alt="Second slide"
        />
        <Carousel.Caption>
          {/* <h3>Descripción 2</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
          alt="Third slide"
        />
        <Carousel.Caption>
          {/* <h3>Descripción 3</h3> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;
