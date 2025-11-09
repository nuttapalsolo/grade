import Link from 'next/link';
import { LayoutDashboard, Users, FileText, ClipboardList, BarChart3, Settings } from 'lucide-react';
export default function AppSidebar(){
  const menu = [
    {title:'แดชบอร์ด',href:'/dashboard',icon:LayoutDashboard},
    {title:'ข้อมูลนักเรียน',href:'/students',icon:Users},
    {title:'บันทึกคะแนน',href:'/grades',icon:FileText},
    {title:'ประเมินผล',href:'/assessments',icon:ClipboardList},
    {title:'รายงาน',href:'/reports',icon:BarChart3},
    {title:'ตั้งค่า',href:'/settings',icon:Settings},
  ];
  return (
    <div>
      <div style={{fontWeight:700,marginBottom:12}}>Teacher Grade</div>
      <nav style={{display:'grid',gap:8}}>
        {menu.map(m=> (
          <Link key={m.href} href={m.href} className="link" style={{display:'flex',gap:8,alignItems:'center'}}>
            <m.icon/>
            <span>{m.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
