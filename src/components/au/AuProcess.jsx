const AuProcess = ({ steps = [] }) => (
  <div className="au-process-container">
    <div className="au-process-list">
      {steps.map((s, i) => (
        <div key={i} className="au-process-item">
          <div className="au-step">{String(i + 1).padStart(2, '0')}</div>
          <div className="au-process-item-content">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AuProcess;
