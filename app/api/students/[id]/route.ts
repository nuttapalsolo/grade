import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Student } from '@/models/Student';
export async function GET(_:Request,{params}:any){ await connectDB(); const s=await Student.findById(params.id); return NextResponse.json(s); }
export async function PUT(req:Request,{params}:any){ await connectDB(); const data=await req.json(); const u=await Student.findByIdAndUpdate(params.id,data,{new:true}); return NextResponse.json(u); }
export async function DELETE(_:Request,{params}:any){ await connectDB(); await Student.findByIdAndDelete(params.id); return NextResponse.json({message:'deleted'}); }
