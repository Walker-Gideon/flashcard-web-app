import { useState } from "react";
import { Form } from "react-router-dom";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(true);

  const stylings = {
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
          classname={stylings.input}
        />

        <div className="relative my-2">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required={true}
            classname={stylings.input}
          />
          <Button
            variant="outline"
            classname="absolute top-2.5 right-2"
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

        <Button type="submit" variant="primary" classname="w-full py-2">
          Log in
        </Button>
      </Form>
    </div>
  );
}
