import React from 'react'
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserTable = props => (
  <table className="table table-striped table-hover">
    <thead>
      <tr>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {props.users.length > 0 ? (
        props.users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
              <button className="btn btn-info" onClick={() => { props.editRow(user) }}><FontAwesomeIcon icon={faEdit} /></button>
              <button className="btn btn-danger" onClick={() => props.deleteUser(user.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>      
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>Não há usuários cadastrados</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default UserTable