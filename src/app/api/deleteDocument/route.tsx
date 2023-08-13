import { NextResponse } from 'next/server';
import { useClient } from '../../../../lib/useClient';

export async function DELETE(req: Request) {
  const data = await req.json();
  const { id } = data;

  const supabase = useClient();

  const { error } = await supabase.from('documents').delete().eq('id', id);

  if (error) return NextResponse.json([{ error: error.message }]);
  return NextResponse.json({ data });
}
