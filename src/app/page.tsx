"use client";
// Importing React
import React, { useState } from "react";
//Importing Components
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { StickyNote } from "@/components/StickyNotes/sticky-note";
import { ReminderCard } from "@/components/ReminderCard/reminder-card";
import { TaskCard } from "@/components/TaskCard/task-card";
import { IntegrationCard } from "@/components/IntegrationCard/integration-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-stretch pb-4 px-4">
        <div className="container pr-0 pl-0 mr-0 ml-0 max-w-full flex">
          <div className="bg-white rounded-[30px] border-gray-300 border shadow-lg overflow-hidden w-full">
            <div className="relative bg-dot-pattern p-8 md:p-0 h-full flex flex-col justify-center">
              <div className="z-1 absolute left-4 top-8 md:left-8 lg:left-16">
                <StickyNote />
              </div>
              {/* <div className="absolute right-4 top-8 md:right-8 lg:right-16">
                <ReminderCard />
              </div> */}
              {/* <div className="absolute left-4 bottom-8 md:left-8 lg:left-16">
                <IntegrationCard />
              </div> */}
              <div className="z-1 absolute right-4 bottom-8 md:right-8 lg:right-16">
                <TaskCard />
              </div>
              <div className="max-w-4xl mx-auto text-center z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black">
                  Simplify Compliance,
                  <span className="block text-brand-secondary">
                    Empower Your Workforce
                  </span>
                </h1>
                <p className="text-xl text-black mb-8">
                  Combining automation, accuracy, and innovation to help you
                  manage compliance and empower your workforce—effortlessly.
                </p>
                <button className="text-black w-full xs:w-auto px-4 py-3 bg-button-bg border-2 border-black rounded-md hover:cursor-pointer hover:bg-highlight ease-in-out duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
