import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ForgetPswdFunctionV1 } from "../../api/axios";

export default function Forget_pwd_S1({ onchange }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [handleChangeStep, setCodeVerification, setEmail] = onchange;

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [msg, setMsg] = useState({
    error: null,
    sucsses: null
  });



  const onSubmit = async (data) => {
    setMsg({ error: null, sucsses: null });
    setIsSubmiting(true)

    try {
      // const r = await axios.post('http://127.0.0.1:8000/api/checkEmailIfExist', { email: data.email });
      const response = await ForgetPswdFunctionV1({ email: data.email });

      setMsg({ error: null, sucsses: 'You have received a verification code' })

      setTimeout(() => {
        handleChangeStep(2)
        setEmail(data.email)
        setCodeVerification(response.code)
        setIsSubmiting(false)
      }, 3000)


    } catch (error) {
      setTimeout(() => {
        setMsg({ error: 'Email does not exist', sucsses: null })
        setIsSubmiting(false)
      }, 1500)
    }

  }

  return (
    <div>
      <div className="flex justify-center items-center" style={{ height: "calc(100vh - 130px)" }}>
        <div className="mx-auto flex flex-col justify-center items-center w-full sm:w-11/12 md:w-1/2 lg:w-1/3">

          <div className="text-center py-5">
            <h2 className="font-righteous md:text-xl lg:text-2xl">Reset password</h2>
          </div>

          {msg.error || msg.sucsses ?
            <div className="text-center font-semibold mb-2 w-full" style={{ fontSize: 11 }}>
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
                  placeholder="Please enter your email to search for your account."
                  {...register("email", {
                    required: "This field is required"
                  })}
                />
                {errors.email && <span className="absolute -bottom-4 text-red-500" style={{ fontSize: 10 }}>{errors.email.message}</span>}
              </div>

              <div className="mt-2">
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
                    type="submit"
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

