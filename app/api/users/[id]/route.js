import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from "fs";

// Filter user by id

export async function GET(_, res) {
    const {id} = await res.params
    const user = users.filter((user) => (
        user.id === id
    ))
    return NextResponse.json({ user })
}

// 3 Login 

export async function POST(req, res) {
    const {name, email, password} = await req.json()

    const { id } = await res.params

    const { name: userName,
            email: userEmail,
            password: userPassword
          } = users.find((user) => user.id === id)

    if ( userName === name && userEmail === email && userPassword === password) {
        return NextResponse.json({result: "User successfuly logged in"})
    } else if (!name || !email || !password) {
        return NextResponse.json({result: "Pease all fields"})
    } else {
        return NextResponse.json({result: "Invalid users credentials"})
    }         
}

// Delete user
export async function DELETE(req, res) {
    const { id } = await res.params

    //Find the index of user to delete in the users array
    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
        return NextResponse.json({result: "User not found"}, {status: 400})
    }

    //Remove the user from users array
    users.splice(userIndex, 1)

    //Extract just a user array from updated data
    const updatedArray = users;

    //Convert the updated users array to a json string
    const updatedData = JSON.stringify(updatedArray, null, 2)

    // Write the updated users array to a JSON string
    fs.writeFileSync("./app/util/db.js",
                     `export const users = ${updatedData};`,
                     "utf-8"
    );

    return NextResponse.json({success: "User successfuly deleted"})
}