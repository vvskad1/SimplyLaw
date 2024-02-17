import React,{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
const Clientlogin = () => {
    const [aadharNo, setAadharNo] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:5000/api/clients/login', {
          aadhar_no: aadharNo,
          password,
        });
  
        console.log(response)
        
        localStorage.removeItem('AuthToken');
        const  storedtoken = response.data.token;
        localStorage.setItem('AuthToken', storedtoken);
  
        Navigate("/clientdashboard"); // Redirect to the client dashboard or perform any other actions
        
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
               <MDBInput wrapperClass='mb-4' placeholder='Aadhar Number' id='form1' type='number' value={aadharNo} onChange={(e) => setAadharNo(e.target.value)}/>
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

  export default Clientlogin;


//   import React,{ useState } from 'react';
// import axios from 'axios';

// const Clientlogin = () => {
//     const [aadharNo, setAadharNo] = useState('');
//     const [password, setPassword] = useState('');
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
  
//       try {
//         const response = await axios.post('http://localhost:5000/api/clients/login', {
//           aadhar_no: aadharNo,
//           password,
//         });
  
//         // Handle the response as needed
//         console.log(response)
//         const  storedtoken = response.data.token;

//         console.log(storedtoken)

//         localStorage.setItem('AuthToken', storedtoken);
  
//         // Redirect to the client dashboard or perform any other actions
//       } catch (error) {
//         // Handle errors
//         console.log(error);
//       }
//     };
  
//     return (
//       <div>
//         <h3>Login</h3>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Aadhar No:</label>
//             <input type="text" value={aadharNo} onChange={(e) => setAadharNo(e.target.value)} />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     );
//   };

    //   <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
    //   <h2>Client Login</h2>
    //   <hr />
    //   <MDBInput wrapperClass='mb-4' placeholder='Email address' id='form1' type='email' value={aadharNo} onChange={(e) => setAadharNo(e.target.value)}/>
    //   <MDBInput wrapperClass='mb-4' placeholder='Password' id='form2' type='password'  value={password} onChange={(e) => setPassword(e.target.value)}/>


    //   <MDBBtn className="mb-4 dark bg-dark">Login</MDBBtn>

    //   <div className="text-center">
    //     <p>Not a member? <a href="#!">Register</a></p>
    //   </div>

    // </MDBContainer>