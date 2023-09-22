import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alert } from "../Utilities/alert";
import Input from "../Utilities/Input";
import IntroText from "../Utilities/IntroText";
import Button from "../Utilities/Button";
import CustomLink from "../RouteRelated/CustomLink";
import CenteredContainer from "../Utilities/CenteredContainer";
import { useValidate } from "../CustomHooks/useValidate";
import { useAuth } from "../Contexts/AuthContext";
import ThemeSwitcher from "../Utilities/ThemeSwitcher";

function Inputs({ setUserInfo, invalid }) {
  return (
    <>
      <Input
        invalid={invalid}
        setState={setUserInfo}
        inputName="personalId"
        imageName="id-card.png"
        darkImageName="id-cardDark.png"
        alt="Id Card icon"
        type="Number"
        placeholder="T.C. Kimlik No"
      />
      <Input
        invalid={invalid}
        setState={setUserInfo}
        inputName="fatherName"
        imageName="user.png"
        darkImageName="userDark.png"
        alt="User Icon"
        type="Text"
        placeholder="Baba Adı"
      />
      <Input
        invalid={invalid}
        setState={setUserInfo}
        inputName="birthDate"
        imageName="calendar.png"
        darkImageName="calendarDark.png"
        alt="Calendar Icon"
        type="Date"
        placeholder="Doğum Tarihiniz"
      />
    </>
  );
}

function CustomLinkContainer() {
  return (
    <div className="flex w-full justify-between items-center mt-6">
      <CustomLink to="/signin" text="Giriş Yap" />
      <CustomLink text="Bu bilgileri neden istiyoruz?" />
    </div>
  );
}

function ButtonContainer({ userInfo, validation }) {
  const navigate = useNavigate();
  const { personalId, fatherName, birthDate } = userInfo;

  const checkInputs = () => {
    const { checkPersonalId, checkFatherName, checkBirthDate } = validation;

    return (
      checkPersonalId(personalId) &&
      checkFatherName(fatherName) &&
      checkBirthDate(birthDate)
    );
  };
  const { signup } = useAuth();

  const handleSignUp = async () => {
    if (checkInputs()) {
      const response = await signup(personalId, fatherName, birthDate);
      if (response) {
        if (response === "alreadySaved") {
          // tamama bastıktan sonra yönlendir.
          alert("alreadySaved");
          navigate("/signin");
          return;
        }
        localStorage.setItem("auth", response);
        alert("authenticated");
        navigate("/createprofile");
      } else {
        alert("notAuthenticated");
      }
    }
  };

  return (
    <div className="absolute bottom-12 left-0 right-0 w-full flex justify-center items-center ">
      <Button onClickFunction={handleSignUp} text="Kayıt Ol" />
    </div>
  );
}

function SignUpPage() {
  const [userInfo, setUserInfo] = useState({
    personalId: "",
    fatherName: "",
    birthDate: "",
  });

  const { invalid, validation } = useValidate();

  return (
    <CenteredContainer paddingTop="pt-32">
      <IntroText mainText="Hoş geldiniz" fadedText="Marmara kayıp eşya ağı" />
      <Inputs setUserInfo={setUserInfo} invalid={invalid} />
      <CustomLinkContainer />
      <div className="absolute bottom-12 z-50">
        <ThemeSwitcher />
      </div>
      <ButtonContainer userInfo={userInfo} validation={validation} />
    </CenteredContainer>
  );
}

export default SignUpPage;
