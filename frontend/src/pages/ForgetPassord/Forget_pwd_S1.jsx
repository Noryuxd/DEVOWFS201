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
      <div className="login">
        <div className="login-body">
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
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Please enter your email to search for your account."
                  {...register("email", {
                    required: "This field is required"
                  })}
                />
                {errors.email && <span>{errors.email.message}</span>}
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

