import CommonForm from '@/components/common/Form';
import { loginFormControls } from '@/config';
import { loginUser } from '@/store/auth-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const initialFormData = {
    email: "",
    password: "",
};

const AuthLogin = () => {

    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const disableSubmitButton = !formData.email || !formData.password;

    const onSubmit = async (e) => {
        e.preventDefault();

        dispatch(loginUser(formData)).then((data) => {
            if (data.payload?.status === "success") {
                setFormData(initialFormData);
                toast.success(data.payload?.message || "Login successful!", {
                    duration: 3000,
                    position: "top-right",
                });
                navigate('/shop/home');
            } else {
                toast.error(data.payload?.message || "Login failed", {
                    duration: 4000,
                    position: "top-right",
                });
            }
        })
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold tracking-tight text-foreground'>
                    Sign in to your account
                </h1>
                <p className='mt-2'>
                    Don't have an account?{' '}
                    <Link className='font-medium text-primary hover:underline'
                        to={'/auth/register'}
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={loginFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText={"Sign In"}
                disableSubmitButton={disableSubmitButton}
            />
        </div>
    )
}

export default AuthLogin;