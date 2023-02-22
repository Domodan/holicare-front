import React, { useState, useRef } from 'react';
import './OTPForm.css';

function OtpForm() {
  const [otpValues, setOTPValues] = useState(['', '', '', '', '', '']);

  const handleOTPChange = (index, value) => {
    setOTPValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleConfirmClick = () => {
    const otpCode = otpValues.join('');
    console.log('OTP code entered:', otpCode);
  };

  const OTPInput = ({ index, value }) => {
    const inputRef = useRef(null);

    const handleFocus = () => {
      inputRef.current.select();
    };

    const handleChange = (event) => {
      const newValue = event.target.value;
      if (newValue.length > 1) {
        return;
      }
      handleOTPChange(index, newValue);
      if (newValue && index < 5) {
        inputRef.current.nextSibling.focus();
      }
    };

    return (
      <input
        ref={inputRef}
        type="text"
        maxLength={1}
        value={value}
        onFocus={handleFocus}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="OTPForm">
      <div className="OTPForm__input">
        <OTPInput index={0} value={otpValues[0]} />
        <OTPInput index={1} value={otpValues[1]} />
        <OTPInput index={2} value={otpValues[2]} />
        <OTPInput index={3} value={otpValues[3]} />
        <OTPInput index={4} value={otpValues[4]} />
        <OTPInput index={5} value={otpValues[5]} />
      </div>
      <button className="OTPForm__confirm" onClick={handleConfirmClick}>
        Confirm
      </button>
    </div>
  );
}

export default OtpForm;