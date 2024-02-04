"use client"
import {Button, Card, Input, List, ListItem} from "@material-tailwind/react"
import {useState} from "react";

const SpecificUser = () => {
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState(null)

    const fetchUserData = async () => {
        const res = await fetch(`/api/users/${userId}`)

        if (res.ok) {
            const data = await res.json()
            setUserData(data.user)
        } else {
            console.error("Error fetching data")
            setUserData(null)
        }
    }
    return (
        <div>
            <div className="flex">
                <div className="w-72">
                    <Input
                        label="Enter user ID"
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}/>
                </div>
                <Button className="ml-4" onClick={fetchUserData}>
                        Find User
                </Button>
            </div>
            {userData ? (
                        userData.map((item) => (
                            <>
                                <Card className="w-96 mt-5">
                                    <List>
                                        <ListItem>
                                            ID: {item.id}
                                        </ListItem>
                                        <ListItem>
                                            Name: {item.name}
                                        </ListItem>
                                        <ListItem>
                                            Age: {item.age}
                                        </ListItem>
                                        <ListItem>
                                            Email: {item.email}
                                        </ListItem>
                                    </List>
                                </Card>
                            </>
                        ))
                    ) : (
                        <p className="mt-2">Search for a specific user</p>
                    )}
        </div>
    )
}

export default SpecificUser;