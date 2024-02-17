import React,{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

const Lawyerlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/api/lawyers/login', {
          email,
          password,
        });
  
        // Handle the response as needed
        
        //localStorage.removeItem('LawyerToken');
        const { token } = response.data;
        console.log("lawyer token occhesi "+token)

        localStorage.setItem('AuthToken', token);

        console.log(response.data);
       
        Navigate("/lawyerdashboard");
        
  
        // Redirect to the client dashboard or perform any other actions

      } catch (error) {
        // Handle errors
        console.log(error);
      }
    };
  
    return (
      <div>
         <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <h3>Login</h3>
            <form onSubmit={handleSubmit}>
              <div>
               <MDBInput wrapperClass='mb-4' placeholder='Email ID' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div>
                <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type='password'  value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button class="btn btn-dark"  wrapperClass='mb-4' type="submit">Login</button>
           </form>
        </MDBContainer>
      </div>
      

    );
  };
    // return (
    //   <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    //   <br/>
    //   <h1>Lawyer Login</h1>
    //   <MDBInput wrapperClass='mb-4' placeholder='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
    //   <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type='password'  value={password} onChange={(e) => setPassword(e.target.value)}/>


    //   <MDBBtn className="mb-4 dark bg-dark">Login</MDBBtn>

    //   <div className="text-center">
    //     <p>Not a member? <a href="#">Register</a></p>
    //   </div>

    // </MDBContainer>
    // );
    // };

export default Lawyerlogin