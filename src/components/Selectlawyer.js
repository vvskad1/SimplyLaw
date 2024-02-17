import React, { useEffect,useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"

const Selectlawyer = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const [lawyers, setLawyers] = useState([]);
    const caseId = location.state.id;
    const constituency = location.state.constituency;
  
    useEffect(() => {
      const fetchLawyers = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/lawyers/getlist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ constituency })
          });
  
          if (!response.ok) {
            throw new Error("Failed to fetch lawyers.");
          }
  
          const data = await response.json();
          console.log("Response:", data);
          setLawyers(data);
        } catch (error) {
          console.error('Error fetching lawyers:', error);
        }
      };
  
      fetchLawyers();
    }, []);

    const handleSelectLawyer = (lawyerId) => {
        console.log('Selected lawyerId:', lawyerId);
        console.log('Selected caseId:', caseId);
       
        const requestLawyer = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/clients/chosenlawyer', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ lawyerId, caseId }),
            });
            if (!response.ok) {
              throw new Error('Failed to choose lawyer.');
            }
    
            const data = await response.json();
            console.log('Response:', data);
          } catch (error) {
            console.error('Error choosing lawyers:', error);
          }
        };

        
    
        requestLawyer();
    
        navigate('/clientdashboard');
      };

   
    return(
        <div>
           <h2>Select Lawyer</h2>
           {lawyers.length > 0 ? (
          <ul>
            {lawyers.map((lawyer) => (
              <li key={lawyer.id}>
                <div>
                  <h4>{lawyer.name}</h4>
                  <p>{lawyer.constituency}</p>
                  <button onClick={() => handleSelectLawyer(lawyer._id)}>Select Lawyer</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No lawyers available in the constituency.</p>
        )}

       
      </div>
    );
}

export default Selectlawyer;


 {/* {selectedLawyerId && (
          <div>
            <h3>Selected Lawyer:</h3>
            <p>Lawyer ID: {selectedLawyerId}</p>
            <button onClick={handleRequestLawyer}>Request Lawyer</button>
          </div>
        )} */}


         // const handleSelectLawyer = (lawyerId) => {
    //     setSelectedLawyerId(lawyerId);

    //     useEffect(() => {
    //         const chooseLawyer = async () => {
    //           try {
    //             const response = await fetch("http://localhost:5000/api/clients/selectlawyer", {
    //               method: "POST",
    //               headers: {
    //                 "Content-Type": "application/json"
    //               },
    //               body: JSON.stringify({ selectedLawyerId ,caseId })
    //             });
        
    //             if (!response.ok) {
    //               throw new Error("Failed to choose lawyer.");
    //             }
        
    //             const data = await response.json();
    //             console.log("Response:", data);
    //           } catch (error) {
    //             console.error('Error choosing lawyers:', error);
    //           }
    //         };
        
    //         chooseLawyer();
    //       }, []);


    //     navigate('/clientdashboard');
        
    // };




     // setSelectedLawyerId(lawyerId);
    
        // console.log("selected lawyer ID is "+lawyerId)
        // Perform the request lawyer logic