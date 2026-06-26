"use client";

import Button from "@/components/Button";
import { useEffect, useState } from "react";

export default function Home() {

    const initialForm = ""

    const [form, setForm] = useState<string>(initialForm);

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
        console.log("HERE")
        const res = await fetch(`http://127.0.0.1:5000/api/route`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                content:form 
            }),
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "LuTex-export.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const updateForm = async (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm(e.target.value);
    }

	return (
        <div className="
            h-full
            flex flex-col
            justify-center
            items-center
        ">
            <h1 style={{ fontFamily: "Computer Modern Serif" }}>
                LuTex
            </h1>
            <form
                className="
                    border border-gray-400 
                    rounded-xl
                    flex flex-col
                    md:w-[50vw] w-full
                    min-w-75
                    md:h-[75vh]
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

        </div>
	);
}
