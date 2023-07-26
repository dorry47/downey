import { useClient } from '../../../../lib/useClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  console.log('data', data);
  const { email, name } = data;

  const supabase = useClient();

  // Invite the user by email
  const res = await supabase.auth.admin.inviteUserByEmail(email, {
    data: { name: name, email: email, role: 'planner' },
    redirectTo: 'http://localhost:3000/update-password',
  });

  if (res.error) return NextResponse.json({ error: res.error.message });

  const { error } = await supabase.from('new_planner').insert([{ ...data }]);
  await supabase
    .from('users')
    .insert([{ name: name, email: email, role: 'planner' }]);
  if (error) return NextResponse.json({ error: error.message });

  return NextResponse.json({ data });
}
