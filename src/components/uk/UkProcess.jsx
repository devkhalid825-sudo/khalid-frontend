const UkProcess = ({ steps = [] }) => (
  <div className="uk-process-container">
    <div className="uk-process-list">
      {steps.map((s, i) => (
        <div key={i} className="uk-process-item">
          <div className="uk-step">{String(i + 1).padStart(2, '0')}</div>
          <div className="uk-process-item-content">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UkProcess;
