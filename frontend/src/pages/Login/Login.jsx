import "./Login.css";
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
    <div className="login">
      <div className="login-body">
        <div className="login-title">
          <h2>Welcome Back</h2>
        </div>
        {error ?
          <div className="login-message">
            <p className="login-error">{error}</p>

          </div>
          :
          ''
        }

        <div className="login-form">
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="login-input">
              <label htmlFor="email">Email Address</label>
              <input
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
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className="login-input">
              <label htmlFor="password">Password</label>
              <div className="login-pswd">
                <input
                  type={showP ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  {...register("password", { required: "Password is required" })}
                />
                <div className="login-pswd-icons">
                  {showP ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        setshowP(false);
                        e.preventDefault();
                      }}
                    >
                      <i className="fa-solid fa-eye-slash"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        setshowP(true);
                        e.preventDefault();
                      }}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  )}
                </div>
              </div>
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>

            <div className="login-btn">
              {isSubmiting ?
                <button type="button" onClick={(e) => e.preventDefault()}>Loading...</button>
                :
                <button type="submit">Login</button>
              }

            </div>

          </form>
          <div className="links">
            <h4>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </h4>
            <span>
              <Link to="/forget-pwd">Forget password?</Link>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
