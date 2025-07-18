import { useEffect, useRef, useState } from "react";
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import Toast from "../../ui/Toast";

export default function AuthPicture() {
  const { setLoading, image, setImage, spinner, setSpinner, toast, setToast } =
    useLoader();
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const handlePopState = (e) => {
      e.preventDefault();

      //   navigate("/accounts/user", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const startLoadingAndNavigate = (to) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(to);
    }, 2000);
  };

  const handleUpload = async () => {
    if (!image) return;
    // Later: upload to Firebase Storage & update user profile
    console.log("Image to upload:", image);

    setSpinner(true);
    setTimeout(() => {
      setSpinner(false);
      setToast(true);

      setTimeout(() => {
        setToast(false);
        navigate("/dashboard");
      }, 1500);
    }, 2000);
  };

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const clascName = "w-full whitespace-nowrap";

  return (
    <div>
      <div className="h-0.5">
        <Loader />
      </div>

      <div className="flex min-h-[95vh] flex-col items-center justify-center">
        {spinner && (
          <div className="absolute top-15 rounded-full border border-gray-300 bg-white p-2 shadow-lg shadow-gray-500">
            <Loader spin={true} />
          </div>
        )}

        <div className="rounded-xl border border-stone-300 px-6 py-8 shadow-lg">
          <div className="medium:w-80 flex w-70 flex-col items-center">
            <h1 className="medium:text-base middle:text-lg mt-2 mb-10 text-center text-sm font-bold">
              Set Up Your Profile Photo
            </h1>

            <label
              className={`cursor-pointer rounded-full bg-stone-400/30 transition-colors duration-300 ${image ? `p-0` : `p-6`}`}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className={`rounded-full object-cover ${image ? `h-35 w-35` : `h-24 w-24`}`}
                />
              ) : (
                <LuUser className="h-24 w-24 text-stone-400/50" />
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <div className="mt-10 flex w-full items-center justify-between gap-8 px-4">
              <Button
                className={clascName}
                onClick={startLoadingAndNavigate("/dashboard")}
              >
                Skip for Now
              </Button>

              {!image && !preview ? (
                <Button
                  variant="primary"
                  className={clascName}
                  onClick={handleButtonClick}
                >
                  Add image
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className={clascName}
                  onClick={handleUpload}
                >
                  Save and Continue
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast className="bg-green-600">Account created successful!</Toast>
      )}
    </div>
  );
}
