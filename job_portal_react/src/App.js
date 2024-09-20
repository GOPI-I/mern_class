import './App.css';
import React, { useRef, useState } from 'react';

function App() {
  const [jobList, setJobList] = useState([]);
  const [matchId, setMatchId] = useState([]);
  const nameRef = useRef();
  const cnameRef = useRef();
  const upnameRef = useRef();
  const upref = useRef();
  const crequirementsRef = useRef();

  const getData = async () => {
    let res = await fetch("http://localhost:8080/list_jobs", { method: "GET" });
    let json = await res.json();
    setJobList(json); // Update job list with fetched data
    console.log(json);
  };

  const createJob = async () => {
    let data = {
      name: nameRef.current.value,
      company_name: cnameRef.current.value,
      requirements: crequirementsRef.current.value,
    };

    let res = await fetch("http://localhost:8080/create_jobs", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    let json = await res.json();
    console.log(json);
    getData(); // Refresh job list after creating a new job
  };

  // Move deleteJob function outside of createJob function
  const deleteJob = async (id) => {

    let res = await fetch(`http://localhost:8080/delete_jobs?id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    let json = await res.json();
    alert(json["msg"]);
    getData(); // Refresh job list after deleting a job
  };


  // const updateJob = async () => {
  //   let data = {
  //     name: upnameRef.current.value,
  //     requirements: upref.current.value,
  //   };
  //   let res = await fetch("http://localhost:8080/update_jobs", {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //     headers: { "content-type": "application/json" },
  //   });
  //   let json = await res.json();
  //   console.log(json);
  //   getData();
  // };


  const loadDataForUpdate = (id) =>{
    let matchjob = jobList.filter((j) => id==j._id)
    console.log(matchjob);
    nameRef.current.value = matchjob[0].name;
    cnameRef.current.value = matchjob[0].company_name;
    crequirementsRef.current.value = matchjob[0].requirements;
    setMatchId(matchjob[0]._id);
    
  };

  const updateJob = async () => {
    let name = nameRef.current.value;
    let company_name = cnameRef.current.value; // Match naming with backend
    let requirements = crequirementsRef.current.value; // Match naming with backend
    

    let id = matchId; // Make sure id is from matchId state

    let data = {
      id: id,
      name: name,
      company_name: company_name,
      requirements: requirements, // Corrected to match backend structure
    };

    let res = await fetch("http://localhost:8080/update_jobs", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    getData(); // Refresh the job list
};


  return (
    <div className="App">
      <button onClick={getData}>Get Job List</button>

      <div>
        {jobList.map((obj, index) => (
          <h3 key={index}>
            <strong>Name: </strong>
            {obj.name}
            <br />
            <strong>Company Name: </strong>
            {obj.company_name}
            <br/>
            <strong>Requirements:{obj.requirements}</strong><br/>
            <button onClick={()=>deleteJob(obj._id)}>Delete Job</button>
            <button onClick={() => loadDataForUpdate(obj._id)}>loadDataForUpdate</button>
          </h3>
        ))}

        <h1>Create Job Form</h1>
        <div>
          <input type="text" ref={nameRef} placeholder="Job Name" />
        </div>
        <div>
          <input type="text" ref={cnameRef} placeholder="Company Name" />
        </div>
        <div>
          <input type="text" ref={crequirementsRef} placeholder="Requirements" />
        </div>
        <div>
          <input type="button" onClick={createJob} value="Create Job" />
        </div>
        <div>
          <button onClick={updateJob}>updateJob</button>
        </div>

        {/* <div>
          <h1>Update </h1>
          <input type='text' ref={upnameRef} placeholder='name'/>
          <input type='text' ref={upref} placeholder='update requirements'/>
          <button onClick={updateJob}>Update job</button>
        </div> */}






      </div>


      
      {/* <div>
        <h1>Delete Form</h1>
        <input type="text" placeholder="Job Name to Delete" ref={deleteRef} /><br />
        <input type="button" value="Delete Job" onClick={deleteJob} />
      </div> */}
    </div>
  );
}

export default App;
