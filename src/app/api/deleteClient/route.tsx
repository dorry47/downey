import { NextResponse } from 'next/server';
import { useClient } from '../../../../lib/useClient';

export async function DELETE(req: Request) {
  const data = await req.json();

  const supabase = useClient();

  // my slug looks like this Luna-Taylor i want it to look like Luna2 + Sergio
  const formattedSlug = data.slug.replace('-', ' + ');

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('name', formattedSlug)
    .eq('role', 'client');

  const { error: newClientError } = await supabase
    .from('new_client')
    .delete()
    .eq('SLUG', data.slug);

  if (error)
    return NextResponse.json([
      { error: error.message },
      { error: newClientError?.message },
    ]);
  return NextResponse.json({ data });
}
