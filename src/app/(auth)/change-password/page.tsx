"use client";

import { useState } from "react";
import Button from "@/components/Button/Button";
import PasswordInput from "@/components/PasswordInputField/PasswordInputField";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthContext";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { completeNewPasswordChallenge } = useAuth();

  const handleChangePassword = async () => {
    try {
      await completeNewPasswordChallenge(newPassword);
      router.push("/dashboard");
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to change password");
    }
  };

  return (
    <div className="w-full h-screen flex bg-background relative overflow-hidden">
      <div className="flex flex-col justify-around p-16 m-auto bg-white rounded-lg shadow-lg border border-brand-border">
        <div className="flex flex-col justify-center mt-8">
          <h3 className="text-black text-3xl font-bold text-left mb-6">
            Change Password
          </h3>
          <div className="my-4">
            <PasswordInput
              label="New Password"
              value={newPassword}
              setValue={setNewPassword}
            />
          </div>
          <div className="mt-6 mb-4">
            {errorMessage.length > 0 && (
              <p className="text-red-500">{errorMessage}</p>
            )}
            <Button label="Change Password" onClick={handleChangePassword} />
          </div>
        </div>
      </div>
    </div>
  );
}
