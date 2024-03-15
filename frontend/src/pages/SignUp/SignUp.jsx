import { useState } from "react";
import SignUp_stepOne from "./SignUp_stepOne";
import SignUp_stepTwo from "./SignUp_stepTwo";


export default function SignUp() {
  const [step, setStep] = useState(1)
  const [codeVerification, setCodeVerification] = useState(null);
  const [userInfos, setUserInfos] = useState({});

  const handleChangeStep = (e) => {
    setStep(e)
  }

  return (
    <>
      {step == 1 ?
        <SignUp_stepOne onChange={[handleChangeStep, setCodeVerification, setUserInfos]} />
        :
        <SignUp_stepTwo onChange={[handleChangeStep, codeVerification, userInfos]} />
      }
    </>
  );
}
