import React from "react";

function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      {/* Clinic Logo or Name */}
      <div className="font-bold text-xl">Clinic Management</div>

      {/* Navigation Links */}
      <ul className="flex space-x-6">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="#">Appointments</a>
        </li>
        <li>
          <a href="#">Patients</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
