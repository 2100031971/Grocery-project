import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import Title from "../../components/Title/Title";
import "./register.css";
import { Link } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");

  useEffect(() => {
    if (user) {
      navigate(returnUrl ? returnUrl : "/");
    }
  }, [user, navigate, returnUrl]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    try {
      await auth.register(data);
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="reg-container">
      <div className="details">
        <Title title="Register" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 5,
                message: "Name must be at least 5 characters long",
              },
            })}
            error={errors.name?.message}
          />

          <Input
            type="email"
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                message: "Invalid email format",
              },
            })}
            error={errors.email?.message}
          />

          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters",
              },
            })}
            error={errors.password?.message}
          />

          <Input
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            error={errors.confirmPassword?.message}
          />

          <Input
            type="text"
            label="Address"
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 10,
                message: "Address must be at least 10 characters",
              },
            })}
            error={errors.address?.message}
          />

          <Button type="submit" text="Register" />

          <div className="login">
            Already a user? &nbsp;
            <Link to={`/login${returnUrl ? "?returnUrl=" + returnUrl : ""}`}>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
