import React,{ useState } from 'react';
import Adminlogin from './Adminlogin';
import Adminsignin from './Adminsignup'
import logo from "./simplylaw.png"
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

const Adminhome = () => {
  const [interaction, setInteraction] = useState('');

  const handleInteractionSelection = (interactiontype) => {
    setInteraction(interactiontype);
  };

  const renderContent = () => {
    switch (interaction) {
      case 'login':
        return <Adminlogin />;
      case 'signup':
        return <Adminsignin />;
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
              <h1>Admin</h1>
              <hr />
              <button class="btn btn-dark" onClick={() => handleInteractionSelection('login')}>Login</button>
           
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

  export default Adminhome;