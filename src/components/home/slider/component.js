import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default (props) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const items = [];
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide, totalItems },
    } = rest;
    return (
      <div className="carousel-button-group">
        {currentSlide !== 0 && (
          <img
            className="carousel-button-group-left-image"
            src={"images/left-arrow.svg"}
            onClick={() => previous()}
          />
        )}
        {currentSlide !== totalItems - 3 && (
          <img
            className="carousel-button-group-right-image"
            src={"images/right-arrow.svg"}
            onClick={() => next()}
          />
        )}
      </div>
    );
  };
  if (props.list) {
    for (let i = 0; i < props.list.length; i++) {
      items.push(
        <div key={i}>
          <div class="slider-inner">
            <div class="slider-img">
              <img src={props.list[i].imgPath} />

              <div class="slider-content">
                <h5>{props.list[i].name}</h5>
                <a
                  href={props.list[i].url}
                  target="_blank"
                  class="slider-button"
                >
                  Read More{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return (
    <div class="project-section">
      <div class="container">
        <div class="project-section-inner">
          <h1>Projects from the Hardware Lab </h1>
          <div className="carousel-slider">
            <Carousel
              responsive={responsive}
              arrows={false}
              renderButtonGroupOutside={true}
              customButtonGroup={<ButtonGroup />}
            >
              {items}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};
