import { PhoneFrame } from "@/components/mf/PhoneFrame";
import { ProfileScreen } from "./screen";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return (
    <PhoneFrame>
      <ProfileScreen username={username} />
    </PhoneFrame>
  );
}

