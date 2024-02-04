"use client"

import { List, ListItem, Card} from "@material-tailwind/react";
import { useEffect, useState } from "react";

const AllUsers = () => {

    const [users, setUsers] = useState("")

    useEffect(() => {
        const fetchAllUsers = async () => {
            const res = await fetch("/api/users")
            const users = await res.json()
            setUsers(users.data)
        };
        fetchAllUsers()
    }, [])

    return (
        <div>
            {users && users.map((item) => (
                <Card key={item.id} className="mb-4">
                    <List>
                        <ListItem>
                            {item.name}
                        </ListItem>
                    </List>
                </Card>
            ))}
        </div>
    )
}

export default AllUsers