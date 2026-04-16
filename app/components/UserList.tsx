// Task: Build a component that fetches a list of users
// from an API (https://jsonplaceholder.typicode.com/users) and
//  displays them in a list.
// Add a search input to filter users by name.

// Junior-level expectations:

// Use useState, useEffect

// Handle loading & error states

// Debounce the search input

//react, nextjs, and typescript
// create a User interface to know what data we are working with
//create out this React function component
//fetch data from the API
//create some state to store data
//render the list of information (name, username, email)
//search input
//set a search state by names
//lowercase all the letters == search.name is
//use an input field to search

"use client";

import { useState, useEffect } from "react";

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
}

export default function UserList() {
  const [users, setUsers] = useState<Users[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) throw new Error();
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err) console.log("try again");
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (users.length === 0) {
    return <div>No users found in system</div>;
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="search for name here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredUsers.map((user) => (
        <div key={user.id}>
          <li>
            {user.name} {user.address.geo.lat}
          </li>
        </div>
      ))}
    </div>
  );
}
