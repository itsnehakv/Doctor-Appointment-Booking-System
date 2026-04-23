import "./getstarted.css";
import { SignInButton } from "@clerk/clerk-react";

function GetStarted() {
  return (
    <SignInButton mode="modal">
      <button className="pearl-button">
        <div className="wrap">
          <p>
            <span>✧</span>
            <span>✦</span>
            Book Appointment
          </p>
        </div>
      </button>
    </SignInButton>
  );
}

export default GetStarted;
