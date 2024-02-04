"use client";
import { useState } from "react"
import { Input, Button } from "@material-tailwind/react";

const DeleteUser = () => {
    const [id, setId] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            alert("Provide id to delete User")
            return;
        }

        try {
            const res = await fetch(`/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(id)
            })

            if (res.ok) {
                alert("User successfuly deleted");
                clearForm()
            } else {
                const data = await res.json()
                alert(data.result || "Something went wrong while updating user information")
            }
        } catch(e) {
            alert(e.message)
        }

        function clearForm() {
            setId("")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input
                    label="ID"
                    placeholder="Enter the id of user which u want to delete"
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />

                <Button type="submit" className="mt-3">
                    Delete User
                </Button>
            </form>
        </div>
    )
}

export default DeleteUser