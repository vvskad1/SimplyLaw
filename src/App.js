import React,{ useState } from 'react';
import './App.css';
// import Clientdashboard from './components/Clientdashboard';
// import Admindashboard from './components/Admindashboard';
// import Lawyerdashboard from './components/Lawyerdashboard'; 
import Clienthome from './components/Clienthome';
import Lawyerhome from './components/Lawyerhome';
import Adminhome from './components/Adminlogin';
import Layout from './components/Layout';
import Clientdashboard from './components/Clientdashboard';
import logo from './simplylaw.png'
import Navbar from './components/Navbar';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

import {Routes, Route} from 'react-router-dom'
import Lawyerlogin from './components/Lawyerlogin';
import Lawyerdashboard from './components/Lawyerdashboard';
import Clientlogin from './components/Clientlogin';
import Admindashboard from './components/Admindashboard';
import Createcase from './components/Createcase';
import Selectlawyer from './components/Selectlawyer';

const App = () => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('adminToken');
  };
  
  const [userType, setUserType] = useState('');

  const handleUserTypeSelection = (type) => {
    setUserType(type);
  };
  

  const renderContent = () => {
    switch (userType) {
      case 'client':
        return <Clienthome />;
      case 'lawyer':
        return <Lawyerhome />;
      case 'admin':
        return <Adminhome />;
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
              <h1>Login As</h1><hr />
                        <button class="btn btn-dark" type="button" onClick={() => handleUserTypeSelection('client')}><a>Client</a></button>
                        <button class="btn btn-dark" type="button" onClick={() => handleUserTypeSelection('lawyer')}><a>Lawyer</a></button>
                        <button class="btn btn-dark" type="button" onClick={() => handleUserTypeSelection('admin')}><a>Admin</a></button>
              </div>
              </MDBCol>
           </MDBRow>
     
     
         </MDBContainer>
        );
    }
  };

  return (
    <div>
      <Navbar />
        <Routes>
          <Route exact path="/" element={renderContent()} />
          <Route exact path="/clientlogin" element={<Clientlogin/>} />
          <Route exact path="/lawyerlogin" element={<Lawyerlogin/>} />
          <Route exact path="/clientdashboard" element={<Clientdashboard/>} />
          <Route exact path="/lawyerdashboard" element={<Lawyerdashboard/>} />
          <Route exact path="/admindashboard" element={<Admindashboard/>} />
          <Route exact path="/createcase" element={<Createcase/>} />
          <Route exact path="/selectlawyer" element={<Selectlawyer/>} />
          

        </Routes>
     
    </div>
  );
};

export default App;
