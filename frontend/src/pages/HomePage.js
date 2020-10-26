import React, {useEffect} from 'react';
import { Container, Row, Col, Card, Pagination, Image, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux'

import { listProducts } from './../actions/productActions'
import ProductCardUI from '../components/ProductCardUI'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function HomePage() {
  const dispatch = useDispatch()
  
  const productList = useSelector(state => state.productList);
  const products= useSelector(state => state.productList.products);
  const data= products.data||[];
  const { loading,error } = productList;
  useEffect(() => {
    dispatch(listProducts());
    
  }, [dispatch])
  
  const responsive ={
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 3,
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 1,
          partialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 2,
          partialVisibilityGutter: 30
        }
  };
  
  return (
    <>

      <div className="banner">
        <Container className="text-white">
          <h1 className="h1 ">Best Customized cakes in 
            <span className="text-primary"> Bangalore</span>
          </h1>
          <p className="h5 my-3 mb-2">
            Have your dream<span className="text-primary"> Custom cakes </span>
             made just for you with
            <br />
            Make your celebration special with cake
          </p>
          <br />
          <Link to='/' className="banner-btn text-decoration-none">
            <span>Order Now</span>
            <span className="hr-bar mx-2"></span>
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </Container>
      </div>

            <div className="bg-light py-3">
        <h2 className=" h1 mx-auto py-3 text-center text-color font-weight-bolder"><span className="text-primary">Our</span> Facilities</h2>
        <Container>
          <Row>
            <Col sm className='fac-con'>
              <div className="img-container">
                <img className="icon-img" src="/img/icons/spanner.svg" alt="spanner" />
              </div>
              <h4 className="my-2 text-color fac-title">Customized</h4>
              <p className="text-wrap text-center fac-para" style={{width: "15rem"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus voluptatem at sint saepe id dolorem aut pariatur quas!</p>
            </Col>
            <Col sm className='fac-con'>
              <div className="img-container">
                <img className="icon-img" src="/img/icons/cake.svg" alt="cake" />
              </div>
              <h4 className="my-2 text-color fac-title">Wedding cakes</h4>
              <p className="text-wrap text-center fac-para" style={{width: "15rem"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus voluptatem at sint saepe id dolorem aut pariatur quas!</p>
            </Col>
            <Col sm className='fac-con'>
              <div className="img-container">
                <img className="icon-img" src="/img/icons/truck.svg" alt=" truck" />
              </div>
              <h4 className="my-2 text-color fac-title">Door step Delivery</h4>
              <p className="text-wrap text-center fac-para" style={{width: "15rem"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus voluptatem at sint saepe id dolorem aut pariatur quas!</p>
            </Col>
          </Row>
        </Container>
      </div>


      <div>
        <h2 className=" h1 mx-auto py-3 text-center text-color font-weight-bolder"><span className="text-primary">Our</span> Products</h2>
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
              {
                data.map((product)=>{
                  return(
                  <div className="col-sm-center mx-4 justify-content-center">
                    <ProductCardUI product={product}/>
                  </div>
                  )
                })
              }
          </Carousel>
          <Row>
            <Col sm >
              <Link className='float-right text-decoration-none' to='/cakes'>See all</Link>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="bg-light">
        <h2 className=" h1 mx-auto pt-4 text-center text-color font-weight-bolder" id="About">About <span className="text-primary">Us</span></h2>
        <h2 className="about-header text-center">
          We bake <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;it right
        </h2>
          <Container fluid>
            <Row>
              <Col sm={7}>
                <Image src="/img/group.png" alt="..." fluid/>
              </Col>
              <Col sm={5} className='pt-5'>
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

      <Container>
        <h2 className="h1 mx-auto py-3" style={{width:"fit-content"}}>Contact <span className="textprimary">Us</span></h2>
          <Row className='mt-4 mb-4 pb-5'>
            <Col sm={5}>
              <Form>

                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" id='name' placeholder="Name" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" id='email' placeholder="example@email.com" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" id='phoneNumber' placeholder="1234567890" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" id='message' placeholder="type your message here" />
                </Form.Group>

                <Button variant='primary' type='submit'>Submit</Button>

              </Form>
            </Col>
            <Col sm={2} className='p-1'>
              <div className="mx-auto position-relative" style={{width:'fit-content',top:'50%'}}>
                <span>-- or --</span>
              </div>
            </Col>
            <Col sm={5} className="d-flex flex-column justify-content-sm-center align-items-sm-center">
              <Container className='d-flex flex-column align-items-center pt-3 linktags'>
                <Link className="align-self-center my-2 text-decoration-none text-reset">
                  <img src="/img/icons/Facebook.svg" alt="facebook"/>&nbsp;&nbsp;Facebook
                </Link>
                <Link className="align-self-center my-2 text-decoration-none text-reset">
                  <img src="/img/icons/Instagram.svg" alt="Instagram"/>&nbsp;&nbsp;Instagram
                </Link>
                <Link className="align-self-center my-2 text-decoration-none text-reset">
                  <img src="/img/icons/Twitter.svg" alt="Twitter"/>&nbsp;&nbsp;Twitter
                </Link>
                <Link className="align-self-center my-2 text-decoration-none text-reset">
                  <img src="/img/icons/LinkedIn.svg" alt="LinkedIn"/>&nbsp;&nbsp;LinkedIn
                </Link>
              </Container>
            </Col>
          </Row>    
      </Container>
    </>
  )
}

export default HomePage
