import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admindashboard = () => {
  const [adminData, setAdminData] = useState(null);
  
// const Admindashboard = ({ adminId }) => {
  const Navigate = useNavigate();

  const handleCreateCase = () => {
    Navigate("/createcase");
  };

  // const handleCreateCase = () => {
  //   Navigate('/createcase', { adminId: adminData.adminId });
  // };

  useEffect(() => {
    const token = localStorage.getItem('AuthToken');

    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:5000/api/admins/me',config);

        const  storedtoken = response.data._id;
        localStorage.setItem('AdminToken', storedtoken);
        console.log(storedtoken)
        console.log("dashboard level response data "+ JSON.stringify(response.data));
        setAdminData(response.data)
        console.log("dashboard level admindata "+ JSON.stringify(adminData));
        
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h2>Admin Dashboard</h2>
      <hr />
      {adminData ? (
        <div>
          {adminData && (
        <button onClick={handleCreateCase}>
          Create Case
        </button>
      )}
      
          <br />
            <hr />
          <br />
          <h3>Admin Information:</h3>
          <p>Name: {adminData.info.name}</p>
          <p>Aadhar: {adminData.info.admin_email}</p>
          <h3>Admin Cases:</h3>
          {adminData.admincases.map((caseItem) => (
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
              <h4>Reports:</h4>
                {caseItem.reports.map((reportId) => (
                  <li key={reportId}>
                    <a href={`/api/client/download/${reportId}`} target="_blank" rel="noopener noreferrer">
                      Download Report: {reportId.filename}
                    </a>
                  </li>
                ))}
              </ul>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Admindashboard;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';


// const Admindashboard = ({ adminId }) => {
//   const Navigate = useNavigate();

//   const handleCreateCase = () => {
//     Navigate("/createcase", { adminId });
//   };


//     return (
//       <div>
//       <h2>Admin Dashboard</h2>
//       <button onClick={handleCreateCase}>Create Case</button>
//     </div>
//     );
// };

// export default Admindashboard;