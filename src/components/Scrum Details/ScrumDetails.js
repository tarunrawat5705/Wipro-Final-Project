// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';

// const ScrumDetails = ({ scrum }) => {
//     const [tasks, setTasks] = useState([]);
//     const [users, setUsers] = useState([]);
//     const history = useHistory();

//     useEffect(() => {
//         const checkUser = () => {
//             const loggedInUser = JSON.parse(localStorage.getItem('user'));
//             if (!loggedInUser) {
//                 history.push('/login');
//             }
//         };

//         checkUser();
//     }, [history]);

//     useEffect(() => {
//         const fetchTasks = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:4000/tasks?scrumId=${scrum.id}`);
//                 setTasks(response.data);
//             } catch (error) {
//                 console.error('Error fetching tasks:', error);
//             }
//         };

//         fetchTasks();
//     }, [scrum.id]);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/users');
//                 const scrumUsers = response.data.filter(user => tasks.some(task => task.assignedTo === user.id));
//                 setUsers(scrumUsers);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         if (tasks.length > 0) {
//             fetchUsers();
//         }
//     }, [tasks]);

//     return (
//         <div>
//             <h3>Scrum Details for {scrum.name}</h3>
//             <h4>Tasks</h4>
//             <ul>
//                 {tasks.map(task => (
//                     <li key={task.id}>
//                         <strong>{task.title}:</strong> {task.description} - <em>{task.status}</em>
//                     </li>
//                 ))}
//             </ul>
//             <h4>Users</h4>
//             <ul>
//                 {users.map(user => (
//                     <li key={user.id}>
//                         {user.name} ({user.email})
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ScrumDetails;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import { useHistory } from 'react-router-dom';

const ScrumDetails = ({ scrum }) => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        const checkUser = () => {
            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            if (!loggedInUser) {
                history.push('/login');
            }
        };

        checkUser();
    }, [history]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/tasks?scrumId=${scrum.id}`);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [scrum.id]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/users');
                const scrumUsers = response.data.filter(user => tasks.some(task => task.assignedTo === user.id));
                setUsers(scrumUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        if (tasks.length > 0) {
            fetchUsers();
        }
    }, [tasks]);

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await axios.patch(`http://localhost:4000/tasks/${taskId}`, {
                status: newStatus,
                history: [
                    ...tasks.find(task => task.id === taskId).history,
                    {
                        status: newStatus,
                        date: new Date().toISOString().split('T')[0], // Set the current date
                    },
                ],
            });

            // Update the tasks state with the new status
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, status: newStatus } : task
                )
            );
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    return (
        <div>
            <h3>Scrum Details for {scrum.name}</h3>
            <h4>Tasks</h4>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <strong>{task.title}:</strong> {task.description} - <em>{task.status}</em>
                        {user?.role === 'admin' && (
                            <select
                                value={task.status}
                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        )}
                    </li>
                ))}
            </ul>
            <h4>Users</h4>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScrumDetails;
