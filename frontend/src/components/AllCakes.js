import React,{useState,useEffect} from 'react'
import {Container,Nav , Tab}from 'react-bootstrap'
import { Link ,Route, Switch} from 'react-router-dom';

import Settings from './Settings'
import Reviews from './Reviews'
import Bookings from './Bookings'

function AllCakes({tab}='settings') {
    const [sideNav,setsideNav]=useState(false);
    const sideNavtoggle=()=>{
        const a = sideNav?false:true;
        setsideNav(a);
    }

    const [screen , setscreen]=useState('settings')
    useEffect(() => {
    setscreen(tab)
    }, [screen])

    const handlescreen=(screen = 'settings')=>{
        switch (screen) {
            case 'settings':
           return <Settings/>;
           break;
            case 'reviews':
           return <Reviews/>;
           break;
            case 'bookings':
           return <Bookings/>;
           break;
            default:
            return <div> this is a wrong page</div>;
            break;
        }
    }
    return (
    <Tab.Container defaultActiveKey="settings">
    <Container id='wrapper' className={`${sideNav? 'toggled':''}`} >
        <aside id="sidebar-wrapper">
          <Nav className="sidebar-nav" as="ul">
            <Nav.Item as="li" >
              <Nav.Link as="a" href='/cakes/settings' className={`sidenav-icon ${(tab === 'settings')? 'active':''}`}><i className="fa fa-user-cog" />Settings</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as="a"  href='/cakes/reviews' className={`sidenav-icon ${(tab === 'reviews')? 'active':''}`}><i className="fa fa-star" />Reviews</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as="a"  href='/cakes/bookings' className={`sidenav-icon ${(tab === 'bookings')? 'active':''}`}><i class="fa fa-shopping-bag"></i>Bookings</Nav.Link>
            </Nav.Item>
          </Nav>
        </aside>
        <div id="navbar-wrapper">
          <Nav className="navbar">
              <div onClick={sideNavtoggle} className={`${sideNav? '':'navbar-inverse'}`}>
                <span className="sidenav-icon" ><i className="fa fa-angle-double-right" /></span>
            </div>
          </Nav>
        </div>
        <section id="content-wrapper">
            <div className="col-lg-12">
               <Tab.Content>
                 {handlescreen(screen)}
               </Tab.Content>
            </div>
        </section>
      </Container>
      </Tab.Container>
)
}

export default AllCakes
