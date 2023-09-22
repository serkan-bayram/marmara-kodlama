import React, { useEffect, useState } from "react";
import { useTheme } from "../Contexts/ThemeContext";
import Image from "./Image";

function Input({
  setState,
  inputName,
  imageName,
  darkImageName,
  alt,
  type,
  placeholder,
  invalid,
}) {
  const styles = {
    background: "none",
    width: "100%",
    // color: theme === "dark" ? "#10141A" : "white",
  };

  const handleOnChange = (e) => {
    setState((prevValue) => ({
      ...prevValue,
      [inputName]: e.target.value,
    }));
  };

  // createdeclaration da textarea kullandığımız için burası baya karıştı
  // biraz daha sadeleştirmeye çalışabiliriz.

  // shake animasyonunu hangi inputa ekleyeceğimizi belirlemek için
  // invalid.inputName'i gönderiyoruz props olarak
  // invalid.value useValidate sayfasında true veya false olarak belirleniyor
  return (
    <>
      <div
        className={`
        
        ${
          invalid.inputName === inputName && invalid.value && "animate-shake"
        } ${
          type !== "textarea"
            ? "mt-12 w-full flex border-2 border-b-slate-300 dark:border-b-darkPrimary border-x-0 border-t-0 p-2 pl-0"
            : "mt-12 w-full border-2 border-slate-300 dark:border-darkPrimary rounded-md p-2 "
        } `}
      >
        {type !== "textarea" ? (
          <>
            <Image
              className="w-6 h-6"
              imageName={imageName}
              darkImageName={darkImageName}
              alt={alt}
            />
            <input
              onChange={handleOnChange}
              className="pl-2 w-3/4 outline-0 border-0 bg-transparent dark:text-neutral"
              style={type === "Date" ? styles : {}}
              type={type}
              placeholder={placeholder}
              required
            />
          </>
        ) : (
          <textarea
            className="w-full resize-none outline-0 border-0 bg-transparent dark:text-neutral"
            onChange={handleOnChange}
            type={type}
            rows="10"
            placeholder={placeholder}
            required
          />
        )}
      </div>
      <span className="text-xs text-red-500">
        {invalid.inputName === inputName && invalid?.message}
      </span>
    </>
  );
}

export default Input;
