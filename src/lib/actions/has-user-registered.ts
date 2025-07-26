'use server'

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // adjust path as needed
import { redirect } from 'next/navigation';


export async function userHasRegistered() {
    const session = await getServerSession(authOptions);
    
    if (!session?.user.id) {
        redirect("/skillset")
    }
}