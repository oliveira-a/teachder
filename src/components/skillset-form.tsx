'use client'

import { SkillInput } from "./skills-input";

interface SkillSetFormProps {
    skillsToLearn: string[]
    skillsToTeach: string[]
}

export function SkillsetForm(props: SkillSetFormProps) {
  var skillsToLearn: string[] = props.skillsToLearn
  var skillsToTeach: string[] = props.skillsToTeach

  const onLearnSkillInputChange = (updated: string[]) => {
    skillsToLearn = updated;
  };

  const onTeachSkillInputChange = (updated: string[]) => {
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