import { useClient } from '../../../../lib/useClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  const id = body.id;
  const supabase = useClient();

  if (id == undefined || id == null || id == '') {
    const { data, error } = await supabase.from('documents').select('*');
    if (error) return NextResponse.json({ error: error.message });
    return NextResponse.json({ data });
  } else {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id);
    if (error) return NextResponse.json({ error: error.message });
    return NextResponse.json({ data });
  }
}
