import React,{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import Clientlogin from './Clientlogin';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
const Clientsignup = () => {
    const [name, setName] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:5000/api/clients/', {
          name,
          aadhar_no: aadharNo,
          password,
        });
  
        // Handle the response as needed
        console.log(response.data);
        //return <h3>You have successfully created your client account</h3>
        Navigate("/clientlogin");
      } catch (error) {
        // Handle errors
        console.log(error);
        return <h3>Invalid credentials or user already exists, please try again</h3>
      }
    };
  
    return (
      <div>
       <div>
         <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
              <div>
               <MDBInput wrapperClass='mb-4' placeholder='Name' id='form1' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
              </div>
              <div>
              <MDBInput wrapperClass='mb-4' placeholder='Aadhar Number' id='form1' type='Number' value={aadharNo} onChange={(e) => setAadharNo(e.target.value)}/>              
              </div>
              <div>
              <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type='password'  value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button class="btn btn-dark"  wrapperClass='mb-4' type="submit">Login</button>
           </form>
        </MDBContainer>
      </div>
    </div>
    );
  };

  export default Clientsignup;

  