import React from "react";

const MyBookings = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
    <table className="min-w-full bg-white border rounded-lg shadow">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-3">Gig Title</th>
          <th className="p-3">Client Name</th>
          <th className="p-3">Status</th>
          <th className="p-3">Amount</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t">
          <td className="p-3">Logo Design</td>
          <td className="p-3">Nishmitha</td>
          <td className="p-3">Ongoing</td>
          <td className="p-3">₹4500</td>
          <td className="p-3 space-x-2">
            <button className="px-3 py-1 bg-green-500 text-white rounded-lg">
              Chat
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">
              Mark Completed
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default MyBookings;
