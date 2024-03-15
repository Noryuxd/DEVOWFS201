// import "./SignUp.css";
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
        <div className="flex justify-center items-center" style={{ height: "calc(100vh - 130px)" }}>
            <div className="mx-auto flex flex-col justify-center items-center md:w-1/2 lg:w-1/3">
                <div className="flex justify-center items-center mb-4">
                    <button
                        className={`bg-transparent px-4 py-3 text-blue-600 font-bold text-sm border-0 outline-none cursor-pointer transition duration-400 ease-in`}
                        style={role == "jobSeeker" ? { backgroundColor: '#EBEAFB' } : {}}
                        onClick={() => setRole("jobSeeker")}
                    >
                        Job Seeker
                    </button>
                    <button
                        className={`bg-transparent px-4 py-3 text-blue-600 font-bold text-sm border-0 outline-none cursor-pointer transition duration-400 ease-in`}
                        style={role == "company" ? { backgroundColor: '#EBEAFB' } : {}}
                        onClick={() => setRole("company")}
                    >
                        Company
                    </button>
                </div>

                <div className="text-center py-5">
                    <h2 className="font-righteous md:text-xl lg:text-2xl">Get more opportunities</h2>
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

                <div className="w-full">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative flex flex-col gap-1">
                            <label
                                className="text-xs font-semibold text"
                                style={{ color: "#393770" }}
                                htmlFor="name"
                            >
                                {role === "company" ? "Name of Company" : "Full Name"}
                            </label>
                            <input
                                className="transition duration-700 px-3 py-2 border border-gray-300 rounded focus:border-indigo-600 focus:outline-none"
                                style={{ fontSize: 12 }}
                                type="text"
                                id="name"
                                name="name"
                                placeholder={role === "company" ? "Enter Name of your Company" : "Enter your full name"}
                                {...register("name", { required: "This field is required" })}
                            />
                            {errors.name &&
                                <span className="error absolute -bottom-4 text-red-500" style={{ fontSize: 10 }}>{errors.name.message}</span>
                            }
                        </div>

                        <div className="relative flex flex-col gap-1">
                            <label
                                className="text-xs font-semibold"
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
                            {errors.email &&
                                <span className="absolute -bottom-4 text-red-500" style={{ fontSize: 10 }}>Error: {errors.email.message}</span>
                            }
                        </div>

                        <div className="relative flex flex-col gap-1">
                            <label
                                className="text-xs font-semibold "
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
                                    {...register("password", {
                                        required: "This field is required",
                                        validate: (value) => {
                                            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&(),.?":{}|<>])[a-zA-Z\d!@#$%^&(),.?":{}|<>]{8,}$/;
                                            return regex.test(value) || "Password should be strong";
                                        },
                                    })}
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <div className="absolute h-full right-1">
                                    {showP ?
                                        <button
                                            className="h-full px-4"
                                            type="button"
                                            onClick={() => setshowP(false)}
                                        >
                                            <i className="fa-solid fa-eye-slash text-xs text-indigo-600"></i>
                                        </button>
                                        :
                                        <button
                                            className="h-full px-4"
                                            type="button"
                                            onClick={() => setshowP(true)}
                                        >
                                            <i className="fa-solid fa-eye text-xs text-indigo-600"></i>
                                        </button>
                                    }
                                </div>
                            </div>
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

                        <div className="mt-2">
                            <button
                                className="w-full border-0 py-3 text-center bg-blue-600 text-white transition duration-700 rounded font-bold hover:opacity-75 active:opacity-75"
                                style={{ fontSize: 12, backgroundColor: '#453FDE' }}
                                type="submit"
                                disabled={isSubmiting}
                            >
                                {isSubmiting ? "Loading..." : "Continue"}
                            </button>
                        </div>
                    </form>
                    <h4 className="capitalize my-2 text-gray-500" style={{ fontSize: 11 }}>
                        already have an account?
                        <Link to="/login" className="ml-2 text-sm text-indigo-600 font-bold">Login</Link>
                    </h4>
                    <p className="mt-3 text-gray-500" style={{ fontSize: 10 }}>
                        By Clicking *Continue*, you acknowledge that you have read and accept the <span className="font-bold text-indigo-500">Term of Service</span> and <span className="font-bold text-indigo-500">Policy</span>
                    </p>
                </div>
            </div >
        </div >
    );
}

