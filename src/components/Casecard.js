import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CaseCard = ({ caseData }) => {

  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleViewMore = () => {
    setExpanded(!expanded);
  };
  

  const handleSelectLawyer = () => {
    const { constituency, _id } = caseData; 
    navigate("/selectlawyer",{state : {id : _id, constituency : constituency}});
  };

  const handleViewFile = async (fileId) => {
    try {
      console.log("Trying to reach " + fileId);

      const response = await fetch(`http://localhost:5000/api/upload/${fileId}`,);
      console.log("Within function");
      if (!response.ok) {
        throw new Error('Failed to retrieve file.');
      }
      const fileData = await response.blob();

      // Determine the file type based on the file extension or MIME type
      const fileType = getFileType(fileData.type);
      
      // Create a URL for the file data to be used in rendering
      const fileUrl = URL.createObjectURL(fileData);

      // Open the file in a new window or tab, depending on the file type
      if (fileType === 'image' || fileType === 'video') {
        window.open(fileUrl);
      } else if (fileType === 'pdf') {
        navigate('/view-pdf', { state: { pdfUrl: fileUrl } });
      }
    } catch (error) {
      console.error('Error retrieving file:', error);
    }
  };

  const getFileType = (mimeType) => {
    if (mimeType.includes('image')) {
      return 'image';
    } else if (mimeType.includes('video')) {
      return 'video';
    } else if (mimeType.includes('pdf')) {
      return 'pdf';
    } else {
      return 'unknown';
    }
  };


  return (
    <div className="case-card">
      <table><tr><td>
      <p>Case ID: {caseData._id}</p>
      <p>Case Date: {caseData.caseDate}</p>
      <p>Case Type: {caseData.caseType}</p>
      <p>Case Description: {caseData.caseDescription}</p>
      {expanded && (
        <div>
            <p>Constituency: {caseData.constituency}</p>
            <p>Aadhar Number: {caseData.aadhar_no}</p>
            <p>Case Description: {caseData.caseDescription}</p>
            
            {!caseData.lawyer_fixed && !caseData.lawyermail && (
                <button onClick={handleSelectLawyer}>Select Lawyer</button>
            )}

            {!caseData.lawyer_fixed && caseData.lawyermail && (
                <p>Requested Lawyer: {caseData.lawyermail}</p>
            )}  

            {caseData.evidences && caseData.evidences.length > 0 && (
            <div>
              <h4>Evidences:</h4>
              {caseData.evidences.map((evidenceId) => (
                <button key={evidenceId} onClick={() => handleViewFile(evidenceId)}>
                  View Evidence File {evidenceId}
                </button>
              ))}
            </div>
          )}
          {caseData.reports && caseData.reports.length > 0 && (
            <div>
              <h4>Reports:</h4>
              {caseData.reports.map((reportId) => (
                <button key={reportId} onClick={() => handleViewFile(reportId)}>
                  View Report File {reportId}
                </button>
              ))}
            </div>
          )}

        </div>
      )}
      <button className="btn btn-dark" onClick={handleViewMore}>{expanded ? 'View Less' : 'View More'}</button>
      </td></tr></table>
    </div>
  );
};

export default CaseCard;