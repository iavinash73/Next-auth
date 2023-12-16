import User from "@/app/models/User";
import dbConnect from "@/app/utils/dbConnect";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
;
export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();
  await dbConnect();
  const user = await User.findOne({ email: email });
  try {
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 5);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      try {
        await newUser.save();
        return NextResponse.json({ error: 'User created' }, { status: 201 })

      } catch (err: any) {
        return new NextResponse(err.message, {
          status: 500,
        });
      }

    }
    else {
      return NextResponse.json({ error: 'User Already Exists' }, { status: 500 })
    }
  }
  catch (err: any) {
    throw new Error(err);
  }
};