/* eslint-disable react/prop-types */
export default function TableAllUsers({ users }) {
  return (
    <div className="relative mx-4 overflow-x-auto rounded-lg shadow-md lg:mx-2 2xl:mx-0">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre de Usuario
            </th>
            <th scope="col" className="px-6 py-3">
              Correo Electrónico
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b odd:bg-white even:bg-gray-50">
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
