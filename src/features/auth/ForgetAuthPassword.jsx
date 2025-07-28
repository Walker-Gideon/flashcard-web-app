import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLoader } from "../../context/LoaderContext";
import Loader from "../../ui/Loader";
import Button from "../../ui/Button";
import Toast from "../../ui/Toast";

export default function ForgetAuthPassword() {
  const { setLoading } = useLoader();
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const emailRef = useRef(null);

  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        setToastMessage(actionData.message);
        setToastType("success");
        setToast(true);

        setTimeout(() => {
          setToast(false);
          navigate("/accounts/login");
        }, 3000);
      } else if (actionData.error) {
        // Show error toast
        setToastMessage(actionData.error);
        setToastType("error");
        setToast(true);

        // Hide error toast after 3 seconds
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }
    }
  }, [actionData, navigate]);

  // Handle loading state
  useEffect(() => {
    setLoading(isSubmitting);
  }, [isSubmitting, setLoading]);

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

          <Form method="post">
            <div className="mb-3 flex flex-col">
              <label className="medium:text-sm mb-1 text-xs">Email</label>
              <input
                type="email"
                name="email"
                placeholder="user@email.com"
                required={true}
                ref={emailRef}
                disabled={isSubmitting}
                className="input w-full disabled:opacity-50"
              />
            </div>

            <div className="medium:flex medium:items-end medium:justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                classname="w-full py-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                // onClick={() => startLoadingAndNavigate("/accounts/login")}
              >
                {isSubmitting ? "Sending..." : "Send Link"}
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {toast && (
        <Toast
          classname={toastType === "success" ? "bg-green-600" : "bg-red-600"}
        >
          {toastMessage}
        </Toast>
      )}
    </div>
  );
}
