import { WorkGrid } from "@/components/site/WorkGrid";

export const metadata = {
  title: "Work | Senawa",
  description:
    "Selected architecture and interior projects by Senawa Studio in Jakarta, Tangerang, Depok, Bogor and Bali.",
};

export default function WorkPage() {
  return (
    <main>
      <WorkGrid />
    </main>
  );
}
