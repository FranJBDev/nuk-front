import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Order } from "@/models/Orders";

export default async function handle(req, res){
    await mongooseConnect()
    const {user} = await getServerSession(req, res, authOptions)
    const orderDoc = await Order.find({userEmail: user.email})
    res.json(orderDoc)
}