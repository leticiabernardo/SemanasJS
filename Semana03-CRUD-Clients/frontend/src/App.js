import React, { useState } from 'react'
import Users from './components/Users'
import UserForm from './forms/UserForm'

const App = () => {
    const usersData = [
        { id: 1, name: 'Leticia', email: 'leticiaellenbernardo@gmail.com' },
        { id: 2, name: 'Gustavo', email: 'gusponton@gmail.com' },
        { id: 3, name: 'Bruna', email: 'bruna.bernardo@gmail.com' },
    ]

    const [users, setUsers] = useState(usersData)

    const addUser = user => {
        user.id = users.length + 1
        setUsers([...users, user])
    }

    const [editing, setEditing] = useState(false)
    const initialFormState = { id: null, name: '', email: '' }
    const [currentUser, setCurrentUser] = useState(initialFormState)

    const editRow = user => {
        setEditing(true)
        setCurrentUser({ id: user.id, name: user.name, email: user.email })
    }

    const updateUser = (id, updatedUser) => {
        setEditing(false)
        setUsers(users.map(user => (user.id === id ? updatedUser : user)))
        setCurrentUser(initialFormState)
        //setCurrentUser(updatedUser)
    }
    
    const deleteUser = id => {
        setUsers(users.filter(user => user.id !== id))
        setEditing(false)
        setCurrentUser(initialFormState)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="main-title">Usuários</h1>    
                    <hr />
                </div>
                <div className="col-md-6">
                    {editing ? (
                        <div>
                        <h2>Editar usuário</h2> 
                        </div>
                    ) : (
                        <div>
                        <h2>Adicionar novo usuário</h2>
                        </div>
                    )}
                    <div>
                        <UserForm 
                            addUser={addUser}
                            updateUser={updateUser}
                            editing={editing}
                            setEditing={setEditing}
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <h2>Listagem de usuários</h2>
                    <Users users={users} editRow={editRow} deleteUser={deleteUser} />
                </div> 
            </div>
        </div>
    )
}

export default App