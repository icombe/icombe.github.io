import React, { useRef } from 'react';
import styles from '../styles/components/DownloadSection.module.scss';

export default function DownloadSection(props: {
  id?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const { id, primaryHref, primaryLabel, secondaryHref, secondaryLabel } = props;
  const showSecondary = Boolean(secondaryHref && secondaryLabel);

  // Hidden anchor to preserve native file download behavior
  const primaryAnchorRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <section id={id} className={styles.downloadSection}>
      <div className={styles.inner}>
        <h2 id="download-title">Download</h2>
        <div className={styles.actions}>
          {primaryHref && primaryLabel && (
            <>
              <a
                ref={primaryAnchorRef}
                href={primaryHref}
                download
                aria-hidden="true"
                tabIndex={-1}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={() => primaryAnchorRef.current?.click()}
              >
                {primaryLabel}
              </button>
            </>
          )}
          {showSecondary && (
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => window.open(secondaryHref!, '_blank', 'noopener,noreferrer')}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}