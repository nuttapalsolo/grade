export default function StatCard({title, value, description}:{title:string,value:string|number,description?:string}){
  return (
    <div className="card">
      <div className="stat">
        <div>
          <div style={{fontSize:12,color:'var(--muted)'}}>{title}</div>
          <div style={{fontSize:20,fontWeight:700}}>{value}</div>
          {description && <div style={{fontSize:12,color:'var(--muted)'}}>{description}</div>}
        </div>
        <div><span className="badge">Live</span></div>
      </div>
    </div>
  )
}
