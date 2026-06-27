"use client";

import Button from "@/components/Button";
import { useEffect, useState } from "react";

type Log = {
    text: string;
    time: string;
};

export default function Home() {

    const initialForm = ""

    const [form, setForm] = useState(initialForm);
    const [messages, setMessages] = useState<Log[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("latex-form");

        if (saved) {
            setForm(saved);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("latex-form", form);
    }, [form]);

    // Submit info
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`http://127.0.0.1:5000/api/route`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                content:form 
            }),
        });

        // Get lutex message from header
        const lutexMessage = res.headers.get("lutex-message");
        if (lutexMessage) {
            setMessages(prev => [
                {
                    text: lutexMessage,
                    time: new Date().toLocaleTimeString(),
                },
                ...prev
            ]);
        }

        // Add error messages to console
        if (!res.ok) {
            const errorText = await res.text();

            setMessages(prev => [
                {
                    text: errorText,
                    time: new Date().toLocaleTimeString(),
                },
                ...prev
            ]);
        }

        if (res.ok){
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "LuTex-export.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    };

    const updateForm = async (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm(e.target.value);
    }

	return (
        <div className="
            h-full
            flex flex-col
        ">
            <h1 
                style={{ fontFamily: "Computer Modern Serif" }}
                className="self-center mt-8"
            >
                LuTex
            </h1>
            <a 
                href="/documentation" 
                target="__blank"
                className="
                    self-center 
                    text-md 
                    text-blue-600 
                    mb-8
                "
            >
                Documentation
            </a>
            <div
                className="
                    flex 
                    flex-col md:flex-row
                    gap-4
                    mx-auto
                "
            >
                <form
                    className="
                        border border-gray-400 
                        rounded-xl
                        flex flex-col
                        md:w-[50vw] w-screen
                        min-w-75
                        md:h-[75vh] h-[60vh]
                        p-4
                        gap-8
                    "
                    onSubmit={handleSubmit}
                >
                    <textarea
                        className="
                            border
                            border-gray-200
                            rounded-lg
                            resize-none
                            flex-1
                            p-2
                        "
                        value={form}
                        rows={5}
                        placeholder={"Start writing..."}
                        onChange={updateForm}
                        required
                    />
                    <Button
                        text="Download PDF"
                        type="submit"
                    />
                </form>
                <div className="
                    border border-gray-200
                    bg-gray-50
                    md:w-[20vw]
                    min-w-64
                    rounded-xl
                    p-4
                    shadow-sm
                ">
                    <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                        Console
                    </h2>

                    <div className="space-y-4">
                        { !!messages.length ? (
                            messages.map((message,i) => (
                                <div
                                    key={i} 
                                    className="
                                        text-sm 
                                        text-gray-800 
                                        bg-white border
                                        border-gray-100 
                                        rounded-lg 
                                        p-2
                                    "
                                >
                                    <div className="text-xs text-gray-400 mb-1">
                                        {message.time}
                                    </div>
                                    <div className="text-gray-800 wrap-break-word whitespace-pre-wrap">
                                        {message.text}
                                    </div>
                                </div>                                
                            ))
                        ) : (
                            <p className="text-sm text-gray-400 italic">
                                No messages yet
                            </p>
                        )}
                    </div>
                </div>
            </div>


        </div>
	);
}
