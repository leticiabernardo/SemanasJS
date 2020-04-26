import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';
import itsAMatch from '../../assets/itsamatch.png';

export default ({ match }) => {

    const [ users, setUsers ] = useState([]);
    const [ matchDev, setMatchDev ] = useState(null);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs',{
                headers: {
                    user: match.params.id
                }
            });
            setUsers(response.data);
        }
        loadUsers();
    }, [match.params.id])

    useEffect(() => {
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        });
        socket.on('match', dev => {
            setMatchDev(dev);
        });
    }, [match.params.id]);
    
    async function handleLike(id) {

        const userId = match.params.id;

        const response = await api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: userId
            }
        });
        if (response.data.likes.includes(userId)) {
            console.log('DEU MATCH');
        }
        setUsers(users.filter(user => user._id !== id ));
    }

    async function handleDislike(id) {

        const userId = match.params.id;        
        
        await api.post(`/devs/${id}/dislikes`, null ,{
            headers: {
                user: userId
            }
        });
        setUsers(users.filter(user => user._id !== id ));
    }

    return (
        <div className="main-container">
            <Link to="/">
            <img src= { logo } alt="Tindev"/>
            </Link>
            {users.length > 0 ? ( !matchDev ? 
                <ul>
                    {users.map( user => (
                    <li key={user._id}>
                        <img src={user.avatar} alt={user.name}/>
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="buttons">
                            <button type="button" onClick={() => handleDislike(user._id)}>
                                <img src={ dislike } alt="dislike"></img>
                            </button>
                            <button type="button" onClick={() => handleLike(user._id)}>
                                <img src={ like } alt="like"></img>
                            </button>
                        </div>
                    </li>
                    ))}
                </ul>
                :
                <div className="match-container">
                    <img src={itsAMatch} alt="Its a Match" />
                    <img className="avatar my-4" src={matchDev.avatar} />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button type="button" onClick={() => setMatchDev(null)}>Fechar</button>
                </div>
            ) : (
                <div className="empty">Acabou :( </div>
            )}
        </div>
    );
}