import { useState } from "react";
import { Form } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const className = {
    input: "w-full",
    icon: "text-sm",
    button: "absolute top-2.5 right-2",
  };

  return (
    <div className="medium:w-80 mt-6 w-70">
      <Form>
        <div className="flex flex-col">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required={true}
            className={className.input}
          />

          <Input
            type="text"
            name="username"
            placeholder="Username"
            required={true}
            className={`mt-2 ${className.input}`}
          />
        </div>

        <div className="relative my-2">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required={true}
            className={className.input}
          />
          <Button
            variant="outline"
            className={className.button}
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <FiEye className={className.icon} />
            ) : (
              <FiEyeOff className={className.icon} />
            )}
          </Button>
        </div>

        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmpassword"
            placeholder="Confirm Password"
            required={true}
            className={className.input}
          />
          <Button
            variant="outline"
            className={className.button}
            onClick={(e) => {
              e.preventDefault();
              setShowConfirmPassword(!showConfirmPassword);
            }}
          >
            {showConfirmPassword ? (
              <FiEye className={className.icon} />
            ) : (
              <FiEyeOff className={className.icon} />
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}
