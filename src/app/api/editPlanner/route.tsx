import { useClient } from '../../../../lib/useClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  console.log('data', data);
  const { email, name, address, phone, archived } = data;

  const supabase = useClient();

  // Invite the user by email
  const { data: res, error } = await supabase.auth.admin.inviteUserByEmail(
    email,
    {
      data: { role: 'planner' },
      redirectTo: `http://localhost:3000/auth/callback?next=/update-password`,
    }
  );

  if (error) {
    console.log('error', error.message);
    if (
      error.message ===
      'A user with this email address has already been registered'
    ) {
      const { error } = await supabase
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

      // await supabase
      //   .from('new_planner')
      //   .update([
      //     {
      //       name: name,
      //       email: email,
      //       phone: phone,
      //       address: address,
      //     },
      //   ])
      //   .eq('email', email);

      // const { data: id } = await supabase
      //   .from('auth.users')
      //   .select('id')
      //   .eq('email', email);

      // await supabase
      //   .from('auth.users')
      //   .update({
      //     raw_user_metadata: {
      //       name: name,
      //       email: email,
      //       phone: phone,
      //       address: address,
      //     },
      //   })
      //   .eq('id', id);

      if (error) return NextResponse.json({ error: error.message });

      return NextResponse.json({ data });
    }
  } else {
    // const { error } = await supabase
    //   .from('new_planner')
    //   .insert([{ name: name, email: email, phone: phone, address: address }]);
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

  return NextResponse.json({ res, error });
}
