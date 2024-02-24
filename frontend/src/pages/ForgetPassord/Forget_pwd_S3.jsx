import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ForgetPswdFunctionV2 } from "../../api/axios";

const isUpperCase = (str) => /[A-Z]/.test(str);
const isLowerCase = (str) => /[a-z]/.test(str);
const isDigit = (str) => /\d/.test(str);
const isSpecialCharacter = (str) => /[!@#$%^&*(),.?":{}|<>]/.test(str);
const isMoreThan8 = (value) => value.length >= 8;

export default function Forget_pwd_S3({ onchange }) {
  const [handleChangeStep, email] = onchange;
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [password, setPassword] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [msg, setMsg] = useState({
    error: null,
    sucsses: null
  });
  const navigate = useNavigate()


  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setValue("password", value, { shouldValidate: true });
  }

  const onSubmit = async (data) => {
    setMsg({ error: null, sucsses: null });
    setIsSubmiting(true)

    try {
      const info = {
        email: email,
        password: data.password
      }
      
      await ForgetPswdFunctionV2(info);
      setMsg({ error: null, sucsses: 'You password had been updated sucssesfuly' })

      setTimeout(() => {
        navigate('/login')
        setIsSubmiting(false)
      }, 3000);


    } catch (error) {
      setTimeout(() => {
        setIsSubmiting(false)
        setMsg({ error: 'An error occurred, please try again', sucsses: null })
      }, 1500);
    }
  };

  return (
    <div>
      <div className="login">
        <div className="login-body">
          <button className="back-to" onClick={() => handleChangeStep(1)}><i className="fa-solid fa-arrow-left"></i></button>
          <div className="login-title">
            <h2>Reset password</h2>
          </div>
          {msg.error || msg.sucsses ?
            <div className="login-message">
              {msg.error ?
                <p className="login-error">
                  {msg.error}
                </p>
                :
                msg.sucsses ?
                  <p className="login-sucsses">
                    {msg.sucsses}
                  </p>
                  : ""
              }

            </div>
            :
            ''
          }



          <div className="login-form">
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="login-input">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Please enter your new password."
                  {...register("password", {
                    required: "This field is required",
                    validate: (value) => {
                      const regex =
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&(),.?":{}|<>])[a-zA-Z\d!@#$%^&(),.?":{}|<>]{8,}$/;
                      return regex.test(value) || "Password should be strong";
                    },
                  })}
                  value={password}
                  onChange={handlePasswordChange}
                />
                {errors.password && (
                  <span className="error">{errors.password.message}</span>
                )}
              </div>

              <div className="login-input">
                <label htmlFor="Cpassword">Password confirmed</label>
                <input
                  type="text"
                  id="Cpassword"
                  name="Cpassword"
                  placeholder="Please confirm your password."
                  {...register("Cpassword", {
                    required: "This field is required",
                    validate: (value) => value === password || "Passwords do not match",
                  })}
                />
                {errors.Cpassword && (
                  <span className="error">{errors.Cpassword.message}</span>
                )}
              </div>

              <div className="pswd-cn">
                <span
                  style={
                    isMoreThan8(password)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  • Minimum 8 characters
                </span>
                <span
                  style={
                    isUpperCase(password)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  • At least one uppercase letter
                </span>
                <span
                  style={
                    isLowerCase(password)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  • At least one lowercase letter
                </span>
                <span
                  style={
                    isDigit(password)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  • At least one number
                </span>
                <span
                  style={
                    isSpecialCharacter(password)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  • At least one special character
                </span>
              </div>

              <div className="login-btn">
                {isSubmiting ?
                  <button onClick={e => e.preventDefault()}>Loading...</button>
                  :
                  <button>Continue</button>
                }
              </div>
            </form>
            <h4>
              already have an account? <Link to="/login">Login</Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
