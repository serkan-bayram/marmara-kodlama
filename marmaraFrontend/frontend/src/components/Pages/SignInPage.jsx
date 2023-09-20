import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alert } from "../Utilities/alert";
import Input from "../Utilities/Input";
import IntroText from "../Utilities/IntroText";
import CustomLink from "../RouteRelated/CustomLink";
import Button from "../Utilities/Button";
import CenteredContainer from "../Utilities/CenteredContainer";
import InputWithShowPassword from "../Utilities/InputWithShowPassword";
import { useValidate } from "../CustomHooks/useValidate";
import { useAuth } from "../Contexts/AuthContext";

function CustomLinkContainer() {
  return (
    <div className="flex w-full justify-between items-center mt-6">
      <CustomLink to="/signup" text="Kayıt Ol" />
      <CustomLink text="Şifremi Unuttum" />
    </div>
  );
}

function Inputs({ setUserInfo, invalid }) {
  const [inputType, setInputType] = useState("password");

  return (
    <>
      <Input
        invalid={invalid}
        setState={setUserInfo}
        inputName="email"
        src="/images/mailIcon.png"
        alt="Mail Icon"
        type="Email"
        placeholder="Email"
      />
      <InputWithShowPassword
        invalid={invalid}
        setState={setUserInfo}
        type={inputType}
        setInputType={setInputType}
      />
    </>
  );
}

function ButtonContainer({ userInfo, validation }) {
  const navigate = useNavigate();
  const { email, password } = userInfo;

  const { login } = useAuth();

  const checkInputs = () => {
    const { checkEmail } = validation;
    return checkEmail(email);
  };

  const handleClick = async () => {
    if (checkInputs()) {
      const token = await login(email, password);
      if (token) {
        // loginden token gelmişse kaydediyoruz ve yönlendiriyoruz
        alert("authenticated");
        localStorage.setItem("auth", token);
        navigate("/feed");
      } else {
        alert("notAuthenticated");
      }
    }
  };

  return (
    <div className="absolute bottom-12 left-0 right-0  w-full flex justify-center items-center ">
      <Button onClickFunction={handleClick} text="Giriş Yap" />
    </div>
  );
}

function SignInPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { invalid, validation } = useValidate();

  return (
    <CenteredContainer paddingTop="pt-32">
      <IntroText
        mainText="Tekrar hoş geldiniz"
        fadedText="Marmara kayıp eşya ağı"
      />
      <Inputs setUserInfo={setUserInfo} invalid={invalid} />
      <CustomLinkContainer />
      <ButtonContainer userInfo={userInfo} validation={validation} />
    </CenteredContainer>
  );
}

export default SignInPage;
