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
      <div className="flex justify-center items-center" style={{ height: "calc(100vh - 130px)" }}>
        <div className="mx-auto min-h-screen flex flex-col justify-center w-full sm:w-11/12 md:w-6/12 lg:w-4/12">
          <button
            className="border-0 text-left text-lg text-indigo-600 hover:opacity-80 p-0"
            style={{ width: "5%" }}
            onClick={() => handleChangeStep(1)}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div className="text-center py-5">
            <h2 className="font-righteous md:text-xl lg:text-2xl">Reset password</h2>
          </div>

          {msg.error || msg.sucsses ?
            <div className="text-center font-semibold mb-2" style={{ fontSize: 11 }}>
              {msg.error ?
                <p className="text-red-600 bg-red-100 py-3">
                  {msg.error}
                </p>
                :
                msg.sucsses ?
                  <p className="text-green-600 bg-green-100 py-3">
                    {msg.sucsses}
                  </p>
                  : ""
              }

            </div>
            :
            ''
          }



          <div className="w-full">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

              <div className="relative flex flex-col gap-1">
                <label
                  className="text-xs font-semibold text"
                  style={{ color: "#393770" }}
                  htmlFor="name"
                >
                  Password
                </label>
                <input
                  className="transition duration-700 px-3 py-2 border border-gray-300 rounded focus:border-indigo-600 focus:outline-none"
                  style={{ fontSize: 12 }}
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
              </div>

              <div className="relative flex flex-col gap-1">
                <label
                  className="text-xs font-semibold text"
                  style={{ color: "#393770" }}
                  htmlFor="Cpassword"
                >
                  Password confirmed
                </label>
                <input
                  className="transition duration-700 px-3 py-2 border border-gray-300 rounded focus:border-indigo-600 focus:outline-none"
                  style={{ fontSize: 12 }}
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
                  <span className="absolute -bottom-4 text-red-500" style={{ fontSize: 10 }}>{errors.Cpassword.message}</span>
                )}
              </div>

              <div className="flex flex-col">
                <span
                  className="text-xs"
                  style={
                    isMoreThan8(password)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  • Minimum 8 characters
                </span>
                <span
                  className="text-xs"
                  style={
                    isUpperCase(password)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  • At least one uppercase letter
                </span>
                <span
                  className="text-xs"
                  style={
                    isLowerCase(password)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  • At least one lowercase letter
                </span>
                <span
                  className="text-xs"
                  style={
                    isDigit(password)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  • At least one number
                </span>
                <span
                  className="text-xs"
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
                  <button
                    className="w-full border-0 py-3 text-center bg-blue-600 text-white transition duration-700 rounded font-bold hover:opacity-75 active:opacity-75"
                    style={{ fontSize: 12, backgroundColor: '#453FDE' }}
                    onClick={e => e.preventDefault()}
                  >
                    Loading...
                  </button>
                  :
                  <button
                    className="w-full border-0 py-3 text-center bg-blue-600 text-white transition duration-700 rounded font-bold hover:opacity-75 active:opacity-75"
                    style={{ fontSize: 12, backgroundColor: '#453FDE' }}
                  >
                    Continue
                  </button>
                }
              </div>
            </form>
            <h4 className="capitalize my-2 text-gray-500" style={{ fontSize: 11 }}>
              already have an account?
              <Link to="/login" className="ml-2 text-sm text-indigo-600 font-bold">Login</Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
