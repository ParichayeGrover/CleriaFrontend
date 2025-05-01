import React from 'react';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <h2 className="text-4xl font-bold text-blue-600 mb-4">Login</h2>
      <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
        <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-3 border rounded" />
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Login</button>
      </form>
      <p className="mt-4">Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
    </div>
  );
};

export default Login;
