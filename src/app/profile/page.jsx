'use client'

import { CustomLoading, UserProfile } from "@/components";
import { Suspense } from 'react'

export default function Profile() {
  return (
    <Suspense fallback={<CustomLoading />}>
      <div className="container mx-auto px-4 lg:max-w-5xl">
        <UserProfile />
      </div>
    </Suspense>
  );
}
