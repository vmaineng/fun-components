"use client";

interface Company {
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  company: Company;
}

import { useState, useEffect } from "react";

export default function UserData() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) throw new Error("error");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="search here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        {filteredUsers.map((user) => (
          <div key={user.id}>
            <p> {user.name}</p>
            <p> {user.email}</p>
            <p> {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
