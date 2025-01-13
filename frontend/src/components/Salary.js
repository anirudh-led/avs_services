import React, { useState, useEffect } from 'react';

const PaymentForm = () => {
  const [users, setUsers] = useState([]); // State to hold the users data
  const [selectedUser, setSelectedUser] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetch('https://avs-services-backend.onrender.com/workers', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })  // Assuming backend is running on localhost:4000
      .then((response) => response.json())
      .then((data) => {
        if (data.workers) {  // Change 'data.users' to 'data.workers'
          setUsers(data.workers);
        }
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);
  

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const paymentData = {
      workerId: selectedUser,
      amount,
      notes,
    };

    // Send payment data to the backend
    fetch('http://localhost:4000/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Payment Successful!');
        } else {
          alert('Payment failed: ' + data.error);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Pay Worker</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Select Worker */}
        <div>
          <label htmlFor="worker" className="block text-gray-600 font-medium">Select Worker</label>
          <select
            id="worker"
            name="worker"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a worker</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} - ${user.salary}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-gray-600 font-medium">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount to pay"
            required
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-gray-600 font-medium">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add any notes about the payment"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-amber-300 px-4 py-2 rounded-xl w-full transition-colors hover:bg-orange-500"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
