"use client";
import EmailComponent from "./EmailComponent";
import { FormEvent, useEffect, useState } from "react";
import { API_URI } from "../config/constants";
import { Email } from "../types/email";

export default function UserComponent() {
    const [mailData, setMailData] = useState<Email[] | []>([]);

    async function getMails() {
        try {
            const response = await fetch(`${API_URI}/email`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const data = await response.json();

            setMailData(data);
        } catch (e) {
            console.error(e);
        }
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = JSON.stringify(Object.fromEntries(formData));

        try {
            await fetch(`${API_URI}/email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
                credentials: "include",
            });

            global.location.reload();
        } catch (err) {
            return console.error(err);
        }
    }

    useEffect(() => {
        getMails();
    }, []);

    return (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 group" noValidate onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        minLength={6}
                        maxLength={255}
                    />
                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                        Please enter a valid email address
                    </span>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline group-invalid:pointer-events-none group-invalid:opacity-30"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {mailData?.length ? (
                mailData?.map((mail) => {
                    return (
                        <div key={mail.uuid}>
                            <EmailComponent {...mail} />
                        </div>
                    );
                })
            ) : (
                <div className="animate-pulse">Loading...</div>
            )}
        </div>
    );
}
