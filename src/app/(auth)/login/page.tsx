"use client";

import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Backdrop from "@/assets/Vortelassets/Backdrop.svg";
import PasswordInput from "@/components/PasswordInputField/PasswordInputField";
import Logo from "@/assets/Vortelassets/LogoBlack_1.svg";
import Image from "next/image";

export default function Login() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const canLogin = useMemo(() => {
    return emailValue.length > 0 && passwordValue.length > 0;
  }, [emailValue, passwordValue]);

  return (
    <div className="w-full h-screen flex bg-background relative overflow-hidden">
      <div className="flex flex-col justify-around p-16 m-auto bg-white rounded-lg shadow-lg border border-brand-border">
        <Image src={Logo} alt="4040" height={70} width={70} />
        <div className="flex flex-col justify-center mt-8">
          <h3 className="text-black text-3xl font-bold text-left mb-6">
            Log in
          </h3>
          <InputField
            inputTitle="Email"
            isRequired={true}
            value={emailValue}
            setValue={setEmailValue}
          />
          <div className="my-4">
            <PasswordInput
              label="Password"
              value={passwordValue}
              setValue={setPasswordValue}
            />
          </div>
          <div className="mt-6 mb-4">
            {errorMessage.length > 0 && (
              <p className="text-red-500">{errorMessage}</p>
            )}
            <Button disabled={!canLogin} label="Log In" onClick={() => {}} />
          </div>
          <p className="text-left text-black font-semibold text-md">
            Want to register your company?{" "}
            <a className="text-brand-brown underline" href="/signup">
              Get started
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
