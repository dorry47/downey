import { NextResponse } from 'next/server';
import { useClient } from '../../../../lib/useClient';

export async function DELETE(req: Request) {
  const data = await req.json();

  const supabase = useClient();

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('email', data.email)
    .in('role', ['planner', 'stylist']);

  if (error) return NextResponse.json([{ error: error.message }]);
  return NextResponse.json({ data });
}
