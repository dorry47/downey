import { useClient } from '../../../../lib/useClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  console.log('data', data);
  const { email, name, address, phone, archived } = data;

  const supabase = useClient();

  // Invite the user by email
  // const { data: res, error } = await supabase.auth.resetPasswordForEmail(
  //   email,
  //   {
  //     redirectTo: `http://localhost:3000/auth/callback?next=/update-password`,
  //   }
  // );

  const { data: res, error } = await supabase.auth.signUp({
    email: email,
    password: 'password',
    options: {
      emailRedirectTo: `http://localhost:3000/auth/callback?next=/update-password`,
      data: {
        role: 'planner',
      },
    },
  });

  console.log('res', res);

  if (error) {
    console.log('error', error.message);

    const { error: updateError } = await supabase
      .from('users')
      .update([
        {
          name: name,
          address: address,
          phone: phone,
          archived: archived,
        },
      ])
      .eq('email', email);

    if (updateError) return NextResponse.json({ error: updateError.message });

    return NextResponse.json({ data });
  } else {
    console.log('no error');
    const { error } = await supabase.from('users').insert([
      {
        name: name,
        email: email,
        address: address,
        role: 'planner',
        phone: phone,
        archived: archived,
      },
    ]);

    if (error) return NextResponse.json({ error: error.message });
    return NextResponse.json({ data });
  }
}
