import React, { useState, useEffect } from 'react'

const UserForm = props => {

    const initialFormState = { id: null, name: '', email: '' }
    const [user, setUser] = useState(props.currentUser)

    const handleInputChange = event => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    useEffect(() => {
        setUser(props.currentUser)
    }, [props])
    
    return (
        <form 
            className="form-horizontal"
            onSubmit={event => {
                event.preventDefault()
                
                if (props.editing) {
                    props.updateUser(user.id, user)
                } 
                else {
                    if (!user.name || !user.email) return
                    props.addUser(user)
                }                
                setUser(initialFormState)
            }}
        >
            <label>Nome</label>
            <input type="text" name="name" className="form-control" required 
                value={user.name} onChange={handleInputChange} />

            <label>E-mail</label>
            <input type="email" name="email" className="form-control" required 
                value={user.email} onChange={handleInputChange} />

            <div className="clearfix"></div><br />
            <button className="btn btn-primary">Salvar</button>
            {props.editing ? (
                <button onClick={() => { 
                        props.setCurrentUser(initialFormState)
                    }} 
                    className="btn btn-outline-secondary"
                >
                    Cancelar
                </button>
            ) : ('')}
        </form>
    )
}

export default UserForm