import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    id: "ai-ml",
    label: "AI / ML",
    skills: [
      { name: "PyTorch", icon: "devicon-pytorch-plain", level: "expert" },
      { name: "TensorFlow", icon: "devicon-tensorflow-original", level: "advanced" },
      { name: "Keras", icon: "devicon-keras-plain", level: "advanced" },
      { name: "Hugging Face", icon: "devicon-huggingface-plain", level: "advanced", isDarkIcon: true },
      { name: "MediaPipe", icon: "devicon-google-plain", level: "advanced" },
      { name: "OpenCV", icon: "devicon-opencv-plain", level: "advanced" },
    ],
  },
  {
    id: "full-stack",
    label: "Full-Stack Development",
    skills: [
      { name: "React", icon: "devicon-react-original", level: "expert" },
      { name: "Next.js", icon: "devicon-nextjs-original", level: "expert", isDarkIcon: true },
      { name: "Flutter", icon: "devicon-flutter-plain", level: "advanced" },
      { name: "Dart", icon: "devicon-dart-plain", level: "advanced" },
      { name: "FastAPI", icon: "devicon-fastapi-plain", level: "expert" },
      { name: "Flask", icon: "devicon-flask-original", level: "advanced", isDarkIcon: true },
      { name: "TailwindCSS", icon: "devicon-tailwindcss-plain", level: "expert" },
    ],
  },
  {
    id: "data-infra",
    label: "Data & Infrastructure",
    skills: [
      { name: "MongoDB Atlas", icon: "devicon-mongodb-plain", level: "expert" },
      { name: "MySQL", icon: "devicon-mysql-plain", level: "advanced" },
      { name: "Docker", icon: "devicon-docker-plain", level: "advanced" },
      { name: "AWS", icon: "devicon-amazonwebservices-original", level: "intermediate" },
      { name: "Git", icon: "devicon-git-plain", level: "expert" },
      { name: "Vercel", icon: "devicon-vercel-original", level: "expert", isDarkIcon: true },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "Python", icon: "devicon-python-plain", level: "expert" },
      { name: "TypeScript", icon: "devicon-typescript-plain", level: "expert" },
      { name: "JavaScript", icon: "devicon-javascript-plain", level: "expert" },
      { name: "Java", icon: "devicon-java-plain", level: "advanced" },
      { name: "C", icon: "devicon-c-plain", level: "advanced" },
    ],
  },
];
