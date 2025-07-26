'use client'

import { Skill } from "@/lib/models";
import { SkillInput } from "./skills-input";

interface SkillSetFormProps {
    skillsToLearn: Skill[]
    skillsToTeach: Skill[]
}

export function SkillsetForm(props: SkillSetFormProps) {
  var skillsToLearn: Skill[] = props.skillsToLearn
  var skillsToTeach: Skill[] = props.skillsToTeach

  const onLearnSkillInputChange = (updated: Skill[]) => {
    skillsToLearn = updated;
  };

  const onTeachSkillInputChange = (updated: Skill[]) => {
    skillsToTeach = updated;
  };

  return (
    <form>
      <div>
        <h3 className="text-2xl font-semibold">What can you teach?</h3>
        <SkillInput
          initialSkills={skillsToTeach}
          onChange={onTeachSkillInputChange}
        />
      </div>
      <div>
        <h3 className="text-2xl font-semibold">What do you want to learn?</h3>
        <SkillInput
          initialSkills={skillsToLearn}
          onChange={onLearnSkillInputChange}
        />
      </div>
    </form>
  );
}