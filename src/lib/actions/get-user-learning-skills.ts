import { getUserEmail } from "../utils";
import { sql } from "../db";
import { Skill } from "../models";

export async function getUserLearningSkills(): Promise<Skill[]> {
  const ctxUserEmail = await getUserEmail();
  const user = await sql`SELECT id FROM users WHERE Email = ${ctxUserEmail}`;
  const id = user[0].id;

  const results = await sql`SELECT s.skill_name
                              FROM learning_skills ls
                              JOIN skills s ON ls.skill_id = s.id
                              WHERE ls.user_id = ${id}`;

  return results.map((i) => {
    return {
      name: i.skill_name,
      id: i.id,
    };
  });
}