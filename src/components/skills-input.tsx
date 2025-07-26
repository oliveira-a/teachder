'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Skill } from '@/lib/models';

export function SkillInput({
  onChange,
  initialSkills = [],
}: {
  onChange?: (skills: Skill[]) => void;
  initialSkills?: Skill[];
}) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [inputValue, setInputValue] = useState('');

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || skills.map(i => i.name).includes(trimmed)) return;

    const updated = [...skills, { name: trimmed }];
    setSkills(updated);
    onChange?.(updated);
    setInputValue('');
  };

  const removeSkill = (skill: string) => {
    const updated = skills.filter((s) => s.name !== skill);
    setSkills(updated);
    onChange?.(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(inputValue);
    }
    if (e.key === 'Backspace' && !inputValue && skills.length) {
      removeSkill(skills[skills.length - 1].name);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge
            key={skill.name}
            variant="secondary"
            className="flex items-center gap-1 pr-1"
          >
            {skill.name}
            <button
              type="button"
              onClick={() => removeSkill(skill.name)}
              className="hover:text-red-500 ml-1"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        placeholder="Type a skill and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
