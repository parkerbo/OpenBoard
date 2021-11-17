import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
		<ul>
			<li>
				<strong>User Id</strong> {userId}
			</li>
			<li>
				<strong>Username</strong> {user.username}
			</li>
			<li>
				<strong>Email</strong> {user.email}
			</li>
			<li>
				<strong>Projects</strong>
        <ul>
        {user.projects ? Object.keys(user.projects).map((key,i) => (
          <li>{user.projects[key].project_title}</li>
        )):null}
        </ul>
			</li>
		</ul>
	);
}
export default User;
