import React,{ useState } from 'react';
import Clientsignup from './Clientsignup';
import Clientlogin from './Clientlogin';
import Clientdashboard from './Clientdashboard';
import logo from "./simplylaw.png"
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';


const Clienthome = () => {
  const [interaction, setInteraction] = useState('');

  const handleInteractionSelection = (interactiontype) => {
    setInteraction(interactiontype);
  };

  const renderContent = () => {
    switch (interaction) {
      case 'login':
        return <Clientlogin />;
      case 'signup':
        return <Clientsignup />;
      case 'dashboard':
        return <Clientdashboard />;
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
              <h1>Client</h1>
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
  export default Clienthome;