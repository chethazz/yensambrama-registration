import { NextResponse } from 'next/server';
import { connectDB } from "@/lib/mongoDB";
import mongoose from "mongoose";
import MemberModel from '@/models/MemberModel';
import RegisterModel from '@/models/registrationModel';
import { NextApiRequest } from 'next';

export async function GET() {
    await connectDB();
    const collection = mongoose.connection.db.collection('event_details');
    const data = await collection.find().toArray();

    return NextResponse.json(data);
}
export async function POST(request: any) {
    try {
        const body = await request.json();
        console.log(body);

        // // Use the actual event ID from the request
        const eventId = body.eventId; // Make sure the request includes eventId
        const eventType = body.eventType; // Get the event type from the request

        // Check if any member of the team is already registered for the event
        for (const memberData of body.members) {
            let existingMember = await MemberModel.findOne({ email: memberData.email });

            if (existingMember) {
                const isUserAlreadyRegistered = await RegisterModel.findOne({
                    members: existingMember._id, // Check if the member is in the members array
                    event: eventId, // Check if the event is already in events array
                });

                if (isUserAlreadyRegistered) {
                    return NextResponse.json({ message: 'One or more members of the team are already registered for this event' }, { status: 400 });
                }
            }
        }

        // Check event type and totalEventsRegistered for members
        if (eventType === 'Open') {
            // The event type is 'Open', so don't increment totalEventsRegistered
        } else {
            for (const memberData of body.members) {
                let existingMember = await MemberModel.findOne({ email: memberData.email });

                if (existingMember) {
                    if (existingMember.totalEventsRegistered && existingMember.totalEventsRegistered >= 3) {
                        return NextResponse.json({ message: 'One or more members of the team have already registered for 3 events' }, { status: 400 });
                    }
                }
            }
        }

        // If no team member is already registered for the event and conditions are met, proceed with registration
        const members = [];
        for (const memberData of body.members) {
            let existingMember = await MemberModel.findOne({ email: memberData.email });

            if (!existingMember) {
                // If the member doesn't exist, create a new member.
                memberData.totalEventsRegistered = 0;
                existingMember = new MemberModel(memberData);
            }

            // Save the member (if needed)
            await existingMember.save();
            members.push(existingMember);

            // Increment the totalEventsRegistered count if the event type is not 'Open'
            if (eventType !== 'Open') {
                existingMember.totalEventsRegistered += 1;
                await existingMember.save();
            }
        }

        const registrationData = {
            team: body.team,
            totalMembers: members.length,
            event: eventId, // Add the event ID to the events array
            members: members.map((member) => member._id), // Save member IDs
        };

        const registration = new RegisterModel(registrationData);
        await registration.save();

        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'error' }, { status: 500 });
    }
}


