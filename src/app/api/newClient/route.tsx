import { useClient } from '../../../../lib/useClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // log the request body
  const data = await req.json();

  const supabase = useClient();

  console.log('data', data);

  const { error } = await supabase.from('new_client').insert([{ ...data }]);

  if (error) return NextResponse.json({ error: error.message });

  return NextResponse.json({ data });
}
