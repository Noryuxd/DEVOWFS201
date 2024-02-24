
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { SignUpFunctionV2 } from "../../api/axios";

export default function SignUp_stepTwo({ onChange }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [handleChangeStep, codeVerification, userInfos] = onChange;
    const [msg, setMsg] = useState({
        error: null,
        sucsses: null
    });

    const [isSubmiting, setIsSubmiting] = useState(false);
    const navigate = useNavigate()


    const onSubmit = async (data) => {
        setMsg({ error: null, sucsses: null });
        setIsSubmiting(true)

        if (data.code == codeVerification) {
            try {
                await SignUpFunctionV2(userInfos);
                setMsg({ error: null, sucsses: 'You account had been created sucssufuly' })

                setTimeout(() => {
                    setIsSubmiting(false)
                    navigate('/login')
                }, 2000)

            } catch (error) {
                setIsSubmiting(false)
                setMsg({ error: error.response.data.message, sucsses: null })
            }


        }

        else {
            setTimeout(() => {
                setMsg({ error: 'Invalid code. Please double-check and enter the correct verification code', sucsses: null })
                setIsSubmiting(false)
            }, 1500)
        }
    }


    return (
        <>
            <div className="login">
                <div className="login-body">
                    <button className="back-to" onClick={() => handleChangeStep(1)}><i className="fa-solid fa-arrow-left"></i></button>

                    <div className="login-title">
                        <h2>Verification code</h2>
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
