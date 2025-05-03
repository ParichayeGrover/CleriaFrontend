import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Adminlogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState('');

  const networkdelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (data) => {
    await networkdelay(1000);

    if (
      data.email === "admin123@hospital.com" &&
      data.password === "admin123" &&
      data.id === "hospital123"
    ) {
      navigate("/admin-portal");
    } else {
      setGeneralError("Invalid Credentials, please recheck!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              id="email"
              type="email"
              defaultValue="admin123@hospital.com"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input
              id="password"
              type="password"
              defaultValue="admin123"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 5, message: "Minimum 5 characters" },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="id" className="block mb-1 font-medium">Hospital ID</label>
            <input
              id="id"
              type="text"
              defaultValue="hospital123"
              placeholder="Hospital ID"
              className="w-full px-4 py-3 border rounded"
              {...register("id", {
                required: "Hospital ID is required",
                minLength: { value: 3, message: "At least 3 characters" },
              })}
            />
            {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>}
          </div>

          {generalError && <p className="text-red-600 text-sm text-center">{generalError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              isSubmitting ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        {/* Google Login Button (Just UI for now) */}
        <button
          onClick={() => alert("Google login not yet implemented")}
          className="w-full py-3 flex items-center justify-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className="text-blue-600 hover:underline cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Adminlogin;


// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';

// const Adminlogin = () => {

//   const { register, handleSubmit,generalError, watch, setError, formState: { errors, isSubmitting } } = useForm();

//   const navigate = useNavigate();

//   const networkdelay = (ms) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve("done");
//       }, ms);
//     });
//   };


//   const onSubmit = async (data) => {
//     await networkdelay(1000); // for testing 


//     // use fetch for connecting with database at this point 

//     if (data.email === "admin123@hospital.com" && data.password === "admin123" && data.id === "hospital123") {
//       navigate("/admin-portal");
//     } else {
//       setGeneralError("Invalid Credentials, please recheck!");
//     }

//   }


//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen min-w-screen! bg-gray-100 px-6 container">
//       <h2 className="text-4xl font-bold text-blue-600 mb-4">Login</h2>


//       <form action="" onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
//         <input type="email" defaultValue={"admin123@hospital.com"} placeholder="Email" className="w-full p-3 border rounded" {...register("email", {
//           required: "Email is required",
//           minLength: { value: 5, message: "Email must be at least 5 characters" },
//           maxLength: { value: 50, message: "Email must be less than 50 characters" },
//           pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
//         })} />
//         {errors.email ? (
//           <div className="text-red-500">{errors.email.message}</div>
//         ) : null}

//         <input type="password" placeholder="Password" defaultValue={"admin123"} className="w-full p-3 border rounded" {...register("password", {
//           required: "Password is required",
//           minLength: { value: 5, message: "Password must be at least 5 characters" },
//           maxLength: { value: 20, message: "Password must be less than 20 characters" },
//         })} />
//         {errors.password ? (
//           <div className="text-red-500">{errors.password.message}</div>
//         ) : null}


//         <input type="text" placeholder="Hospital Id" defaultValue={"hospital123"} className="w-full p-3 border rounded"{...register("id", {
//           required: "Hospital ID is required",
//           minLength: { value: 3, message: "Hospital ID must be at least 3 characters" },
//         })} />
//         {errors.id ? (
//           <div className="text-red-500">{errors.id.message}</div>
//         ) : null}

//         <button disabled={isSubmitting}  type='submit' className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 hover:cursor-pointer">{isSubmitting?"Logging in ..": "Login"}</button>

//         {generalError && <div className="text-red-500 mt-2">{generalError}</div>}      </form>

//       <p className="mt-4">Don't have an account? <span onClick={() => navigate("/register")} className='text-blue-500 hover:cursor-pointer'>Register</span> </p>
//     </div>
//   );
// };

// export default Adminlogin;

