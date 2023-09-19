import React from "react";
import FadedText from "./FadedText";

function IntroText(props) {
  return (
    <div className="mt-16">
      <h1 className="text-2xl font-extrabold tracking-wider dark:text-neutral">
        {props.mainText}
      </h1>
      <FadedText text={props.fadedText} />
    </div>
  );
}

export default IntroText;
