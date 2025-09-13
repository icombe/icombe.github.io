import React from 'react';
import styles from '../styles/components/VideoHero.module.scss';

type Props = {
  src?: string;
  poster?: string;
  loop?: boolean;
};

const VideoHero: React.FC<Props> = ({
  src = '/assets/media/clue-demo.mp4', // replace with your own file when available
  poster = '/assets/images/clue-thumbnail.jpg',
  loop = true,
}) => {
  return (
    <section className={styles.hero} aria-label="Clue demo video">
      <video
        className={styles.video}
        autoPlay
        muted
        playsInline
        preload="metadata"
        {...(loop ? { loop: true } : {})}
        poster={poster}
      >
        <source
          src={src}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default VideoHero;