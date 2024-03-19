// import "./Login.css";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginFunction } from "../../api/axios";


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showP, setshowP] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigate()



  const onSubmit = async (data) => {
    setIsSubmiting(true)
    setError(false)

    try {
      const response = await LoginFunction(data);

      //! -- we stored the token and the id of the user in the localstorage
      //! -- so u have to send the token with each request
      //! -- go to the Home component, and se how to send the req

      localStorage.setItem('UserInfo', JSON.stringify({ token: response.token, IdUser: response.id }));
      setTimeout(() => {
        setIsSubmiting(false)
        navigation('/profile')
      }, 1500);


    } catch (error) {
      console.log(error)
      setError('Email or Password are incorrect')

      setTimeout(() => {
        setIsSubmiting(false)
      }, 1500);
    }
  };

  return (
    <div className="flex justify-center items-center" style={{ height: "calc(100vh - 130px)" }}>
      <div className="mx-auto flex flex-col justify-center items-center w-full sm:w-11/12 md:w-1/2 lg:w-1/3">
       
        <div className="text-center py-5">
          <h2 className="font-righteous md:text-xl lg:text-2xl">Welcome Back</h2>
        </div>

        {error ?
          <div className="text-center font-semibold mb-2 w-full" style={{ fontSize: 11 }}>
            <p className="text-red-600 bg-red-100 py-3">{error}</p>

          </div>
          :
          ''
        }

        <div className=" w-full">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

            <div className="relative flex flex-col gap-1">
              <label
                className="text-xs font-semibold text"
                style={{ color: "#393770" }}
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="transition duration-700 px-3 py-2 border border-gray-300 rounded focus:border-indigo-600 focus:outline-none"
                style={{ fontSize: 12 }}
                type="text"
                id="email"
                placeholder="Enter your email address"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && <span className="absolute -bottom-4 text-red-500" style={{ fontSize: 10 }}>{errors.email.message}</span>}
            </div>

            <div className="relative flex flex-col gap-1">
              <label
                className="text-xs font-semibold text"
                style={{ color: "#393770" }}
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative h-10">
                <input
                  className="absolute w-full h-full transition duration-700 px-3 py-2 border border-gray-300 rounded focus:border-indigo-600 focus:outline-none appearance-none"
                  style={{ fontSize: 12 }}
                  type={showP ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  {...register("password", { required: "Password is required" })}
                />
                <div className="absolute h-full right-1">
                  {showP ? (
                    <button
                      className="h-full px-4"
                      type="button"
                      onClick={(e) => {
                        setshowP(false);
                        e.preventDefault();
                      }}
                    >
                      <i className="fa-solid fa-eye-slash text-xs text-indigo-600"></i>
                    </button>
                  ) : (
                    <button
                      className="h-full px-4"
                      type="button"
                      onClick={(e) => {
                        setshowP(true);
                        e.preventDefault();
                      }}
                    >
                      <i className="fa-solid fa-eye text-xs text-indigo-600"></i>
                    </button>
                  )}
                </div>
              </div>
              {errors.password && <span className="absolute -bottom-4 text-red-500" style={{ fontSize: 10 }}>{errors.password.message}</span>}
            </div>

            <div className="mt-2">
              {isSubmiting ?
                <button
                  className="w-full border-0 py-3 text-center bg-blue-600 text-white transition duration-700 rounded font-bold hover:opacity-75 active:opacity-75"
                  style={{ fontSize: 12, backgroundColor: '#453FDE' }}
                  type="button"
                  onClick={(e) => e.preventDefault()}
                >
                  Loading...
                </button>
                :
                <button
                  className="w-full border-0 py-3 text-center bg-blue-600 text-white transition duration-700 rounded font-bold hover:opacity-75 active:opacity-75"
                  style={{ fontSize: 12, backgroundColor: '#453FDE' }}
                  type="submit"
                >
                  Login
                </button>
              }

            </div>

          </form>
          <div className="flex items-center justify-between">
            <h4 className="capitalize my-2 text-gray-500" style={{ fontSize: 11 }}>
              Don't have an account? <Link to="/register" className="ml-2 text-sm text-indigo-600 font-bold">Sign Up</Link>
            </h4>
            <span className="ml-2 text-xs text-indigo-600 font-semibold" style={{ fontSize: 10 }}>
              <Link to="/forget-pwd">Forget password?</Link>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
