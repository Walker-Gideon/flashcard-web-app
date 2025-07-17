import { Form } from "react-router-dom";
import Loader from "../../ui/Loader";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

export default function ForgetAuthPassword() {
  return (
    <div className="relative">
      <div className="h-0.5">
        <Loader />
      </div>

      <div className="flex min-h-[95vh] flex-col items-center justify-center">
        <div className="medium:max-w-3xl px-14">
          <div className="medium:text-base mb-6 text-sm">
            <h1 className="medium:text-2xl middle:text-3xl mt-2 mb-2 text-xl font-bold">
              Reset your password
            </h1>

            <p>
              Enter the email you signed up with. We'll send you a link to log
              in and reset your password. If you signed up with your parent’s
              email, we’ll send them a link.
            </p>
          </div>

          <Form>
            <div className="mb-3 flex flex-col">
              <label className="medium:text-sm mb-1 text-xs">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="user@email.com"
                required={true}
              />
            </div>

            <div className="medium:flex medium:items-end medium:justify-end">
              <Button type="submit" variant="primary" className="w-full py-2">
                Send Link
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
