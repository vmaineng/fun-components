"use client";

import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users = [
  {
    id: 1,
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    role: "admin",
  },
  {
    id: 2,
    name: "Ervin Howell",
    email: "Shanna@melissa.tv",
    role: "user",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    email: "Nathan@yesenia.net",
    role: "user",
  },
];

export default function UserCard() {
  const [user, setUser] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search name here"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredUsers.map((user) => (
        <div key={user.id}>
          {user.name} {user.email} {user.role}
        </div>
      ))}
    </div>
  );
}
