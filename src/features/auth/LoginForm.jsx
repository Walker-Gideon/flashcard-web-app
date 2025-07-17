import { useState } from "react";
import { Form } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(true);

  const className = {
    input: "w-full",
    icon: "text-sm",
  };

  return (
    <div className="medium:w-80 mt-6 w-70">
      <Form>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          className={className.input}
        />

        <div className="relative my-2">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required={true}
            className={className.input}
          />
          <Button
            variant="outline"
            className="absolute top-2.5 right-2"
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

        <Button type="submit" variant="primary" className="w-full py-2">
          Log in
        </Button>
      </Form>
    </div>
  );
}
