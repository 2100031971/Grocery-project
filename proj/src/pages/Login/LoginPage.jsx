import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/input/Input";
import "./login.css";

const LoginPage = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [searchParams] = useSearchParams();
    const returnUrl = searchParams.get("returnUrl") || "/";
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            navigate(returnUrl);
        }
    }, [user, navigate, returnUrl]);

    const submit = async ({ email, password }) => {
        setLoading(true);
        await login(email, password);
        setLoading(false);
    };

    return (
        <div className="login-container">
            <div className="details">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <Input 
                        type="email"
                        label="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[\w-]+@([\w-]+\.)+[\w-]{2,63}$/i,
                                message: "Invalid email address",
                            }
                        })}
                        error={errors.email?.message}
                    />
                    <Input 
                        type="password"
                        label="Password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        error={errors.password?.message}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="toggle-link">
                    New here? <Link to={`/register?returnUrl=${encodeURIComponent(returnUrl)}`}>Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
