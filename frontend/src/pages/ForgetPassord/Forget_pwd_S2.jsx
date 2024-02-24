
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
      <div className="login">
        <div className="login-body">
          <button className="back-to" onClick={e => handleChangeStep(1)}><i className="fa-solid fa-arrow-left"></i></button>

          <div className="login-title">
            <h2>Verification code</h2>
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
              {/* <div className="login-input">
                <label htmlFor="password">Verification code</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter the code received"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div> */}

              <div className="login-input">
                <label htmlFor="code">Verification code</label>
                <input
                  type="text"
                  id="code"
                  placeholder="Enter the code received"
                  {...register("code", {
                    required: "This field is required"
                  })}
                />
                {errors.code && <span>{errors.code.message}</span>}
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
    </>
  );
}
