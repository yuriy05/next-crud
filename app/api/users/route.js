import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from "fs";

// 1 All user data

export function GET() {
    const data = users
    return NextResponse.json({data}, {status: 200});
}

// 4 Create a new User
export async function POST(req, res) {
    const { id, name, email, password } = await req.json()

    // Check if the data provided
    if (!id || !name || !email || !password) {
        return NextResponse.json(
        {result: "Required field not found"},
        {status: 400})
    } else {
        users.push({id, name, email, password})

        //Extract just a user array from updated data
        const updatedArray = users;

        //Convert the updated users array to a json string
        const updatedData = JSON.stringify(updatedArray, null, 2)

        // Write the updated users array to a JSON string
        fs.writeFileSync("./app/util/db.js",
                         `export const users = ${updatedData};`,
                         "utf-8"
        );

        return NextResponse.json({success: "User successfuly created"})
    }
}

// 5 Update users
export async function PUT(req, res) {
    const { id, name, email, password } = await req.json();

    //Find users in the users array by ID
    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
        return NextResponse.json({result: "Error, user not found"}, {status: 400})
    }

    if (name) {
        users[userIndex].name = name
    }

    if (email) {
        users[userIndex].email = email
    }

    if (password) {
        users[userIndex].password = password
    }

    //Extract just a user array from updated data
    const updatedArray = users;

    //Convert the updated users array to a json string
    const updatedData = JSON.stringify(updatedArray, null, 2)

    // Write the updated users array to a JSON string
    fs.writeFileSync("./app/util/db.js",
                     `export const users = ${updatedData};`,
                     "utf-8"
    );

    return NextResponse.json({success: "User successfuly updated"})
}
