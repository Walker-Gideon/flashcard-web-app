import { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function SignupForm() {
  const { loading } = useAuth();
  const [mail, setMail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("sign up");
  }

  const stylings = {
    input: "w-full",
    icon: "text-sm",
    button: "absolute top-2.5 right-2 disabled:cursor-not-allowed",
  };

  return (
    <div className="medium:w-80 mt-6 w-70">
      <form onSubmit={handleSubmit}>
        {/* <Form method="post"> */}
        {/* {actionData?.error && (
          <p className="mb-2 text-sm text-red-600">{actionData.error}</p>
        )} */}

        <div className="flex flex-col">
          <Input
            type="email"
            name="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Email"
            required={true}
            classname={stylings.input}
          />

          <Input
            type="text"
            name="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            required={true}
            classname={`mt-2 ${stylings.input}`}
          />
        </div>

        <div className="relative my-2">
          <Input
            type={!showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required={true}
            classname={stylings.input}
          />
          <Button
            variant="outline"
            disabled={loading}
            classname={stylings.button}
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <FiEye className={stylings.icon} />
            ) : (
              <FiEyeOff className={stylings.icon} />
            )}
          </Button>
        </div>

        <div className="relative pb-2">
          <Input
            type={!showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required={true}
            classname={stylings.input}
          />
          <Button
            variant="outline"
            disabled={loading}
            classname={stylings.button}
            onClick={(e) => {
              e.preventDefault();
              setShowConfirmPassword(!showConfirmPassword);
            }}
          >
            {showConfirmPassword ? (
              <FiEye className={stylings.icon} />
            ) : (
              <FiEyeOff className={stylings.icon} />
            )}
          </Button>
        </div>

        <Button
          type="submit"
          variant="primary"
          classname="w-full py-2 disabled:bg-gray-400 disabled:cursor-not-allowed
"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}
