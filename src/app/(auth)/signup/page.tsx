"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import PasswordInput from "@/components/PasswordInputField/PasswordInputField";
import Logo from "@/assets/Vortelassets/LogoBlack_1.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthContext";

export default function Signup() {
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [termsRead, setTermsRead] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { signUp } = useAuth();

  const canSignup = useMemo(() => {
    return (
      firstNameValue.length > 0 &&
      lastNameValue.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
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

  const handleSignupButtonClicked = async () => {
    try {
      await signUp({
        email,
        password,
        firstName: firstNameValue,
        lastName: lastNameValue,
      });
      // Redirect to dashboard after successful signup
      router.push("/dashboard");
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to sign up");
    }
  };

  return (
    <div className="w-full h-screen flex bg-background relative overflow-hidden">
      <div className="flex flex-col justify-around p-16 m-auto bg-white rounded-lg shadow-lg border border-brand-border">
        <Image src={Logo} alt="Vortel" height={70} width={70} />
        <div className="flex flex-col justify-center mt-8">
          <h3 className="text-black text-3xl font-bold text-left mb-6">
            Sign up
          </h3>
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
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={termsRead}
                onChange={(e) => setTermsRead(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-black">
                I agree to the terms and conditions
              </span>
            </label>
          </div>
          <div>
            {errorMessage && (
              <p className="text-red-500 mb-4">{errorMessage}</p>
            )}
            <div className="mt-6 mb-4">
              <Button
                label="Sign Up"
                disabled={!canSignup}
                onClick={handleSignupButtonClicked}
              />
            </div>
            <p className="text-left text-black font-semibold text-md">
              Already have an account?{" "}
              <a className="text-brand-brown underline" href="/login">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
