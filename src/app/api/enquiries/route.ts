import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { enquirySchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const result = enquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('enquiries')
      .insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        company: result.data.company || null,
        enquiry_type: result.data.enquiry_type,
        subject: result.data.subject || null,
        message: result.data.message,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase enquiry error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to submit enquiry. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data: { id: data.id } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
