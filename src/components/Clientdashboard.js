import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CaseCard from './Casecard';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
const Clientdashboard = () => {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('AuthToken');

    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:5000/api/clients/me',config);
        console.log("dashboard level "+ JSON.stringify(response.data));
        setClientData(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <div>
       <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <h1>Client Dashboard</h1>
      {clientData ? (
        <div>
          <table>
            <tr><td>
  
          <h3>Client Information:</h3>
          <p>Name: {clientData.info.name}</p>
          <p>Aadhar: {clientData.info.aadhar_no}</p></td><td>
          <h3>Client Cases:</h3>
          {clientData.clientcases.map((caseItem) => (
            <CaseCard key={caseItem.id} caseData={caseItem} />
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

export default Clientdashboard;




















{/* <h2>Client Dashboard</h2>
      {clientData ? (
        <div>
          <h3>Client Information:</h3>
          <p>Name: {clientData.info.name}</p>
          <p>Aadhar: {clientData.info.aadhar_no}</p>
          <h3>Client Cases:</h3>
          {clientData.clientcases.map((caseItem) => (
            <div key={caseItem._id}>
              <h4>Case ID: {caseItem._id}</h4>
              <p>Lawyer Email: {caseItem.lawyer_email || 'Not Assigned'}</p>
              <p>Admin Email: {caseItem.admin_email}</p>
              <p>Aadhar Number: {caseItem.aadhar_no}</p>
              <p>Case Type: {caseItem.caseType}</p>
              <p>Case Description: {caseItem.caseDescription}</p>
              <p>Case Date: {caseItem.caseDate}</p>
              <h4>Evidences:</h4>
              <ul>
            {caseItem.evidences.map((evidenceId) => (
              <li key={evidenceId}>
                <a href={`/api/client/download/${evidenceId}`} target="_blank" rel="noopener noreferrer">
                  Download Evidence: {evidenceId.filename}
                </a>
              </li>
            ))}
          </ul>
          <ul>
            {caseItem.reports.map((reportId) => (
              <li key={reportId}>
                <a href={`/api/client/download/${reportId}`} target="_blank" rel="noopener noreferrer">
                  Download Report: {reportId.filename}
                </a>
              </li>
            ))}
          </ul>
              <button onClick={handleSelectLawyer} disabled={caseItem.lawyer_email === null}>
                Select Lawyer
              </button>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )} */}




      // {clientData.clientcases.map((caseItem) => (
      //   <div key={caseItem._id}>
      //     <h4>Case ID: {caseItem._id}</h4>
      //     <p>Lawyer Email: {caseItem.lawyer_email || 'Not Assigned'}</p>
      //     <p>Admin Email: {caseItem.admin_email}</p>
      //     <p>Aadhar Number: {caseItem.aadhar_no}</p>
      //     <p>Case Type: {caseItem.caseType}</p>
      //     <p>Case Description: {caseItem.caseDescription}</p>
      //     <p>Case Date: {caseItem.caseDate}</p>
      //     <h4>Evidences:</h4>
      //     <ul>
      //   {caseItem.evidences.map((evidenceId) => (
      //     <li key={evidenceId}>
      //       <a href={`/api/client/download/${evidenceId}`} target="_blank" rel="noopener noreferrer">
      //         Download Evidence: {evidenceId.filename}
      //       </a>
      //     </li>
      //   ))}
      // </ul>
      // <ul>
      //   {caseItem.reports.map((reportId) => (
      //     <li key={reportId}>
      //       <a href={`/api/client/download/${reportId}`} target="_blank" rel="noopener noreferrer">
      //         Download Report: {reportId.filename}
      //       </a>
      //     </li>
      //   ))}
      // </ul>
      //     {/* <button onClick={handleSelectLawyer} disabled={caseItem.lawyer_email === null}>
      //       Select Lawyer
      //     </button> */}
      //     <hr />
      //   </div>
      // ))}