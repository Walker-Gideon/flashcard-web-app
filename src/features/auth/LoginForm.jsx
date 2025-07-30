import { useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const { loading, loginAndSignup } = useAuth();
  const [showPassword, setShowPassword] = useState(true);

  // const actionData = useActionData();

  const stylings = {
    input: "w-full",
    icon: "text-sm",
  };

  return (
    <div className="medium:w-80 mt-6 w-70">
      <Form>
        {/* <Form method="post"> */}
        {/* {actionData?.error && (
          <p className="mb-2 text-sm text-red-600">{actionData.error}</p>
        )} */}

        <Input
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          classname={stylings.input}
        />

        <div className="relative my-2">
          <Input
            type={!showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required={true}
            classname={stylings.input}
          />
          <Button
            variant="outline"
            disabled={loading}
            classname="absolute top-2.5 right-2  disabled:cursor-not-allowed"
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

        <Button
          // disabled={loading}
          type="submit"
          variant="primary"
          classname="w-full py-2 disabled:bg-gray-400 disabled:cursor-not-allowed
"
          onClick={loginAndSignup}
        >
          Log in
        </Button>
      </Form>
    </div>
  );
}
