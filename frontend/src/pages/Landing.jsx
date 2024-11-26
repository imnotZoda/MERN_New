import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <MDBContainer
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: '#1A2D42' }}
    >
      <MDBCard style={{ borderRadius: '15px', maxWidth: '600px', backgroundColor: 'white' }} className="shadow">
        <MDBCardBody>
          <MDBTypography tag="h1" className="text-center fw-bold mb-4 text-dark">
            Welcome to ThrillTix
          </MDBTypography>
          <p className="text-center mb-4 text-dark">
            Choose an option to get started. Login if you already have an account or register to create a new one!
          </p>
          <MDBRow className="text-center">
            <MDBCol>
              <MDBBtn color="primary" size="lg" onClick={() => navigate('/login')}>
                Login
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn color="success" size="lg" onClick={() => navigate('/register')}>
                Register
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Landing;
