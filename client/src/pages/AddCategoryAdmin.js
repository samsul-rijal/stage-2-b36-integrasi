import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

// Import useMutation from react-query here ...
import { useMutation } from 'react-query';


import NavbarAdmin from '../components/NavbarAdmin';

import dataCategory from '../fakeData/category';

// Get API config here ...
import { API } from '../config/api';

export default function AddCategoryAdmin() {
  console.clear();

  let navigate = useNavigate();

  // Create variabel for store data with useState here ...
  const [category, setCategory] = useState("");

  const title = 'Category admin';
  document.title = 'DumbMerch | ' + title;

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  // Create function for handle insert category data with useMutation here ...

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      // Data body
      const body = JSON.stringify({name: category});
  
      // Insert data user to database
      const response = await API.post('/category', body, config);
      console.log(response);
      // Handling response here
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4">Add Category</div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <input
                onChange={handleChange}
                placeholder="category"
                name="category"
                className="input-edit-category mt-4"
              />
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Add
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
