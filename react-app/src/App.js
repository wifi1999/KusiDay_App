import React, { useState, useEffect } from 'react';
import "./App.css"

// suggested friend: mutual friend, geolocation proximity, same workplace / university 

function FriendsPage() {
    const [avatar, setAvatar] = useState(null)
    const [searchTerm, setSearchTerm] = useState(''); 
    const [users, setUsers] = useState(mockUsers);
    const [friends, setFriends] = useState(mockFriends);
    const [friendRequests, setFriendRequests] = useState(mockFriendRequests); // friend request to add
    const [suggestedFriends, setSuggestedFriends] = useState(mockSuggestedFriends);

    useEffect(() => {
        const avatarData = window.__INITIAL_DATA__;
        setAvatar(avatarData);
    }, []);

    const handleSearchChange = (e) => { // event object passed to event handler, contains info for type of event 
        setSearchTerm(e.target.value); // target is the DOM element that trigger the event, in this example, is the input filed, value of ht einput field 
    };

    const addFriend = (user) => {
        setFriends(prevFriends => [...prevFriends, user]);
        // Also, update your backend about the new friend addition
    };

    const acceptFriendRequest = (request) => { // request is a new object  
        setFriends(prevFriends => [...prevFriends, request]); // ...X (X is an array) is used to create a new array that contains all the original data in that X array
        setFriendRequests(prevRequests => 
            prevRequests.filter(r => r.id !== request.id)
        );
        // Also, update your backend about the new friend addition and removal of the friend request
    };

    return (
        <div>
            <h1>Friends Page</h1> 

            <section>
                <h2>Friend Requests</h2>
                <ul>
                    {friendRequests.map(request => (
                        <li key={request.id}>
                            {request.name} 
                            <button onClick={() => acceptFriendRequest(request)}>Accept</button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Search Users</h2>
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <ul>
                    {users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())).map(user => (
                        <li key={user.id}>
                            {user.name} 
                            <button onClick={() => addFriend(user)}>Add Friend</button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Friend List</h2>
                <ul>
                    {friends.map(friend => (
                        <li key={friend.id}>{friend.name}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Suggested Friends</h2>
                <ul>
                    {suggestedFriends.map(suggested => (
                        <li key={suggested.id}>
                            {suggested.name}
                            <button onClick={() => addFriend(suggested)}>Add Friend</button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

const mockUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    // ... more mock users
];

const mockFriends = [
    { id: 4, name: 'David' },
    { id: 5, name: 'Eva' },
    // ... more mock friends
];

const mockFriendRequests = [ // friend requests to add 
    { id: 6, name: 'Frank' },
    { id: 7, name: 'Grace' },
    // ... more mock friend requests
];

const mockSuggestedFriends = [
    { id: 8, name: 'Hannah' },
    { id: 9, name: 'Isaac' },
    // ... more mock suggested friends
];

export default FriendsPage;

