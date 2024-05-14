"use client";

import { Email } from "../types/email";

export default function EmailComponent(mail: Email) {
    return (
        <ul className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <li className="py-2">Employee:{mail.email}</li>
            <li className="py-2">
                Content:<p>{mail.content}</p>
            </li>
            <li className="py-2">Status: {String(mail.phishingStatus)}</li>
        </ul>
    );
}
