import { SkillsetForm } from "@/components/skillset-form";
import { getUserLearningSkills } from "@/lib/actions/get-user-learning-skills";
import { getUserTeachingSkills } from "@/lib/actions/get-user-teaching-skills";
import { Separator } from "@radix-ui/react-select";

export default async function Page() {
  const ts = await getUserTeachingSkills();
  const ls = await getUserLearningSkills();

  return (
    <div>
      <h2 className="text-3xl font-semibold">Profile</h2>
      <Separator />
      <SkillsetForm skillsToLearn={ls} skillsToTeach={ts} />
    </div>
  );
}