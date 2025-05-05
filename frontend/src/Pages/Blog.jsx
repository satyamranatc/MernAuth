import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Blog() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Get user from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);

    // Get blog data
    async function fetchBlogs() {
      try {
        const res = await axios.get('http://localhost:5500/api/blogs');
        setData(res.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    }

    fetchBlogs();
  }, []);

  // Logging after user is set
  useEffect(() => {
    console.log('User:', user);
  }, [user]);

  return (
    <div>
      <center>
        <h1>Hello by Blog Page</h1>
        <h2>
          Welcome {user ? user.fullName : 'Guest'}
        </h2>
        {
          data.map((e, i) => (
            <div key={i}>
              {e}
            </div>
          ))
        }
      </center>
    </div>
  );
}
