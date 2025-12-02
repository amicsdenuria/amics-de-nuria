import { deleteasdf } from '@/actions/delete';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await deleteasdf();

    return new NextResponse('Deleted', { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Failed', { status: 500 });
  }
};
