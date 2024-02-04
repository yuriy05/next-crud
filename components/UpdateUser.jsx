"use client";
import { useState } from "react";
import {Button, Input} from "@material-tailwind/react";

const UpdateUser = () => {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!id) {
            alert("Please provide user ID");
            return;
        }

        const requestedData = { id };

        if (name) {
            requestedData.name = name
        }

        if (email) {
            requestedData.email = email
        }

        if (password) {
            requestedData.password = password
        }

        try {
            const res = await fetch("api/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestedData)
            })

            if (res.ok) {
                alert("User was successfuly updated")
                clearForm()
            } else {
                const data = await res.json()
                alert(data.result || "Something went wrong while updating user information")
            }
        } catch (e) {
            alert(e.message)
        }

        function clearForm() {
            setId("")
            setName("")
            setEmail("")
            setPassword("")
        }
    }

    return (
        <div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <Input
                    label="ID"
                    type="text"
                    placeholder="Enter a new ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <Input
                    label="Name"
                    type="text"
                    placeholder="Enter a new name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter a new Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter a new Passwrod"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit">
                    Update User
                </Button>
            </form>
        </div>
    )
}

export default UpdateUser;