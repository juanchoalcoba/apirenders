import { User } from "../../types/types";

export default function UserList({ users }: { users: User[] }) {
  return (
    <ul>
      {users.map((u) => (
        <li
          key={u.id}
          className="border-b border-gray-500 py-1 text-sm dark:text-gray-100"
        >
          {u.name} - <span className="text-gray-400">{u.email}</span>
        </li>
      ))}
    </ul>
  );
}
