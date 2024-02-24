import { useState } from "react";
import Forget_pwd_S1 from "./Forget_pwd_S1";
import Forget_pwd_S2 from "./Forget_pwd_S2";
import Forget_pwd_S3 from "./Forget_pwd_S3";

export default function Forget_pwd() {
  const [step, setStep] = useState(1);
  const [codeVerification, setCodeVerification] = useState(null);
  const [email, setEmail] = useState('');

  const handleChangeStep = (e) => {
    setStep(e);
  };


  // console.log('code from : ', codeVerification)

  return (
    <div>
      {step == 1 ? (
        <Forget_pwd_S1 onchange={[handleChangeStep, setCodeVerification, setEmail]} />
      ) : step == 2 ? (
        <Forget_pwd_S2 onchange={[handleChangeStep, codeVerification]} />
      ) : (
        <Forget_pwd_S3 onchange={[handleChangeStep, email]} />
      )}
    </div>
  );
}
