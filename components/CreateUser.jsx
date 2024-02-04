"use client";
import {Button, Input} from "@material-tailwind/react";
import { useState } from "react";

const CreateUser = () => {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!id || !name || !email || !password) {
            alert("Please fill all the input fields");
            return;
        }

        const convertData = JSON.stringify({ id, name, email, password})

        try {
            const res = await fetch("api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: convertData
            })
            
            if (res.ok) {
                alert("User successfuly created")
                return;
            } else {
                alert("Something went wrong :(")
                return;
            }

        } catch(e) {
            alert(e.message)
            return;
        }
    }

    return (
        <div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <Input
                    label="ID"
                    type="text"
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <Input
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button className="mt-5" type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default CreateUser;