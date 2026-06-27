"use client";

import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";

type Log = {
    text: string;
    time: string;
};

export default function Home() {

    const initialForm = ""

    const [form, setForm] = useState(initialForm);
    const [messages, setMessages] = useState<Log[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [consoleOpen, setConsoleOpen] = useState(false);

    // Need ref for some reason
    const didInit = useRef(false);
    useEffect(() => {
        
        if (didInit.current) return;
        didInit.current = true;

        const saved = localStorage.getItem("latex-form");
        const example = localStorage.getItem("LuTexExample");
        if (saved) {
            setForm(saved)
            addMessage("Form successfully loaded from memory")
            if (example) {
                addMessage("Example was ignored because a saved form already exists in localStorage.");
                localStorage.removeItem("LuTexExample");
            }

            return;
        }

        if (example) {
            setForm(example)
            addMessage("Example loaded succesfully");
            localStorage.removeItem("LuTexExample");
        };

    }, []);

    useEffect(() => {
        localStorage.setItem("latex-form", form);
    }, [form]);

    const addMessage = (text : string) => {
        setMessages(prev => [
            {
                text: text,
                time: new Date().toLocaleTimeString(),
            },
            ...prev
        ]);
        return;
    };

    // Submit info
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.length){
            addMessage("Empty document: add content before exporting to PDF.")
            return;
        }

        const res = await fetch(`https://api.lucamawyin.com/lutex/api/route`, {
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
            addMessage(lutexMessage)
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== "Tab") return;

        e.preventDefault();
        e.stopPropagation();

        const textarea = e.currentTarget;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const value = form;

        const before = value.slice(0, start);
        const selected = value.slice(start, end);
        const after = value.slice(end);

        const isUnindent = e.shiftKey;

        let delta = 0;

        const transformLine = (line: string) => {
            if (isUnindent) {
                const match = line.match(/^ {1,4}/);
                if (match) {
                    delta -= match[0].length;
                    return line.slice(match[0].length);
                }
                return line;
            } else {
                delta += 4;
                return "    " + line;
            }
        };

        let transformed: string;

        if (start === end) {
            // single line case
            const lineStart = value.lastIndexOf("\n", start - 1) + 1;
            const lineEnd = value.indexOf("\n", start);
            const actualEnd = lineEnd === -1 ? value.length : lineEnd;

            const line = value.slice(lineStart, actualEnd);

            const newLine = transformLine(line);

            transformed =
                value.slice(0, lineStart) +
                newLine +
                value.slice(actualEnd);

            setForm(transformed);

            requestAnimationFrame(() => {
                const el = textareaRef.current;
                if (!el) return;

                el.focus();
                el.selectionStart = start + delta;
                el.selectionEnd = start + delta;
            });

            return;
        }

        const lines = selected.split("\n");

        const newSelected = lines.map(transformLine).join("\n");

        const newValue = before + newSelected + after;

        setForm(newValue);

        requestAnimationFrame(() => {
            const el = textareaRef.current;
            if (!el) return;

            el.focus();
            el.selectionStart = start;
            el.selectionEnd = end + delta;
        });
    };

	return (
        <div className="
            h-full
            flex flex-col
            items-center
        ">

            {/* HEADER */}
            <div className="my-8 text-center">
                <h1 
                    style={{ fontFamily: "Computer Modern Serif" }}
                    
                >
                    LuTex
                </h1>
                <a 
                    href="/documentation" 
                    className="text-md"
                >
                    Documentation
                </a>                
            </div>


            {/* CONTENT WRAPPER */}
            <div
                className="
                    flex 
                    flex-col md:flex-row
                    gap-8
                    w-full
                    max-w-6xl
                    md:h-[75vh] h-full
                    min-h-0
                "
            >
                {/* TEXT AREA */}
                <form
                    className="
                        font-mono

                        border 
                        border-gray-400 
                        rounded-xl

                        flex 
                        flex-col
                        flex-1

                        min-w-75
                        md:min-h-[60vh]
                        min-h-100

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
                        wrap="off"
                        value={form}
                        rows={5}
                        placeholder={"Start writing..."}
                        ref={textareaRef}
                        onChange={updateForm}
                        onKeyDown={handleKeyDown}
                    />
                    <Button
                        text="Download PDF"
                        type="submit"
                    />
                </form>

                {/* CONSOLE */}
                <div className={`
                    bg-gray-50
                    border 
                    border-gray-200
                    rounded-xl

                    md:w-[17.5vw]
                    min-w-75
                    ${consoleOpen ? "min-h-full" : "min-h-0"}

                    flex 
                    flex-col
                    
                    p-4
                    shadow-sm
                `}>
                    {/* HEADER */}
                    <div className="
                        flex 
                        justify-between 
                        items-center
                        mb-3
                        text-gray-700 

                        text-sm
                    ">
                        <h2 className="
                            hidden md:block
                             
                            font-semibold 
                            uppercase 
                            tracking-wide
                        ">
                            Console
                        </h2>
                        <button
                            type="button"
                            className="
                                md:hidden

                                bg-white
                                hover:bg-gray-50

                                border 
                                border-gray-200
                                hover:border-gray-300
                                rounded-md

                                font-semibold
                                uppercase
                                tracking-wide
                                
                                transition-all
                                duration-100

                                cursor-pointer
                                px-3 py-1
                            "
                            onClick={() => setConsoleOpen(open => !open)}
                        >
                            Console {consoleOpen ? "▲" : "▼"}
                            {messages.length > 0 && ` (${messages.length})`}
                        </button>
                        <div
                            className="
                                bg-white
                                hover:bg-gray-50

                                border 
                                border-gray-200
                                hover:border-gray-300
                                rounded-md
                                
                                font-medium

                                transition-all
                                duration-100

                                cursor-pointer
                                px-3 
                                py-1
                            "
                            onClick={() => setMessages([])}
                        >
                            CLEAR
                        </div>              
                    </div>

                    {/* MESSAGES */}
                    <div className={`
                            ${consoleOpen ? "block" : "hidden"}
                            md:block
                            space-y-4 
                            overflow-y-auto 
                            flex-1
                        `}
                    >
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
