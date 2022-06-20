import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Edit () {
  const navigate = useNavigate();
  const { id } = useParams();
  const [control, setControl] = useState({
    msv:'',
    fullname: '',
    classname: '',
  });
  const { msv, fullname, classname } = control;

  const inputChange = (e) => {
    setControl({ ...control, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSendData = () => {
    axios.put(`https://62abf213bd0e5d29af17cac7.mockapi.io/Student/${id}`, {
      msv,
      fullname,
      classname,
    });
    Swal.fire({
      position:'center',
      icon: 'success',
      title: 'Your data has been changed successfully',
      showConfirmButton: false,
      timer: 2000,
     })
    navigate('/');
  };

  useEffect(() => {
    axios
      .get(`https://62abf213bd0e5d29af17cac7.mockapi.io/Student/${id}`)
      .then((response) => {
        setControl(response.data);
      });
  }, [id]);

  return (
    <div className="container">
      <div>
        <h1 className="text-secondary">Edit student's info</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="pt-3">
          <input
            type="number"
            className="w-[350px] shadow appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:shadow-outline"
            name="msv"
            value={msv}
            placeholder="Enter MSV..."
            onChange={inputChange}
          />
        </div>
        <div className="pt-3">
           <input
            type="text"
            className="w-[350px] shadow appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:shadow-outline"
            name="fullname"
            value={fullname}
            placeholder="Enter name..."
            onChange={inputChange}
            />
        </div>
        <div className="pt-3">
          <input
            type="string"
            className="w-[350px] shadow appearance-none border-2 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 focus:shadow-outline"
            name="classname"
            value={classname}
            placeholder="Enter classname..."
            onChange={inputChange}
          />
        </div>
        <div className="pt-3">
          <button type="submit" className="btn btn-primary " onClick={handleSendData}>Done</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
