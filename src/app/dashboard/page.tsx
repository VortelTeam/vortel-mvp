"use client";

import { useAuth } from "@/providers/AuthContext";

export default function Dashboard() {
  const { user, isLoading, signOut } = useAuth();

  if (isLoading) {
    return <div className="text-black">Loading...</div>;
  }

  if (!user) {
    return <div className="text-black">Not logged in</div>;
  }

  //console log the current user
  console.log(user);

  return (
    <div className="text-black">
      Welcome {user.firstName}! <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
