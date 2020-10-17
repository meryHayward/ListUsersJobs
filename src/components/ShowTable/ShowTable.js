import React, {useContext} from 'react';
import MainContext from "../Contexts/MainContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ELIMINAR } from '../Reducers/ReducersUsers';
import axios from 'axios';


const ShowTable = () => {
    
    const {users, jobs, dispatch, setSelectedUser, setDisplayUserModal} = useContext(MainContext);

    const editUser = user => {
        setSelectedUser(user);
        setDisplayUserModal(true);
      }
    
    const deleteUser = (user) => {
        axios.delete(`https://5f518d325e98480016123ada.mockapi.io/api/v1/users/${user.id}`)
        .then(res => {
            dispatch({ type: ELIMINAR, payload: res.data });
        }) .catch(err => console.warn('err')) 
    }

    return (
        <React.Fragment>
            {
            users.map(user => {
              const job = jobs.find(job => job.id == user.jobId) || { name: "Not Found" };
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td><img className="avatar-img" src={user.avatar} /></td>
                  <td>{job.name}</td>
                  <td>
                    <button
                      className="button-green"
                      onClick={() => editUser(user)}
                    >
                      EDIT
                       <FontAwesomeIcon icon={faEdit} style={{ marginLeft: `5px` }} />
                    </button>
                    <button
                      className="button-green"
                      onClick={() => deleteUser(user) }
                    >
                      DELETE
                       <FontAwesomeIcon icon={faEdit} style={{ marginLeft: `5px` }} />
                    </button>
                  </td>
                  
                </tr>
              )
            })
          }
        </React.Fragment>
        
    );
}

export default ShowTable;