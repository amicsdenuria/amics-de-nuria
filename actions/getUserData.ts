'use server';

import { currentUser } from '@clerk/nextjs/server';
import { getIsEnrolled } from '@/sanity/lib/subscriber/getIsEnrolled';

interface UserPrivateMeta {
  is_admin?: boolean;
}

export const getUserData = async () => {
  const user = await currentUser();
  const isEnrolled = await getIsEnrolled({ clerkId: user?.id });
  const userMeta: UserPrivateMeta = user?.privateMetadata ?? {};
  const isAdmin = userMeta.is_admin ?? false;

  return { user, isEnrolled, isAdmin };
};
