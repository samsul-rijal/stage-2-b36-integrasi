import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import convertRupiah from 'rupiah-format';

// Import useQuery and useMutation here ...
import { useQuery, useMutation } from 'react-query';

import Navbar from '../components/Navbar';

import dataProduct from '../fakeData/product';

// Get API config here ...
import { API } from '../config/api';

export default function DetailProduct() {
  let navigate = useNavigate();
  let { id } = useParams();

  // Create process for fetching product by id data from database with useQuery here ...
  // Fetching product data from database
  let { data: product } = useQuery('productCache', async () => {
    const response = await API.get('/product/' + id);
    return response.data.data;
  });
  // Create function for handle buying process with useMutation here ...
  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const data = {
        idProduct: product.id,
        idSeller: product.user.id,
        price: product.price,
      };
  
      const body = JSON.stringify(data);
  
      await API.post('/transaction', body, config);
  
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col md="2"></Col>
          <Col md="3">
            <img src={product?.image} className="img-fluid" />
          </Col>
          <Col md="5">
            <div className="text-header-product-detail">{product?.name}</div>
            <div className="text-content-product-detail">
              Stock : {product?.qty}
            </div>
            <p className="text-content-product-detail mt-4">{product?.desc}</p>
            <div className="text-price-product-detail text-end mt-4">
              {convertRupiah.convert(product?.price)}
            </div>
            <div className="d-grid gap-2 mt-5">
              <button
                onClick={(e) => handleBuy.mutate(e)}
                className="btn btn-buy"
              >
                Buy
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
