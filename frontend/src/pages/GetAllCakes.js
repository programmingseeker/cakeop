import React,{useState,useEffect} from 'react'
import {Container,Nav,Tab,Dropdown}from 'react-bootstrap'
import RangeSlider from '../components/RangeSlider'
import { useDispatch , useSelector} from 'react-redux'

import ProductCardUI from '../components/ProductCardUI'
import { listProducts } from './../actions/productActions'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function GetAllCakes() {
    const dispatch = useDispatch()
    const [sideNav,setsideNav]=useState(false);
    const sideNavtoggle=()=>{
    const a = sideNav?false:true;
        setsideNav(a);
    }
  
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
        <div classname="mt-5 pt-5">
       <Container id='wrapper' className={`${sideNav? 'toggled ':''}`} >
        <aside id="sidebar-wrapper">
          <Nav className="sidebar-nav justify-content-center" as="ul">
            <div className="d-flex align-items-center ">
              <img src='/img/icons/filter.svg' alt='filter icon'/>              
              <h3 className="text-white px-2" style={{"font-weight":"600"}}>Filter</h3>
            </div>
            <RangeSlider/>
          </Nav>
        
        <br/>
        
        <Nav className="d-flex align-items-center justify-content-around">
        <h2 className="text-white pl-2" style={{"font-weight":"600"}}>Weight</h2>
        <Dropdown >
           <Dropdown.Toggle  className="button-sidenav " id="dropdown-basic" style={{"width":"10rem!important"}}>
             500g
           </Dropdown.Toggle>
           <Dropdown.Menu>
             <Dropdown.Item href="#/action-1">500g</Dropdown.Item>
             <Dropdown.Item href="#/action-2">1kg</Dropdown.Item>
             <Dropdown.Item href="#/action-2">1.5kg</Dropdown.Item>
             <Dropdown.Item href="#/action-3">2kg</Dropdown.Item>
           </Dropdown.Menu>
         </Dropdown>
        </Nav>
        <br/>
        <Nav className="d-flex flex-column align-items-center justify-content-center ">
        <h2 className="text-white pl-2" style={{"font-weight":"600"}}>Reviews</h2>
          <Nav.Item className="d-flex align-items-center justify-content-center review-item ">
        <span style={{"color":"#ffdf00"}} class="fa fa-star"></span>
        <span style={{"color":"#ffdf00"}} class="fa fa-star"></span>
        <span style={{"color":"#ffdf00"}} class="fa fa-star"></span>
        <span style={{"color":"#ffdf00"}} class="fa fa-star"></span>
        <span class="fa fa-star text-white"></span>
        <h4 className="text-white pl-2 ">&Up</h4>
          </Nav.Item>
          <Nav.Item className="d-flex align-items-center justify-content-center review-item ">
        <span style={{"color":"#ffdf00"}} class="fa fa-star"></span>
        <span style={{"color":"#ffdf00"}} class="fa fa-star"></span>
        <span style={{"color":"#ffdf00"}} class="fa fa-star"></span>
        <span class="fa fa-star text-white"></span>
        <span class="fa fa-star text-white"></span>
        <h4 className="text-white pl-2 ">&Up</h4>
          </Nav.Item>
          <Nav.Item className="d-flex align-items-center justify-content-center review-item ">
        <span style={{"color":"#ffdf00"}} class="fa fa-star"></span>
        <span style={{"color":"#ffdf00"}} class="fa fa-star"></span>
        <span class="fa fa-star text-white"></span>
        <span class="fa fa-star text-white"></span>
        <span class="fa fa-star text-white"></span>
        <h4 className="text-white pl-2 ">&Up</h4>
          </Nav.Item>
          <Nav.Item className="d-flex align-items-center justify-content-center review-item ">
        <span style={{"color":"#ffdf00"}} class="fa fa-star"></span>
        <span class="fa fa-star text-white"></span>
        <span class="fa fa-star text-white"></span>
        <span class="fa fa-star text-white"></span>
        <span class="fa fa-star text-white"></span>
        <h4 className="text-white pl-2 ">&Up</h4>
          </Nav.Item>
          
        </Nav>
        
        </aside>
        <div id="navbar-wrapper" className="d-flex">
          <Nav className="navbar">
            <div onClick={sideNavtoggle} className={`${sideNav? '':'navbar-inverse'}`}>
                <span className="sidenav-icon" ><i className="fa fa-angle-double-right" /></span>
            </div>
            <h2 className="text-color pl-2" style={{"font-weight":"600"}}>Filters</h2>
          </Nav>
        </div>

        <section id="content-wrapper" className="overflow-auto d-flex flex-column" style={{"height":"100vh"}}>
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
             infinite
             swipeable
           >
              {
                data.map((product,i)=>{
                  return(
                  <div className="col-sm-center mx-4 justify-content-center">
                    <ProductCardUI product={product}/>
                  </div>
                  )
                })
              }
          </Carousel>
            <h4 className="mt-4 text-color">Available: <span className="text-primary font-weight-bold" >{data.length}</span></h4>
        </section>
        </Container>
        </div>
    )
}

export default GetAllCakes
