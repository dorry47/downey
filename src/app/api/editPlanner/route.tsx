import { useClient } from '../../../../lib/useClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, name } = await req.json();
  console.log('email', email);

  const supabase = useClient();

  // Invite the user by email
  const res = await supabase.auth.admin.inviteUserByEmail(email);

  if (res.error) return NextResponse.json({ error: res.error.message });

  const data = res.data;

  const { data: insertedData, error: insertError } = await supabase
    .from('users')
    .insert([{ id: data.user.id, name, email: data.user.email }]);

  if (insertError) return NextResponse.json({ error: insertError.message });

  return NextResponse.json({ data, insertedData });
}
