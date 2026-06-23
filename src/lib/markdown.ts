import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Mission {
  id: string;
  title: string;
  missionNumber: string;
  reward: string;
  difficulty: number;
  techStack: string[];
  demoUrl: string;
  githubUrl: string;
  content: string;
}

export interface Property {
  id: string;
  title: string;
  role: string;
  skills: string;
  status: "COMPLETED" | "ACQUIRED";
  date: string;
  rewardValue: string;
  content: string;
}

const contentDirectory = path.join(process.cwd(), "content");

export function getMissions(): Mission[] {
  const missionsDir = path.join(contentDirectory, "missions");
  if (!fs.existsSync(missionsDir)) {
    return [];
  }
  const filenames = fs.readdirSync(missionsDir);

  const missions = filenames
    .filter((fn) => fn.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(missionsDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: data.id,
        title: data.title,
        missionNumber: data.missionNumber,
        reward: data.reward,
        difficulty: Number(data.difficulty),
        techStack: data.techStack || [],
        demoUrl: data.demoUrl || "",
        githubUrl: data.githubUrl || "",
        content,
      } as Mission;
    });

  // Sort by mission number
  return missions.sort((a, b) => a.missionNumber.localeCompare(b.missionNumber));
}

export function getProperties(): Property[] {
  const propertiesDir = path.join(contentDirectory, "properties");
  if (!fs.existsSync(propertiesDir)) {
    return [];
  }
  const filenames = fs.readdirSync(propertiesDir);

  const properties = filenames
    .filter((fn) => fn.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(propertiesDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: data.id,
        title: data.title,
        role: data.role,
        skills: data.skills,
        status: data.status,
        date: data.date,
        rewardValue: data.rewardValue || "$50,000",
        content,
      } as Property;
    });

  // Sort by date or id
  return properties.sort((a, b) => b.date.localeCompare(a.date));
}
