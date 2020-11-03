import React, { useState } from "react";

const WheelOfFortune = () => {
  const [shouldShowWheel, setShouldShowWheel] = useState(false);
  return (
    <>
      <button
        onClick={() => setShouldShowWheel((currentState) => !currentState)}
      >
        {shouldShowWheel ? "Hide Wheel Of Fortune" : "Show Wheel Of Fortune"}
      </button>
      {shouldShowWheel && (
        <iframe
          src="https://wheeldecide.com/e.php?c1=%2B+1+point+to+your+team&c2=-+1+point+to+your+team&c3=%2B+2+points+to+your+team&c4=%2B+1+point+to+your+team&c5=%2B+1+free+pass&col=pastel&t=Wheel+Of+Fortune&time=5"
          width="500"
          height="500"
          scrolling="no"
          frameborder="0"
          title="Wheel Of Fortune"
        ></iframe>
      )}
    </>
  );
};

export default WheelOfFortune;
