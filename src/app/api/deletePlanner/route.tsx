import { NextResponse } from 'next/server';
import { useClient } from '../../../../lib/useClient';

export async function DELETE(req: Request) {
  const data = await req.json();

  const supabase = useClient();

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('email', data.email)
    .eq('role', 'planner');

  const { error: newPlannerError } = await supabase
    .from('new_planner')
    .delete()
    .eq('plannerEmail', data.email);

  if (error)
    return NextResponse.json([
      { error: error.message },
      { error: newPlannerError?.message },
    ]);
  return NextResponse.json({ data });
}
