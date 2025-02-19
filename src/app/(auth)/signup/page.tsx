"use client";

import { useEffect, useMemo, useState } from "react";

import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import PasswordInput from "@/components/PasswordInputField/PasswordInputField";
import Checkbox from "@/components/Checkbox/Checkbox";
import BgImage from "@/assets/Vortelassets/Backdrop.svg";
import Logo from "@/assets/Vortelassets/LogoBlack_1.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const InitialSignupForm = ({
  onSuccess,
  email,
  setEmail,
  password,
  setPassword,
}: {
  onSuccess: () => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
}) => {
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [facilityNameValue, setFacilityNameValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [termsRead, setTermsRead] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { attemptSignup } = useAuth();

  const canSignUp = useMemo(() => {
    return !!(
      firstNameValue &&
      lastNameValue &&
      email &&
      password &&
      confirmPasswordValue &&
      confirmPasswordValue === password &&
      termsRead
    );
  }, [
    firstNameValue,
    lastNameValue,
    email,
    password,
    confirmPasswordValue,
    termsRead,
  ]);

  const handleSignupButtonClicked = () => {
    attemptSignup(
      email.split("@")[0],
      password,
      email,
      firstNameValue,
      lastNameValue
    )
      .then((res) => {
        console.log("onSuccess function ran");
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("An error occurred while trying to sign up");
      });
  };

  return (
    <div className="flex flex-col w-full md:w-[50%] lg:w-[40%] 2xl:w-[30%] h-full justify-start p-16 z-50">
      <Image src={Logo} alt="4040" height={70} width={70} />
      <div className="flex flex-col h-full justify-center">
        <h3 className="text-3xl font-bold text-left mb-6">Sign up</h3>
        <div className="flex gap-4 my-1">
          <InputField
            inputTitle="First Name"
            isRequired={true}
            value={firstNameValue}
            setValue={setFirstNameValue}
          />
          <InputField
            inputTitle="Last Name"
            isRequired={true}
            value={lastNameValue}
            setValue={setLastNameValue}
          />
        </div>
        <div className="my-1">
          <InputField
            inputTitle="Email"
            isRequired={true}
            value={email}
            setValue={setEmail}
          />
        </div>
        <div className="my-1">
          <PasswordInput
            label="Password"
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className="my-1">
          <PasswordInput
            label="Confirm Password"
            value={confirmPasswordValue}
            setValue={setConfirmPasswordValue}
          />
        </div>
        <div className="my-4">
          <Checkbox
            value={termsRead}
            setValue={setTermsRead}
            label={
              <p>
                I confirm that I have read 4040's{" "}
                <a className="text-brand-blue underline">Terms & Conditions</a>{" "}
                and <a className="text-brand-blue underline">Privacy Policy</a>.
              </p>
            }
          />
        </div>

        <div>
          <div className="mt-6 mb-4">
            <Button
              label="Next"
              onClick={handleSignupButtonClicked}
              disabled={!canSignUp}
            />
          </div>
          <p className="text-left font-semibold text-md">
            Already have an account?{" "}
            <a className="text-brand-blue underline" href="/login">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const VerificationPage = ({
  onSuccess,
  email,
  password,
}: {
  onSuccess: () => void;
  email: string;
  password: string;
}) => {
  const [authLogin] = useAuthLoginCreateMutation();
  const { attemptLogin } = useAuth();

  const checkVerification = () => {
    authLogin({
      profileLoginRequest: { username: email.split("@")[0], password },
    })
      .unwrap()
      .then((res) => {
        attemptLogin(email.split("@")[0], password).then((res) => {
          onSuccess();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="h-full w-full flex flex-col justify-center items-center z-10"
      style={{
        height: "auto",
        minHeight: "93vh",
      }}
    >
      <h3 className="text-3xl font-bold text-left mt-6">Verify Your Email</h3>
      <p className="my-6">
        A verification email has been sent to{" "}
        <span className="text-brand-blue">{email}</span>
      </p>

      <div className="mt-8 w-1/5">
        <Button label="Continue" onClick={checkVerification} />
      </div>
    </div>
  );
};

const AddFacilityPage = () => {
  const router = useRouter();

  return (
    <div
      className="h-full w-full flex flex-col justify-center items-center z-10"
      style={{
        height: "auto",
        minHeight: "93vh",
      }}
    >
      <h3 className="text-3xl font-bold text-left mt-6">Account created!</h3>
      <p className="mt-6">
        To start, we need some basic information about your facility.
      </p>
      <p className="mb-6">
        Let's start by adding the name and address of your facility.
      </p>
      <div className="w-1/5">
        <Button
          label="Add my Facility"
          onClick={() => router.push("/onboarding")}
        />
      </div>
    </div>
  );
};

export default function Signup() {
  // state variables for account verification
  const [showPageIndex, setShowPageIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div className="w-full h-screen flex bg-white relative overflow-hidden z-10">
      <Image
        src={BgImage}
        alt="Background"
        objectFit="cover"
        className="absolute animate-pulse inset-0 z-0 left-auto h-90"
      />
      {showPageIndex === 0 ? (
        <InitialSignupForm
          onSuccess={() => setShowPageIndex(1)}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      ) : showPageIndex === 1 ? (
        <VerificationPage
          onSuccess={() => setShowPageIndex(2)}
          email={email}
          password={password}
        />
      ) : (
        <AddFacilityPage />
      )}
      {/* {!userVerfified && (
        <InitialSignupForm onSuccess={() => setShowPageIndex(1)} />
      )} */}
      {/* {userSignedUp && !userVerfified && (
        <div
          className="h-full w-full flex flex-col justify-center items-center"
          style={{
            height: "auto",
            minHeight: "93vh",
          }}
        >
          <RecessStar width={120} height={120} />
          <h3 className="text-3xl font-bold text-left mt-6">
            Verify Your Email
          </h3>
          <p className="my-6">
            Enter the 6 digit code emailed to "{emailValue}"
          </p>
          <VerificationCode
            value={verficationCodeValue}
            setValue={setVerificationCodeValue}
            length={6}
          />
          <div className="mt-8 w-1/5">
            <Button
              label="Continue"
              onClick={verifyUser}
              disabled={verficationCodeValue.length < 6}
            />
          </div>
        </div>
      )} */}

      {/* {userSignedUp && userVerfified && (
        <div
          className="h-full w-full flex flex-col justify-center items-center"
          style={{
            height: "auto",
            minHeight: "93vh",
          }}
        >
          <RecessStar width={120} height={120} />
          <h3 className="text-3xl font-bold text-left mt-6">
            Account created!
          </h3>
          <p className="mt-6">
            To start, we need some basic information about your facility.
          </p>
          <p className="mb-6">
            Let's start by adding the name and address of your facility.
          </p>
          <div className="w-1/5">
            <Button label="Add my Facility" onClick={addFacility} />
          </div>
        </div>
      )} */}
    </div>
  );
}
