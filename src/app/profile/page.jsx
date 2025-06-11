'use client'

import { CustomLoading, UserProfile } from "@/components";
import { Suspense } from 'react'

export default function Profile() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <UserProfile />
    </Suspense>
  );
}
