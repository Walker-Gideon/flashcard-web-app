import { Form } from "react-router-dom";
import Input from "../../ui/Input";

export default function LoginForm() {
  const className = {
    input: "w-full",
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
        </div>
      </Form>
    </div>
  );
}
