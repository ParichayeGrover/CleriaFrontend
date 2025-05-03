import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      medicalId: '1234',
      cardNo: '1234-5678-1234',
      email: 'user@example.com',
      password: 'password123',
    },
  });

  const onSubmit = async (data) => {
    // Remove the backend call temporarily
    console.log(data); // Simulate successful form submission
    alert('Login successful!');
    navigate('/user-dashboard'); // Navigate after "successful" submission
  };

  const handleGoogleLogin = () => {
    alert('Google Sign-In triggered!');
    navigate('/patient-dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 px-4">
      <div className="bg-white/80 backdrop-blur-lg p-4 shadow-2xl rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-2">Patient Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label htmlFor="medicalId" className="block text-sm font-semibold text-gray-700">
              Medical ID
            </label>
            <input
              id="medicalId"
              type="text"
              {...register('medicalId', { required: 'Medical ID is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.medicalId && <p className="text-red-500 text-sm">{errors.medicalId.message}</p>}
          </div>

          <div>
            <label htmlFor="cardNo" className="block text-sm font-semibold text-gray-700">
              Card Number
            </label>
            <input
              id="cardNo"
              type="text"
              {...register('cardNo', {
                required: 'Card number is required',
                pattern: {
                  value: /^\d{4}-\d{4}-\d{4}$/,
                  message: 'Card number must be in format XXXX-XXXX-XXXX',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.cardNo && <p className="text-red-500 text-sm">{errors.cardNo.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
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
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 5, message: 'Minimum 5 characters' },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {generalError && <p className="text-center text-red-600 text-sm">{generalError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white py-2 rounded-md font-medium transition ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center text-gray-500 my-4">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 transition"
        >
          <FcGoogle size={22} />
          <span className="text-sm font-medium">Sign in with Google</span>
        </button>

        <p className="text-center text-sm mt-6 text-gray-700">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;




// import React, { useState } from 'react';
// import { FcGoogle } from 'react-icons/fc';
// import { useNavigate } from 'react-router-dom';

// const UserLogin = () => {
//   const navigate = useNavigate();

//   const [userId, setUserId] = useState('user123');
//   const [cardNo, setCardNo] = useState('1234-5678-9012');
//   const [email, setEmail] = useState('user@example.com');
//   const [password, setPassword] = useState('password');

//   const handleGoogleLogin = () => {
//     alert('Google Sign-In triggered!');
//     navigate('/user-dashboard');
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (
//       userId === 'user123' &&
//       cardNo === '1234-5678-9012' &&
//       email === 'user@example.com' &&
//       password === 'password'
//     ) {
//       alert('Login successful!');
//       navigate('/user-dashboard');
//     } else {
//       alert('Invalid credentials.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 px-4">
//       <div className="bg-white/80 backdrop-blur-lg p-8 shadow-2xl rounded-2xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">User Login</h2>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label htmlFor="userId" className="block text-sm font-semibold text-gray-700">
//               User ID
//             </label>
//             <input
//               id="userId"
//               type="text"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             />
//           </div>

//           <div>
//             <label htmlFor="cardNo" className="block text-sm font-semibold text-gray-700">
//               Card Number
//             </label>
//             <input
//               id="cardNo"
//               type="text"
//               value={cardNo}
//               onChange={(e) => setCardNo(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>

//         <div className="text-center text-gray-500 my-4">or</div>

//         <button
//           onClick={handleGoogleLogin}
//           className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 transition"
//         >
//           <FcGoogle size={22} />
//           <span className="text-sm font-medium">Sign in with Google</span>
//         </button>

//         <p className="text-center text-sm mt-6 text-gray-700">
//           Don&apos;t have an account?{' '}
//           <span
//             onClick={() => navigate('/register')}
//             className="text-blue-600 hover:underline cursor-pointer"
//           >
//             Register
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;
