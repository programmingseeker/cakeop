import React, { useEffect } from "react";
import { Container, Row, Col, Image, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listProducts } from "./../actions/productActions";
import ProductCardUI from "../components/ProductCardUI";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loader from "./../components/Loader";

function HomePage() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const products = useSelector((state) => state.productList.products);
  const data = products.data || [];
  const { loading, error } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 3,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: 2,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <>
      {loading ? (
        <Container className="mt-5 pt-5">
          <Loader />
        </Container>
      ) : (
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="banner">
            <Container className="col-lg-10">
              <h1 className="h1 text-white bannner-text ">
                Best Customized cakes <br className="br-toggle"/>in
                <span className="text-white"> Bangalore</span>
              </h1>
              <p className="h5 my-3 mb-2 text-white">
                Have your dream
                <span className="text-white"> Custom cakes </span>
                made just for you
                <br />
                Make your celebration special with cake
              </p>
              <br />
              <Link to="/cakes" className="banner-btn text-decoration-none">
                <span>Order Now</span>
                <span className="hr-bar mx-2"></span>
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </Container>
          </div>

          <div className="bg-light py-3">
            <h2 className=" h1 mx-auto py-3 text-center text-color font-weight-bolder">
              <span className="text-primary">Our</span> Facilities
            </h2>
            <Container>
              <Row>
                <Col sm className="fac-con">
                  <div className="img-container">
                    <img
                      className="icon-img"
                      src="/img/icons/spanner.svg"
                      alt="spanner"
                    />
                  </div>
                  <h4 className="my-2 text-color fac-title">Customized</h4>
                  <p
                    className="text-wrap text-center fac-para"
                    style={{ width: "15rem" }}
                  >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Natus voluptatem at sint saepe id dolorem aut pariatur quas!
                  </p>
                </Col>
                <Col sm className="fac-con">
                  <div className="img-container">
                    <img
                      className="icon-img"
                      src="/img/icons/cake.svg"
                      alt="cake"
                    />
                  </div>
                  <h4 className="my-2 text-color fac-title">Wedding cakes</h4>
                  <p
                    className="text-wrap text-center fac-para"
                    style={{ width: "15rem" }}
                  >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Natus voluptatem at sint saepe id dolorem aut pariatur quas!
                  </p>
                </Col>
                <Col sm className="fac-con">
                  <div className="img-container">
                    <img
                      className="icon-img"
                      src="/img/icons/truck.svg"
                      alt=" truck"
                    />
                  </div>
                  <h4 className="my-2 text-color fac-title">
                    Door step Delivery
                  </h4>
                  <p
                    className="text-wrap text-center fac-para"
                    style={{ width: "15rem" }}
                  >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Natus voluptatem at sint saepe id dolorem aut pariatur quas!
                  </p>
                </Col>
              </Row>
            </Container>
          </div>

          <div>
            <h2 className=" h1 mx-auto py-3 text-center text-color font-weight-bolder">
              <span className="text-primary">Our</span> Products
            </h2>
            <Container className="justify-content-center">
              {/* <Row className="justify-content-center"> */}
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={responsive}
                showDots={false}
                slidesToSlide={1}
                swipeable
              >
                {data.map((product) => {
                  return (
                    <div
                      className="col-sm-center mx-4 justify-content-center"
                      key={product.id}
                    >
                      <ProductCardUI product={product} />
                    </div>
                  );
                })}
              </Carousel>
              <Row>
                <Col sm>
                  <Link
                    className="float-right text-decoration-none"
                    to="/cakes"
                  >
                    See all
                  </Link>
                </Col>
              </Row>
            </Container>
          </div>

          <div className="bg-light" id="about">
            <h2 className=" h1 mx-auto pt-4 text-center text-color font-weight-bolder">
              About <span className="text-primary">Us</span>
            </h2>
            <h2 className="about-header text-center">
              We bake <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;it right
            </h2>
            <Container fluid>
              <Row>
                <Col sm={7}>
                  <Image src="/img/group.png" alt="..." fluid />
                </Col>
                <Col sm={5} className="pt-5">
                  <div className="mt-5 pl-3">
                    <h1 className="primary-color">
                      <span className="textprimary">Our</span> Team
                    </h1>
                    <ul>
                      <li className="h3">Mark Smith:CEO</li>
                      <li className="h3">Shannon Johnson</li>
                      <li className="h3">John Corbit</li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
    </>
  );
}

export default HomePage;
