import React,{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
const Adminlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:5000/api/admins/login', {
          email,
          password,
        });
  
        //Using response to set token
        localStorage.removeItem('AuthToken');
        console.log(response.data);
        const  storedtoken = response.data.token;
        localStorage.setItem('AuthToken', storedtoken);
  
        Navigate("/admindashboard")

      } catch (error) {
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

  export default Adminlogin;
  //   return (
  //     <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
  //     <h2>Admin Login</h2>
  //     <hr />
  //     <MDBInput wrapperClass='mb-4' placeholder='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
  //     <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type='password'  value={password} onChange={(e) => setPassword(e.target.value)}/>


  //     <MDBBtn className="mb-4 dark bg-dark">Login</MDBBtn>

  //     <div className="text-center">
  //       <p>Not a member? <a href="#!">Register</a></p>
  //     </div>

  //   </MDBContainer>
  //   );
  // };
