"use client";

import { useAuth } from "@/providers/AuthContext";
import { useState, useEffect } from "react";
import { DefaultService } from "@/API/generated/services/DefaultService";
import { OpenAPI } from "@/API/generated/core/OpenAPI";

export default function Dashboard() {
  const { user, isLoading, signOut, getIdToken } = useAuth();
  const [files, setFiles] = useState<string[] | null>(null);
  const [isFilesLoading, setIsFilesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && !isLoading && getIdToken) {
      const fetchData = async () => {
        setIsFilesLoading(true);
        setError(null);

        try {
          const token = await getIdToken();
          OpenAPI.TOKEN = token;
          OpenAPI.HEADERS = { Authorization: `Bearer ${token}` };
          console.log("API Base URL:", OpenAPI.BASE);
          console.log("Token set:", token);
          console.log("OpenAPI.TOKEN before request:", OpenAPI.TOKEN);
          console.log("OpenAPI.HEADERS before request:", OpenAPI.HEADERS);

          console.log("Fetching from:", OpenAPI.BASE + "/files");
          const fileList = await DefaultService.getFiles();
          console.log("Raw response:", fileList);

          // Check if fileList is a string (needs parsing) or already an object
          let parsedFiles;
          if (typeof fileList === "string") {
            parsedFiles = JSON.parse(fileList).files || [];
          } else {
            parsedFiles = fileList?.files || []; // Use the files array directly
          }
          setFiles(Array.isArray(parsedFiles) ? parsedFiles : []);
        } catch (err) {
          console.error("Fetch error details:", err);
          if (err instanceof Error) {
            if (err.message === "Failed to fetch") {
              setError(
                "Failed to fetch files - CORS or network issue (check backend CORS config)"
              );
            } else if (err.message.includes("401")) {
              setError(
                "Unauthorized - invalid token or backend auth config issue"
              );
            } else if (err.message.includes("403")) {
              setError("Forbidden - access denied");
            } else if (err.message.includes("404")) {
              setFiles([]); // No files found
            } else {
              setError("Failed to fetch files: " + err.message);
            }
          } else {
            setError("Unknown error occurred");
            setFiles([]);
          }
        } finally {
          setIsFilesLoading(false);
        }
      };

      fetchData();
    }
  }, [user, isLoading, getIdToken]);

  if (isLoading) {
    return <div className="text-black">Loading...</div>;
  }

  if (!user) {
    return <div className="text-black">Not logged in</div>;
  }

  console.log(user);

  return (
    <div className="text-black">
      <div>
        Welcome {user.firstName || user.email || "User"}!{" "}
        <button onClick={signOut}>Sign Out</button>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Your Files</h2>
        {isFilesLoading && <div>Loading files...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!isFilesLoading &&
          !error &&
          files &&
          (files.length > 0 ? (
            <ul className="list-disc pl-5">
              {files.map((file, index) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          ) : (
            <div>No files under user: {user.email}</div>
          ))}
      </div>
    </div>
  );
}
