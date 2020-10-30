import React from 'react'
import { Container ,Table,Media, Col,Row,Card} from 'react-bootstrap'
import NumericInput from 'react-numeric-input';

function Cart() {
    return (
        <Container className="d-flex flex-wrap page-def">
            <Table borderless className="col-sm-11 col-md-9">
            <br/>
            <thead className="h4">
                <tr>
                <th className="px-2">Product</th>
                <th className="px-2">Quantity</th>
                <th className="px-2">Price</th>
                <th></th>
                </tr>
            </thead>
            <tr className="align-middle">
                <td className="col-sm-9 col-xs-9 col-md-6" style={{transition: "all 0.5s ease-in" }}>
                   <Media className="d-flex flex-wrap">
                   <a className="float-left mr-2 img-anc" href="#"><img src="/img/2.jpeg" alt="Cake-img" className="img-responsive"></img></a>
                   <Media.Body className="d-flex flex-column ml-2">
                       <h4 className="cart-item-head" >Step Cake</h4>
                       <span className="text-muted" style={{"line-height":"1"}}>Theme: Birthday Cake</span>
                       <span className="text-muted">Weight: 1kg</span> 
                   </Media.Body>
                   </Media>
                </td >
                <td className="align-middle"> 
                <NumericInput min={1} max={10} value={1} size="1" mobile style={{
                      wrap: {
                    border: '0px!important',
                    },
                  input: {
                   border: '0px!important',
                   fontWeight: 550,
                   }
                }}/>    
                </td>
                <td className="align-middle h4 text-dark" style={{transition: "all 0.5s ease-in" ,fontWeight:550}}>
                    {`₹120`}
                </td>
                <td class="col-sm-1 col-md-1 align-middle">
                        <button type="button" class="btn btn-danger d-flex align-items-center ">
                            <span className="d-flex align-items-center">
                        Remove<i className="fa fa-times pl-2 align-middle pt-1"></i>
                            </span>
                        </button>
                </td>
            </tr>
            </Table>
            <Col className="d-flex flex-column">
                <Row>
                    <Card bg='white' className="ml-3 card-cart-coupon">
                        <Card.Body>
                            <Card.Title className="text-color">Have Coupon?</Card.Title>
                            <Card.Text>
                            <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Coupon code" aria-label="Coupon code" aria-describedby="basic-addon2"/>
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">Apply</span>
                            </div>
                            </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
              
                <Row>
                <Card bg='white' className="ml-3 card-cart-coupon">
                    <Card.Body>
                        <Card.Text>
                            <ul style={{fontWeight:550}}>
                                <li  className="d-flex justify-content-between text-color my-2"> Total price: <span >₹4800</span></li>
                                <li className="d-flex justify-content-between text-color my-2">Discount: <span className="text-danger">-₹400</span></li>
                                <li className="d-flex justify-content-between text-color my-2">Discount: <span className="text-dark" style={{fontWeight:610 }}>₹4400</span></li>
                            </ul>
                        </Card.Text>
                        <div className="d-flex justify-content-around">
                             <a className="mr-2 " href="#"><img src="/img/icons/Mastercard-Logo.svg" alt="master-card" className="img-responsive" ></img></a>
                             <a className="mr-2 " href="#"><img src="/img/icons/phonepe.svg" alt="phonepe" className="img-responsive" ></img></a>
                             <a className="mr-2 " href="#"><img src="/img/icons/VISA-Logo.svg" alt="visa" className="img-responsive" ></img></a>
                        </div>
                    </Card.Body>
                    </Card>
                </Row>
            
            </Col>
        </Container>
    )
}

export default Cart
