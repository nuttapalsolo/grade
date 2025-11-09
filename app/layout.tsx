import './globals.css';
import { ReactNode } from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
export const metadata = { title: 'Teacher Grade Hub', description: 'ระบบจัดการคะแนน' };
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th"><body>
      <div className="header card"><h1 style={{margin:0}}>ระบบจัดการคะแนนและประเมินผล</h1></div>
      <div className="app">
        <aside className="sidebar"><AppSidebar/></aside>
        <main className="main">{children}</main>
      </div>
    </body></html>
  )
}
