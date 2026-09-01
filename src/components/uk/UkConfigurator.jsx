'use client';

import { useRef, useState } from 'react';

const UkConfigurator = ({
  src,
  title = '3D Configurator',
  colors = [],
  label = 'Finish',
  messageMode = 'object',
}) => {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef(null);

  const sendColor = (colorId) => {
    const frame = frameRef.current;
    if (!frame || !frame.contentWindow) return;
    if (messageMode === 'raw') {
      frame.contentWindow.postMessage(colorId, '*');
    } else {
      frame.contentWindow.postMessage({ type: 'CHANGE_COLOR', color: colorId }, '*');
    }
  };

  return (
    <div className="uk-configurator-panel">
      <div className="uk-configurator-viewport">
        <div className={`uk-configurator-loading${loaded ? ' uk-hidden' : ''}`}>
          <div className="uk-configurator-spinner" />
        </div>
        <iframe
          ref={frameRef}
          src={src}
          title={title}
          loading="lazy"
          allow="fullscreen"
          onLoad={() => {
            setLoaded(true);
            if (colors[0]) sendColor(colors[0].id);
          }}
        />
      </div>
      {colors.length > 0 && (
        <div className="uk-configurator-footer">
          <div className="uk-configurator-footer-label">
            {label} — <span className="uk-configurator-color-name">{colors[active]?.name}</span>
          </div>
          <div className="uk-configurator-swatch-row">
            {colors.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`uk-config-swatch${i === active ? ' uk-active' : ''}`}
                style={{ background: c.hex }}
                title={c.name}
                aria-label={c.name}
                onClick={() => {
                  setActive(i);
                  sendColor(c.id);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UkConfigurator;
