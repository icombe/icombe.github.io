import styles from "../styles/index.module.scss";

export default function Testimonials() {
  return (
    <section className={styles.testimonialsSectionBg}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Testimonials</h2>
        <p className={styles.sectionParagraph}>
          {<p className={styles.sectionParagraph}>
            Ian was a pleasure to work with. His attention to detail and ability to
            understand our needs made the project a success. Highly recommend!
            - Jane Doe, CEO of Tech Solutions
            </p>}
        </p>
      </div>
    </section>
  );
}
