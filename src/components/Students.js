import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

function Students() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getData();
  });

  const getData = () => {
    axios
      .get('https://62abf213bd0e5d29af17cac7.mockapi.io/Student')
      .then((getData) => {
        setLists(getData.data);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://62abf213bd0e5d29af17cac7.mockapi.io/Student/${id}`)
      .then(() => {
        getData();
      });
  }

  return (
    <div className="container">
      <div>
        <h1 className="text-secondary">Student list</h1>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>MSV</th>
            <th>Name</th>
            <th>Class</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.msv}</td>
                <td>{item.fullname}</td>
                <td>{item.classname}</td>
                <td>
                  <button className="btn btn-primary"><NavLink style={({color: 'white'})} to={`/edit/${item.id}`}>Edit</NavLink></button>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/add" ><p className="btn btn-success">Add a new student</p></Link>
    </div>
  );
}

export default Students;
