import React,{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
const Lawyersignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('');
    const [fees, setFees] = useState('');
    const [constituency, setConstituency] = useState('');
  
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:5000/api/lawyers/', {
          name,
          email,
          password,
          experience,
          fees,
          constituency
        });

  
        // Handle the response as needed
        console.log(response.data);
        Navigate("/lawyerlogin");
      } catch (error) {
        // Handle errors
        console.log(error);
      }
    };
  
    return (
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h3>Login</h3>
            <form onSubmit={handleSubmit}>
      <MDBInput wrapperClass='mb-4' placeholder='Name' id='form1' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
      <MDBInput wrapperClass='mb-4' placeholder='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
      <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type='password'  value={password} onChange={(e) => setPassword(e.target.value)}/>
      <MDBInput wrapperClass='mb-4' placeholder='Experience' type="text" value={experience} onChange={(e) => setExperience(e.target.value)}/>
      <MDBInput wrapperClass='mb-4' placeholder='Fees' type="text" value={fees} onChange={(e) => setFees(e.target.value)}/>
      <MDBInput wrapperClass='mb-4' placeholder='Constituency' type="text" value={constituency} onChange={(e) => setConstituency(e.target.value)}/>
      <button  wrapperClass='mb-4' class="btn btn-dark" type="submit">Sign up</button>
      </form>
    </MDBContainer>
    );
  };

  export default Lawyersignup;