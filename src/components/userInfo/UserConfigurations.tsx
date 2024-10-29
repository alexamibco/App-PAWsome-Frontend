import { useState, useEffect } from "react";

interface UserConfigurationsProps {
  name: string;
  lastName: string;
  email: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserConfigurations: React.FC<UserConfigurationsProps> = ({ name, lastName, email, onInputChange }) => {
  const [changeName, setChangeName] = useState<string>(name);
  const [changeLastName, setChangeLastname] = useState<string>(lastName);
  const [changeEmail, setChangeEmail] = useState<string>(email);

  useEffect(() => {
    setChangeName(name);
    setChangeLastname(lastName);
    setChangeEmail(email);
  }, [name, lastName, email]);

  return (
    <div className="flex flex-col md:flex-row mx-auto items-center justify-center bg-white max-w-[342px] p-5">
      <div className="w-full text-left px-4 md:px-10">
        <div className="flex flex-col items-start">
          <div className="grid grid-cols-1 gap-4">
            <div className="font-[500] w-full max-w-[250px] mb-2">
              <label htmlFor="user_name" className="text-lg font-dosis font-semibold text-title">
                My PAWsome Name:
              </label>
              <input
                type="text"
                id="user_name"
                value={changeName}
                className="font-dosis font-[400] border-b outline-none focus:ring-0 focus:border-primary p-1 w-full"
                onChange={(event) => {
                  setChangeName(event.target.value);
                  onInputChange(event);
                }}
              />
            </div>
            <div className="font-[500] w-full max-w-[250px] mb-2">
              <label htmlFor="user_lastname" className="text-lg font-dosis font-semibold text-title">
                And my lastname:
              </label>
              <input
                type="text"
                id="user_lastname"
                value={changeLastName}
                className="font-dosis font-[400] border-b outline-none focus:ring-0 focus:border-primary p-1 w-full"
                onChange={(event) => {
                  setChangeLastname(event.target.value);
                  onInputChange(event);
                }}
              />
            </div>
            <div className="font-[500] w-full max-w-[250px] mb-2">
              <label htmlFor="user_email" className="text-lg font-dosis font-semibold text-title">
                My e-mail:
              </label>
              <input
                type="email"
                id="user_email"
                value={changeEmail}
                className="font-dosis font-[400] border-b outline-none focus:ring-0 focus:border-primary p-1 w-full"
                onChange={(event) => {
                  setChangeEmail(event.target.value);
                  onInputChange(event);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
