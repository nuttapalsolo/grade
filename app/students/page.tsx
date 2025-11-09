'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
interface Student{_id?:string;name:string;age:number;grade:string;classroom?:string;email?:string;score?:number}
export default function StudentsPage(){
  const [students,setStudents]=useState<Student[]>([]);
  const [form,setForm]=useState<Partial<Student>>({name:'',age:0,grade:''});
  const [editing,setEditing]=useState<string|undefined>(undefined);
  async function fetchStudents(){ const r=await fetch('/api/students'); setStudents(await r.json()); }
  useEffect(()=>{fetchStudents()},[]);
  async function submit(e:any){
    e.preventDefault();
    if(editing){
      await fetch('/api/students',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:editing,...form})});
      setEditing(undefined);
    }else{
      await fetch('/api/students',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    }
    setForm({name:'',age:0,grade:''}); fetchStudents();
  }
  async function del(id?:string){ if(!id) return; if(!confirm('ลบใช่หรือไม่?')) return; await fetch('/api/students',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})}); fetchStudents(); }
  function edit(s:Student){ setEditing(s._id); setForm({name:s.name,age:s.age,grade:s.grade,classroom:s.classroom,email:s.email,score:s.score}); }
  return (
    <div className="space-y-6">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h2 className="text-3xl font-bold">ข้อมูลนักเรียน</h2>
          <p className="text-muted-foreground">จัดการข้อมูลนักเรียนในความดูแล</p>
        </div>
        <Link href="/dashboard" className="link">กลับไปแดชบอร์ด</Link>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
        <div className="card">
          <h3>เพิ่ม / แก้ไขนักเรียน</h3>
          <form onSubmit={submit} className="space-y-2">
            <input className="form-input" placeholder="ชื่อ" value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})} required />
            <input className="form-input" placeholder="อายุ" type="number" value={form.age||0} onChange={e=>setForm({...form,age:+e.target.value})} required />
            <input className="form-input" placeholder="เกรด" value={form.grade||''} onChange={e=>setForm({...form,grade:e.target.value})} required />
            <input className="form-input" placeholder="ห้อง" value={form.classroom||''} onChange={e=>setForm({...form,classroom:e.target.value})} />
            <input className="form-input" placeholder="อีเมล" value={form.email||''} onChange={e=>setForm({...form,email:e.target.value})} />
            <div style={{display:'flex',gap:8}}>
              <button className="btn" type="submit">{editing ? 'บันทึก' : 'เพิ่มนักเรียน'}</button>
              {editing && <button type="button" onClick={()=>{setEditing(undefined); setForm({name:'',age:0,grade:''})}} className="px-3 py-2 border rounded">ยกเลิก</button>}
            </div>
          </form>
        </div>

        <div className="card">
          <h3>รายการนักเรียน</h3>
          <div style={{overflow:'auto'}}>
            <table className="table">
              <thead><tr><th>ชื่อ</th><th>อายุ</th><th>เกรด</th><th>ห้อง</th><th>คะแนน</th><th>จัดการ</th></tr></thead>
              <tbody>
                {students.map(s=>(
                  <tr key={s._id}>
                    <td>{s.name}</td><td>{s.age}</td><td>{s.grade}</td><td>{s.classroom}</td><td>{s.score||0}</td>
                    <td><div style={{display:'flex',gap:8}}><button onClick={()=>edit(s)} className="px-2 py-1 border rounded">แก้ไข</button><button onClick={()=>del(s._id)} className="px-2 py-1 bg-red-500 text-white rounded">ลบ</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
