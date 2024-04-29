import { useClient } from '../../../../lib/useClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  const urlSlug = data?.urlParameter;
  const name = `${data.PEOPLE.P_A_FNAME} + ${data.PEOPLE.P_B_FNAME}`;
  const email = data.PEOPLE.P_A_EMAIL || data.PEOPLE.P_B_EMAIL;
  const phone = data.PEOPLE.P_A_PHONE || data.PEOPLE.P_B_PHONE;
  const archived = data.ADMIN_INFO.ARCHIVED;
  const supabase = useClient();
  const isDev = process.env.NODE_ENV === 'development';

  if (!urlSlug) {
    // const { data: createUserData, error: createUserError } =
    //   await supabase.auth.admin.createUser({
    //     email: data.PEOPLE.P_A_EMAIL || data.PEOPLE.P_B_EMAIL,
    //     email_confirm: true,
    //     password: 'password',
    //   });
    // if (createUserError)
    //   return NextResponse.json({ error: createUserError.message });

    // const { data: inviteData, error: inviteError } =
    //   await supabase.auth.admin.inviteUserByEmail(
    //     data.PEOPLE.P_A_EMAIL || data.PEOPLE.P_B_EMAIL,
    //     {
    //       data: { role: 'client' },
    //     }
    //   );

    if (data.ADMIN_INFO.ROLE == 'styling') {
      const { data: createData, error: createError } =
        await supabase.auth.admin.createUser({
          email: data.PEOPLE.P_A_EMAIL || data.PEOPLE.P_B_EMAIL,
          email_confirm: true,
          password: 'password',
          user_metadata: {
            role: 'stylist',
            name: name,
            email: email,
            phone: phone,
            address: `${data.PEOPLE.P_A_ADD1} ${data.PEOPLE.P_A_ADD2} ${data.PEOPLE.P_A_CITY} ${data.PEOPLE.P_A_STATE} ${data.PEOPLE.P_A_ZIP}`,
            archived: archived,
          },
        });

      // const { data: inviteData, error: inviteError } =
      //   await supabase.auth.admin.inviteUserByEmail(
      //     data.PEOPLE.P_A_EMAIL || data.PEOPLE.P_B_EMAIL,
      //     {
      //       redirectTo: isDev
      //         ? 'http://localhost:3000/'
      //         : 'https://planning.downeystreetevents.com/',
      //     }
      //   );

      const { data: inviteData, error: inviteError } =
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: isDev
            ? 'http://localhost:3000/'
            : 'https://planning.downeystreetevents.com/',
        });

      console.log('inviteData', inviteData);

      if (inviteError) return NextResponse.json({ error: inviteError.message });

      console.log('data', data);

      const { error } = await supabase.from('new_client').insert([
        {
          ...data,
        },
      ]);

      const { data: userInsertData, error: userInsertError } = await supabase
        .from('users')
        .insert([
          {
            name: name,
            email: email,
            phone: phone,
            address: `${data.PEOPLE.P_A_ADD1} ${data.PEOPLE.P_A_ADD2} ${data.PEOPLE.P_A_CITY} ${data.PEOPLE.P_A_STATE} ${data.PEOPLE.P_A_ZIP}`,
            archived: archived,
            role: 'client',
          },
        ]);
      console.log('userInsertData', userInsertData);
      console.log('userInsertError', userInsertError);

      if (userInsertError) return NextResponse.json({ error: userInsertError });

      if (error) return NextResponse.json({ error: error });
      return NextResponse.json({ data: inviteData });
    } else {
      const { data: inviteData, error: inviteError } =
        await supabase.auth.signUp({
          email: data.PEOPLE.P_A_EMAIL || data.PEOPLE.P_B_EMAIL,
          password: 'password',
          options: {
            data: { role: 'client' },
          },
        });
      console.log('inviteData', inviteData);

      if (inviteError) return NextResponse.json({ error: inviteError.message });

      console.log('data', data);

      const { error } = await supabase.from('new_client').insert([
        {
          ...data,
        },
      ]);

      await supabase.from('users').insert([
        {
          name: name,
          email: email,
          phone: phone,
          address: `${data.PEOPLE.P_A_ADD1} ${data.PEOPLE.P_A_ADD2} ${data.PEOPLE.P_A_CITY} ${data.PEOPLE.P_A_STATE} ${data.PEOPLE.P_A_ZIP}`,
          archived: archived,
          role: 'client',
        },
      ]);

      if (error) return NextResponse.json({ error: error });

      return NextResponse.json({ data: inviteData });
    }
  } else {
    const { error } = await supabase
      .from('new_client')
      .update([
        {
          ...data,
          urlParameter: undefined,
        },
      ])
      .eq('SLUG', urlSlug);

    await supabase
      .from('users')
      .update([
        {
          name: name,
          email: email,
          phone: phone,
          address: `${data.PEOPLE.P_A_ADD1} ${data.PEOPLE.P_A_ADD2} ${data.PEOPLE.P_A_CITY} ${data.PEOPLE.P_A_STATE} ${data.PEOPLE.P_A_ZIP}`,
          archived: archived,
          role: 'client',
        },
      ])
      .eq('email', email);
    if (error) return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({ data });
}
