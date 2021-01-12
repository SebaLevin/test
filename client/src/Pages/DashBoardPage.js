import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Navbar from '../NavBar';

const DashBoardPage = () => {
  const [users, setUsers] = React.useState([]);
  const [userName, setUserName] = React.useState('')
  
  const socket = io('http://localhost:8000', {
    withCredentials: true,
    query: {
      token: localStorage.getItem('CC_Token')
    },
  });

  const getAllUsers = () => {
    // axios.get('http://localhost:8000/dashboard', {
    //   headers:{ 
    //     Authorization: 'Bearer' + localStorage.getItem('CC_Token'),
    //   },
    // }).then(response => {
    //   setUsers(response.data)
    //   })
    // .catch(err => {
    //   console.log(err)
    // })
  }
  
  const handleDelete = (name) => {
    const deleted = users.filter(user => user.name !== name)
    setUsers(deleted)
    axios.delete('http://localhost:8000/dashboard', name)
    .then(response => {
      console.log(name)
    })
  }

  const getUser = (name) => {
    setUserName(name);
  }

  React.useEffect(() => {
    axios.get('http://localhost:8000/dashboard', {
      headers:{ 
        Authorization: 'Bearer' + localStorage.getItem('CC_Token'),
      },
    }).then(response => {
      setUsers(response.data)
      })
    .catch(err => {
      console.log(err)
    })
  }, [userName])

  
  
    return (
      
      <div className="container mb-4">
        <Navbar />
      <div className="row">
          <div className="col-12 cart-mobile">
              <div className="table-responsive">
                  <table className="table table-striped">
                      <thead>
                          <tr>
                              <th scope="col">Nombre</th>
                              <th scope="col">Email</th>
                              <th scope="col"></th>
                          </tr>
                      </thead>
                      <tbody>
                          {users &&
                              users.map(user =>
                                  <tr>
                                      <td className='card-title w-auto p-3' >{user.name}</td>
                                      <td className="text-right">{user.email} </td>
                                      <td className="text-right"><button type="button" className="btn btn-outline-warning" data-toggle="modal" data-target="#exampleModal" onClick={() => getUser(user.name)}><i className="fa fa-trash"></i></button> </td>
                                  </tr>
                              )}
                          <div className="modal fade shadow-lg p-2 mb-5 rounded" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog bg-dark" role="document">
                                  <div className="modal-content ">
                                      <div className="modal-header bg-dark">
                                          <h5 className="card-header bg-danger text-white " id="exampleModalLabel">IMPORTANTE</h5>
                                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                              <div className="spinner-grow text-danger close" aria-hidden="true" role="status">
                                                  <span className="sr-only" aria-hidden="true">&times;</span>
                                              </div>
                                          </button>
                                      </div>
                                      <div className="modal-body p-3 mb-2 text-dark">
                                          Estas a punto de eliminar al usuario {userName}</div>
                                      <div className="modal-footer bg-dark" >
                                          <button type="button" class="btn btn-outline-danger" data-dismiss="modal" onClick={() => handleDelete(userName)}> SI  </button>
                                          <button type="button" class="btn btn-outline-success" data-dismiss="modal">NO</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </tbody>
                  </table>
              </div>
          </div>
        </div>
      </div>
    )
};

export default DashBoardPage;