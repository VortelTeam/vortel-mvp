"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { AuthContextType, User } from "../types/auth";

const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;

if (!userPoolId || !clientId) {
  throw new Error(
    "Missing environment variables: NEXT_PUBLIC_COGNITO_USER_POOL_ID and/or NEXT_PUBLIC_COGNITO_CLIENT_ID"
  );
}

const poolData = {
  UserPoolId: userPoolId,
  ClientId: clientId,
};

const userPool = new CognitoUserPool(poolData);

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err: any, session: any) => {
          if (err) {
            console.error("Session error:", err);
            setUser(null);
            setIsLoading(false); // Set isLoading to false on error
            return;
          }

          if (session.isValid()) {
            cognitoUser.getUserAttributes((err, attributes) => {
              if (err) {
                console.error("Error fetching user attributes:", err);
                setUser(null);
                setIsLoading(false); // Set isLoading to false on error
                return;
              }

              const userAttributes = attributes?.reduce((acc: any, attr) => {
                acc[attr.getName()] = attr.getValue();
                return acc;
              }, {});

              setUser({
                email: userAttributes.email,
                firstName: userAttributes.given_name,
                lastName: userAttributes.family_name,
                sub: userAttributes.sub,
              });
              setIsLoading(false); // Set isLoading to false on success
            });
          } else {
            setUser(null);
            setIsLoading(false); // Set isLoading to false if session is invalid
          }
        });
      } else {
        setUser(null);
        setIsLoading(false); // Set isLoading to false if no user is found
      }
    } catch (error) {
      console.error("Auth status check error:", error);
      setUser(null);
      setIsLoading(false); // Set isLoading to false on error
    }
  };

  // Future implementation of confirmation code verification
  /* 
  const confirmSignUp = async (email: string, code: string) => {
    return new Promise<void>((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  };

  const resendConfirmationCode = async (email: string) => {
    return new Promise<void>((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  };
  */

  const signIn = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              reject(err);
              return;
            }
            const userAttributes = attributes?.reduce((acc: any, attr) => {
              acc[attr.getName()] = attr.getValue();
              return acc;
            }, {});

            setUser({
              email: userAttributes.email,
              firstName: userAttributes.given_name,
              lastName: userAttributes.family_name,
              sub: userAttributes.sub,
            });
            resolve();
          });
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // Store the CognitoUser object for later use
          setCognitoUser(cognitoUser);
          reject(new Error("newPasswordRequired"));
        },
      });
    });
  };

  const completeNewPasswordChallenge = async (newPassword: string) => {
    return new Promise<void>((resolve, reject) => {
      if (!cognitoUser) {
        reject(new Error("No user found"));
        return;
      }

      cognitoUser.completeNewPasswordChallenge(
        newPassword,
        {},
        {
          onSuccess: (result) => {
            // After successfully changing the password, update the user session
            cognitoUser.getSession((err: any, session: any) => {
              if (err) {
                reject(err);
                return;
              }
              if (session.isValid()) {
                cognitoUser.getUserAttributes((err, attributes) => {
                  if (err) {
                    reject(err);
                    return;
                  }
                  const userAttributes = attributes?.reduce(
                    (acc: any, attr) => {
                      acc[attr.getName()] = attr.getValue();
                      return acc;
                    },
                    {}
                  );

                  setUser({
                    email: userAttributes.email,
                    firstName: userAttributes.given_name,
                    lastName: userAttributes.family_name,
                    sub: userAttributes.sub,
                  });
                  resolve();
                });
              }
            });
          },
          onFailure: (err) => {
            reject(err);
          },
        }
      );
    });
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    return new Promise<void>((resolve, reject) => {
      const attributeList = [
        new CognitoUserAttribute({ Name: "email", Value: userData.email }),
        new CognitoUserAttribute({
          Name: "given_name",
          Value: userData.firstName,
        }),
        new CognitoUserAttribute({
          Name: "family_name",
          Value: userData.lastName,
        }),
      ];

      userPool.signUp(
        userData.email,
        userData.password,
        attributeList,
        [],
        async (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          if (result) {
            // For MVP: Auto-login after signup
            try {
              await signIn(userData.email, userData.password);
              resolve();
            } catch (signInError) {
              reject(signInError);
            }

            /* Future implementation with email verification
            // Redirect to confirmation page
            router.push(`/confirm?email=${userData.email}`);
            resolve();
            */
          }
        }
      );
    });
  };

  const signOut = async () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        completeNewPasswordChallenge,
        // Future confirmation methods
        // confirmSignUp,
        // resendConfirmationCode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/* Future types to add to AuthContextType when implementing confirmation
export interface AuthContextType {
  // ... existing types ...
  confirmSignUp: (email: string, code: string) => Promise<void>;
  resendConfirmationCode: (email: string) => Promise<void>;
}
*/
