import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle registration logic here
    console.log(data);
    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 px-4">
      <div className="bg-white/80 backdrop-blur-lg p-8 shadow-2xl rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              {...register('name', { required: 'Full Name is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700">
              Role
            </label>
            <select
              id="role"
              {...register('role', { required: 'Role is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Select Role</option>
              <option value="DOCTOR">Doctor</option>
              <option value="NURSE">Nurse</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-700">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   let navigate=useNavigate();
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
//       <h2 className="text-4xl font-bold text-blue-600 mb-4">Register</h2>
//       <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
//         <input type="text" placeholder="Full Name" className="w-full p-3 border rounded" />
//         <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
//         <input type="password" placeholder="Password" className="w-full p-3 border rounded" />
//         <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Sign Up</button>
//       </form>
//       <p className="mt-4">Already have an account? <span onClick={()=>{navigate('/login')}} className='text-blue-500 hover:cursor-pointer'>Login</span> </p>
//     </div>
//   );
// };

// export default Register;
