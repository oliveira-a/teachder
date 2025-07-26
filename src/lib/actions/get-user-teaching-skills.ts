import { getUserEmail } from "../utils";
import { Skill } from "../models";
import { sql } from "../db";

export async function getUserTeachingSkills(): Promise<Skill[]> {
  const ctxUserEmail = await getUserEmail();
  const user = await sql`SELECT id FROM users WHERE Email = ${ctxUserEmail}`;
  const id = user[0].id;

  const results = await sql`SELECT s.skill_name
                              FROM teaching_skills ts
                              JOIN skills s ON ts.skill_id = s.id
                              WHERE ts.user_id = ${id}`;

  return results.map((i) => {
    return {
      name: i.skill_name,
      id: i.id,
    };
  });
}