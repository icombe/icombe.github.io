import React from "react";
import styles from "../styles/index.module.scss";

export default function About() {
  return (
    <section id="about" className={styles.sectionBg}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>About Me</h2>

        <p className={styles.sectionParagraph}>
          I’m a software engineer fueled by a genuine curiosity for solving problems and a passion for creating
          experiences that make life just a little bit easier. Ever since I can remember, I’ve been captivated by
          the feeling of building something from scratch; starting with a blank screen and watching it transform into
          an interactive application that people actually use. Whether it’s a streamlined admin dashboard or a clean,
          responsive landing page, I thrive on the challenge of translating ideas into polished, reliable software.
        </p>

        <p className={styles.sectionParagraph}>
          Currently I’m wrapping up my senior year at the Colorado School of Mines, where I’ve built a strong
          foundation in algorithms, data structures, and functional programming. One of the highlights of my academic
          journey was a five-week, college-sponsored field session at Qualcomm. There, I served as Scrum Leader on a
          small Agile team, architecting the FastAPI backend and contributing to a React/TypeScript frontend for an
          internal testing tool. Leading sprint planning, stand-ups, and retrospectives taught me how to blend clear
          communication with technical rigor, which are skills I carry into every project.
        </p>

        <p className={styles.sectionParagraph}>
          Beyond the code, I enjoy fitness, cooking, hiking, and playing videogames. You can often find me at the gym,
          which keeps my mind fresh and reminds me that productivity in software often mirrors productivity in life.
          I’m also passionate about helping others learn, because I believe giving back to my community is as important
          as writing clean code. These experiences shape my approach to development: empathetic, user-focused, and
          always striving for continuous improvement.
        </p>

        <p className={styles.sectionParagraph}>
          As a servant leader, I place a high value on collaboration and mentorship. I enjoy writing clear
          documentation and onboarding guides, not just to make projects easier for teammates, but to build a culture
          where questions are welcomed and learning is part of the process. When I’m not pairing in VS Code or
          debugging RESTful endpoints, I’m probably experimenting with one of my personal projects, refining my skills
          one commit at a time.
        </p>

        <p className={styles.sectionParagraph}>
          I love the intersection of technology and human experience; crafting software that empowers people,
          streamlines workflows, and ultimately makes a positive impact. I’m excited to bring that mindset to new
          challenges, learn from every line of feedback, and continue growing both as an engineer and as a member of
          the communities I serve.
        </p>
      </div>
    </section>
  );
}
