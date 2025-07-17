import { useState } from "react";
import { Form } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Input from "../../ui/Input";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const className = {
    input: "w-full",
    icon: "text-sm",
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
        </div>

        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmpassword"
            placeholder="Confirm Password"
            required={true}
            className={className.input}
          />
        </div>
      </Form>
    </div>
  );
}
