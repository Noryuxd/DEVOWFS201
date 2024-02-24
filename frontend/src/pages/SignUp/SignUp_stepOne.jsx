import "./SignUp.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SignUpFunctionV1 } from "../../api/axios";

const isUpperCase = (str) => /[A-Z]/.test(str);
const isLowerCase = (str) => /[a-z]/.test(str);
const isDigit = (str) => /\d/.test(str);
const isSpecialCharacter = (str) => /[!@#$%^&*(),.?":{}|<>]/.test(str);
const isMoreThan8 = (value) => value.length >= 8;

export default function SignUp_stepOne({ onChange }) {
    const [handleChangeStep, setCodeVerification, setUserInfos] = onChange;
    const [role, setRole] = useState("jobSeeker");
    const [showP, setshowP] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [msg, setMsg] = useState({
        error: null,
        sucsses: null
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = async (data) => {
        setIsSubmiting(true)
        setMsg({ error: null, sucsses: null });
        try {
            const response = await SignUpFunctionV1(data)

            setMsg({ error: null, sucsses: 'You have received a verification code' })
            setCodeVerification(response.code)
            setUserInfos({ role: role, data })

            setTimeout(() => {
                setIsSubmiting(false)
                handleChangeStep(2)
            }, 2000);

        } catch (error) {
            setMsg({ error: error.response.data.message, sucsses: null })
            setTimeout(() => {
                setIsSubmiting(false)
            }, 1500);
        }

    };

    const [password, setPassword] = useState("");

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setValue("password", value, { shouldValidate: true });
    };


    return (
        <div className="sign-up">

            <div className="sign-up-body">
                <div className="sign-up-choix">
                    <button
                        className={role == "jobSeeker" ? "choix-active" : ""}
                        onClick={() => setRole("jobSeeker")}
                    >
                        Job Seeker
                    </button>
                    <button
                        className={role == "company" ? "choix-active" : ""}
                        onClick={() => setRole("company")}
                    >
                        Company
                    </button>
                </div>

                <div className="sing-up-title">
                    <h2>Get more opportunities</h2>
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

                {/* <div className="sign-up-with-google">
          <div></div>
        </div>

        <div className="sign-up-sparate">
          <hr />
          <span>Or Sign up with email</span>
          <hr />
        </div> */}

                <div className="sign-up-form">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="sign-up-input">
                            <label htmlFor="name">{role == "company" ? "Name of Company" : "Full Name"}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder={role == "company" ? "Enter Name of your Company" : "Enter your full name"}
                                {...register("name", { required: "This field is required" })}
                            />
                            {errors.name && (
                                <span className="error">{errors.name.message}</span>
                            )}
                        </div>

                        <div className="sign-up-input">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter email address"
                                {...register("email", {
                                    required: "This field is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <span className="error">Error: {errors.email.message}</span>
                            )}
                        </div>

                        <div className="sign-up-input">
                            <label htmlFor="password">Password</label>
                            <div className="sign-up-pswd">
                                <input
                                    type={showP ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
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
                                <div className="sign-up-pswd-icons">
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

                        <div className="sign-up-btn">
                            {isSubmiting ?
                                <button type="button" onClick={(e) => e.preventDefault()}>Loading...</button>
                                :
                                <button type="submit">Continue</button>
                            }
                        </div>
                    </form>
                    <h4>
                        already have an account? <Link to="/login">Login</Link>
                    </h4>
                    <p>
                        By Clicking 'Continue', you acknowledge that you have read and
                        accept the <span>Term of Service</span> and <span>Policy</span>
                    </p>
                </div>
            </div>

        </div>
    );
}

