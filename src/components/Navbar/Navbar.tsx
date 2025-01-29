"use client";

import React from "react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="flex w-full justify-between items-center px-4 h-16">
      <h1 className="font-otomanopee text-brand-brown text-3xl">Vortel</h1>
      <h4 className="text-highlight cursor-default">MVP 1.0</h4>
    </div>
  );
}
