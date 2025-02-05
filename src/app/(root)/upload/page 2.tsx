import UploadClient from '@/components/upload/UploadClient'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

export default async function Upload() {
    const loggedIn = await getLoggedInUser();
    const userId = loggedIn?.id;

    return (
        <UploadClient userId={userId} />
    )
}

