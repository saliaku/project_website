import React from "react";

const AboutProject = () => (
  <section className="my-8 text-center">
    <h2 className="text-4xl font-bold mb-4">About the Project</h2>
    <p className="text-lg mb-4 text-justify">
      In a world where traditional education systems struggle to cater to the diverse needs of neurodiverse students, our project seeks to create an innovative e-learning framework that prioritizes inclusivity, adaptability, and personalization. By harnessing the power of Machine Learning (ML), this framework aims to provide a dynamic, tailored educational experience for students with varying cognitive abilities and learning styles.
    </p>
    <p className="text-lg mb-4 text-justify">
      The framework is built around three core components: 
      <strong> user profiling</strong>, <strong>instructional content delivery</strong>, and <strong>personalized learning paths</strong>. 
      User profiling involves creating detailed personal profiles for students, assessing their cognitive abilities, learning preferences, and individual strengths. This profile acts as the foundation for designing tailored learning experiences.
    </p>
    <p className="text-lg mb-4 text-justify">
      Instructional content is presented in multimodal formats, including text, video, interactive media, and gamified elements, to address the varied sensory and cognitive needs of students. Learning paths are dynamically generated using Genetic Algorithms (GA), ensuring optimal sequencing of lessons while adhering to dependency relationships between topics using a technique called Layered Topological Sort (LTS).
    </p>
    <p className="text-lg text-justify">
      Ultimately, this project goes beyond traditional education by empowering neurodiverse learners, providing them with the tools they need to succeed in a supportive and inclusive environment. By leveraging ML technologies, the framework ensures that every student receives a customized and engaging learning experience, regardless of geographical limitations or individual challenges.
    </p>
  </section>
);

export default AboutProject;
