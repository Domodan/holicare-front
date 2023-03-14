import React, { useState } from "react";
import "./OTPForm.css";

const OtpForm = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleConfirm = () => {
    const verificationCode = otp.join("");
    // Check if the verification code is correct
    if (verificationCode === "123456") {
      setIsVerified(true);
    } else {
      alert("Incorrect verification code. Please try again.");
      setOtp(["", "", "", "", "", ""]);
    }
  };

  const renderSuccessMessage = () => {
    return (
      <div className="OTPForm__success">
        <p>Verification Successful!</p>
      </div>
    );
  };

  const renderOtpInputs = () => {
    return (
      <div className="OTPForm__input">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="OTPForm__container">
      <div className="OTPForm">
        <div className="OTPForm__logo"></div>
        <div className="OTPForm__rectangle">
          <div className="mt-3">
            <h1>OTP Verification</h1>
          </div>
          <div className="mt-3">
            <p>Enter verification code</p>
          </div>
          {isVerified ? (
            renderSuccessMessage()
          ) : (
            <>
              {renderOtpInputs()}
              <div className="mt-5">
                <button
                  className="OTPForm__confirm"
                  type="button"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpForm;