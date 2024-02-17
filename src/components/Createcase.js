import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

const Createcase = () => {
  // const adminId = localStorage.getItem('AdminToken');
  // console.log("admin Id " + adminId)
  
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    aadhar_no: '',
    caseType: '',
    caseDescription: '',
    caseDate: '',
    constituency: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('AuthToken');
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

      console.log("form data "+ JSON.stringify(formData))
      const res = await axios.post('http://localhost:5000/api/cases',formData,config);

      console.log(res.data); // Do something with the response if needed
      console.log("Case Created")
      Navigate("/admindashboard")
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div>
         <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
          <h3>Create New Case</h3>
            <form onSubmit={handleSubmit}>
              <div>
               <MDBInput wrapperClass='mb-4' placeholder='Aadhar Number' type="number"
                name="aadhar_no"
                value={formData.aadhar_no}
                onChange={handleChange}/>
              </div>
              <div>
              <MDBInput wrapperClass='mb-4' placeholder='Case Type' type="text"
          name="caseType"
          value={formData.caseType}
          onChange={handleChange}/>              
              </div>
              <div>
              <MDBInput wrapperClass='mb-4' placeholder='Case Description' id='form1'  name="caseDescription"
          value={formData.caseDescription}
          onChange={handleChange}/>              
              </div>
              <div>
              <MDBInput wrapperClass='mb-4' placeholder='Case Date' id='form1' name="caseDate"
          value={formData.caseDate}
          onChange={handleChange}/>              
              </div>
              <div>
              <MDBInput wrapperClass='mb-4' placeholder='Constituency' id='form2' type="text"
          name="constituency"
          value={formData.constituency}
          onChange={handleChange}/>
              </div>
              <button type="submit">Submit</button>
           </form>
        </MDBContainer>
      </div>
  );
};

export default Createcase;


// <form onSubmit={handleSubmit}>

    {/* /*  <label>
        Aadhar Number:
        <input
          type="number"
          name="aadhar_no"
          value={formData.aadhar_no}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Case Type:
        <input
          type="text"
          name="caseType"
          value={formData.caseType}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Case Description:
        <textarea
          name="caseDescription"
          value={formData.caseDescription}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Case Date:
        <input
          type="text"
          name="caseDate"
          value={formData.caseDate}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <label>
        Constituency:
        <input
          type="text"
          name="constituency"
          value={formData.constituency}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <button type="submit">Submit</button>
    </form>    */}