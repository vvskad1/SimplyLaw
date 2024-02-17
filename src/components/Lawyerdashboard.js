import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CaseCard from './Casecard';
import { useNavigate } from "react-router-dom"
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

const Lawyerdashboard = () => {
  const [lawyerData, setLawyerData] = useState(null);
  const [rerenderTrigger, setRerenderTrigger] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {

      try {
        const token =  localStorage.getItem('AuthToken');
        console.log("printing token "+token)

        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

        const response = await axios.get('http://localhost:5000/api/lawyers/me',config);
        console.log("dashboard level "+ JSON.stringify(response.data));
        setLawyerData(response.data);
        }
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [rerenderTrigger]);

  const acceptCase = async (caseId) => {
    try {
      const lawyerId = lawyerData.info._id; // Get lawyer's ID from lawyerData
      const lawyerAcceptCase = async () => {
        try {
          console.log("lawyerId "+lawyerId)
          console.log("case Id "+ caseId)
          const response = await fetch('http://localhost:5000/api/lawyers/accept', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lawyerId, caseId }),
          });
          if (!response.ok) {
            throw new Error('Failed to accept case.');
          }
  
          const data = await response.json();
          console.log('Response:', data);
        } catch (error) {
          console.error('Error :', error);
        }
      };
  
      lawyerAcceptCase();
      setRerenderTrigger((prevTrigger) => prevTrigger + 1);
      navigate('/lawyerdashboard');
    } catch (error) {
      // Handle error
    }
  };
  
  // Function to reject a case
  const rejectCase = async (caseId) => {
    try {
      const lawyerId = lawyerData.info._id; // Get lawyer's ID from lawyerData
      const lawyerRejectCase = async () => {
        try {
          console.log("lawyerId "+lawyerId)
          console.log("case Id "+ caseId)
          const response = await fetch('http://localhost:5000/api/lawyers/reject', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lawyerId, caseId }),
          });
          if (!response.ok) {
            throw new Error('Failed to reject case.');
          }
  
          const data = await response.json();
          console.log('Response:', data);
        } catch (error) {
          console.error('Error :', error);
        }
      };

      lawyerRejectCase();
      setRerenderTrigger((prevTrigger) => prevTrigger + 1);
      navigate('/lawyerdashboard');
    } catch (error) {
      // Handle error
    }
  };

    return (
      <div>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
         
          <h1>Lawyer Dashboard</h1>
        {lawyerData ? (
          <div>
            <table><tr><td>
            <h3>Lawyer Information:</h3>
            <p><b>Name:</b> {lawyerData.info.name}</p>
            <p><b>Email:</b> {lawyerData.info.email}</p>
            </td></tr><tr><td>
            <h3>Lawyer Current Cases:</h3>
            {lawyerData.lawyerCurrentCases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseData={caseItem} />
            ))}</td></tr><tr><td>
            <h3>Lawyer Case Requests:</h3>
            {lawyerData.lawyerCaseRequests.map((caseItem) => (
              <div>
                <CaseCard key={caseItem.id} caseData={caseItem} />
                <button onClick={() => acceptCase(caseItem._id)}>Accept</button>
                <button onClick={() => rejectCase(caseItem._id)}>Reject</button>
              </div>
              
            ))}
            </td></tr>
            </table>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </MDBContainer>
    </div>
    );
  };

  export default Lawyerdashboard;
  
  