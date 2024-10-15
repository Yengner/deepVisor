"use client";

import { useFormStatus } from "react-dom";
import Spinner from "./Spinner";

interface SubmitButtonProps {
    className: string
    children: React.ReactNode
    loading?: boolean
}

export default function SubmitButton({className, children, loading}: SubmitButtonProps) {
    const {pending} = useFormStatus();
    return (
    <button className={`flex items-center gap-2 rounded-3xl bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    type="submit"
    disabled={loading ?? pending}
    >
    {children}
    {(loading || pending) && <Spinner className="h-2 w-3"/>}
        </button>
    );
}