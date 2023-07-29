import { useClient } from '../../../../lib/useClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // log the request body
  const data = await req.json();

  const name = `${data.PEOPLE.P_A_FNAME} + ${data.PEOPLE.P_B_FNAME}`;
  const email = data.PEOPLE.P_A_EMAIL || data.PEOPLE.P_B_EMAIL;
  const phone = data.PEOPLE.P_A_PHONE || data.PEOPLE.P_B_PHONE;
  const archived = data.ADMIN_INFO.ARCHIVED;

  const supabase = useClient();

  console.log('data', data);

  const { error } = await supabase.from('new_client').insert([{ ...data }]);

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

  if (error) return NextResponse.json({ error: error.message });

  return NextResponse.json({ data });
}
