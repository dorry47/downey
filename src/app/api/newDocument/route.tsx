import { useClient } from '../../../../lib/useClient';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  const documentID = data?.urlParameter;

  const supabase = useClient();

  if (!documentID) {
    const { error } = await supabase.from('documents').insert([
      {
        ...data,
      },
    ]);

    if (error) return NextResponse.json({ error: error.message });
  } else {
    const { error } = await supabase
      .from('documents')
      .update([
        {
          ...data,
          urlParameter: undefined,
        },
      ])
      .eq('id', documentID);

    if (error) return NextResponse.json({ error: error.message });
  }

  return NextResponse.json({ data });
}
