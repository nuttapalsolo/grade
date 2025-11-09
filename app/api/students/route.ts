import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Student } from '@/models/Student';
export async function GET(){ await connectDB(); const students=await Student.find().lean(); return NextResponse.json(students); }
export async function POST(req:Request){ await connectDB(); const data=await req.json(); const s=new Student(data); await s.save(); return NextResponse.json(s,{status:201}); }
export async function PUT(req:Request){ await connectDB(); const {id,...rest}=await req.json(); const u=await Student.findByIdAndUpdate(id,rest,{new:true}); return NextResponse.json(u); }
export async function DELETE(req:Request){ await connectDB(); const {id}=await req.json(); await Student.findByIdAndDelete(id); return NextResponse.json({message:'deleted'}); }
