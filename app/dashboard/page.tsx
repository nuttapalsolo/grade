'use client';
import { useEffect, useState } from 'react';
import StatCard from '@/components/dashboard/StatCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

export default function DashboardPage(){
  const [students,setStudents]=useState<any[]>([]);
  useEffect(()=>{ fetch('/api/students').then(r=>r.json()).then(setStudents) },[]);
  const total = students.length;
  const classrooms = Array.from(new Set(students.map(s=>s.classroom).filter(Boolean))).length;
  const avg = students.length ? (students.reduce((a,b)=>a + (Number(b.score)||0),0)/students.length).toFixed(1) : '0';
  // data per classroom
  const grouped = {};
  students.forEach(s=>{
    const c = s.classroom||'อื่นๆ';
    if(!grouped[c]) grouped[c]= { classroom:c, total:0, sum:0 };
    grouped[c].total +=1; grouped[c].sum += Number(s.score||0);
  });
  const chartData = Object.values(grouped).map((g:any)=> ({ name:g.classroom, avg: g.total? Math.round(g.sum/g.total):0 }));
  return (
    <div className="space-y-6">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div><h2 className="text-3xl font-bold">แดชบอร์ด</h2><p className="text-muted-foreground">ภาพรวมการจัดการคะแนนและการประเมินผล</p></div>
        <Link href="/students" className="btn">ไปหน้าจัดการนักเรียน</Link>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
        <StatCard title="จำนวนนักเรียนทั้งหมด" value={total} description="ในความดูแล" />
        <StatCard title="จำนวนห้องเรียน" value={classrooms} description="ห้องเรียนที่ลงทะเบียน" />
        <StatCard title="คะแนนเฉลี่ย" value={avg} description="คะแนนเฉลี่ยทั้งหมด" />
        <StatCard title="รายการล่าสุด" value={students.slice(0,1).map(s=>s.name).join(', ')||'-'} description="นักเรียนล่าสุด" />
      </div>

      <div className="card" style={{height:300}}>
        <h3>คะแนนเฉลี่ยตามห้องเรียน</h3>
        <div style={{height:240}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="avg" fill="var(--primary)"/></BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
