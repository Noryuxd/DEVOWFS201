
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Forget_pwd_S2({ onchange }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [handleChangeStep, codeVerification] = onchange;
  const [error, setError] = useState(false);

  const [isSubmiting, setIsSubmiting] = useState(false);

  const onSubmit = (data) => {
    setError(false)
    setIsSubmiting(true)

    if (data.code == codeVerification) {
      setTimeout(() => {
        setIsSubmiting(false)
        handleChangeStep(3)
      }, 1500)
    }

    else {
      setTimeout(() => {
        setError('Invalid code. Please double-check and enter the correct verification code')
        setIsSubmiting(false)
      }, 1500)
    }
  }


  return (
    <>
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
            <h2 className="font-righteous md:text-xl lg:text-2xl">Verification code</h2>
          </div>

          {error ?
            <div className="text-center font-semibold mb-2 w-full" style={{ fontSize: 11 }}>
              <p className="text-red-600 bg-red-100 py-3">{error}</p>

            </div>
            :
            ''
          }

          <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

              <div className="relative flex flex-col gap-1">
                <label
                  htmlFor="code"
                  className="text-sm font-semibold text-gray-800"
                >
                  Verification code
                </label>
                <input
                  className="transition duration-700 px-3 py-2 border border-gray-300 rounded focus:border-indigo-600 focus:outline-none"
                  style={{ fontSize: 12 }}
                  type="text"
                  id="code"
                  placeholder="Enter the code received"
                  {...register("code", {
                    required: "This field is required"
                  })}
                />
                {errors.code && <span className="absolute -bottom-4 text-red-500" style={{ fontSize: 10 }}>{errors.code.message}</span>}
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
            <h4 className="capitalize my-2 text-gray-500" style={{ fontSize: 11 }}>
              already have an account? <Link to="/login" className="ml-2 text-sm text-indigo-600 font-bold">Login</Link>
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}
