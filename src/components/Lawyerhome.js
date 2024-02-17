import React,{ useState } from 'react';
import Lawyerlogin from './Lawyerlogin'
import Lawyersignup from './Lawyersignup'
import logo from "./simplylaw.png"
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

const Lawyerhome = () => {
  const [interaction, setInteraction] = useState('');

  const handleInteractionSelection = (interactiontype) => {
    setInteraction(interactiontype);
  };

  const renderContent = () => {
    switch (interaction) {
      case 'login':
        return <Lawyerlogin />;
      case 'signup':
        return <Lawyersignup />;
      default:
        return (
          <MDBContainer fluid className="p-3 my-5 h-custom">

           <MDBRow>

             <MDBCol col='10' md='6'>
               <img src={logo} alt={logo} />
             </MDBCol>
             <MDBCol col='10' md='6'>
             <div class="d-grid gap-2">
              <br /><br /><br /><br /><br /><br />
              <br /><br />
              <h1>Lawyer</h1>
              <hr />
              <button class="btn btn-dark" onClick={() => handleInteractionSelection('login')}>Login</button>
            <button class="btn btn-dark" onClick={() => handleInteractionSelection('signup')}>Sign Up</button>
              </div>
              </MDBCol>
           </MDBRow>
     
     
         </MDBContainer>
        );
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

  export default Lawyerhome;
  