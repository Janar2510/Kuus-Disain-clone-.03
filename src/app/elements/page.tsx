import { ElementsExplorer } from "@/components/site/ElementsExplorer";

export const metadata = {
  title: "Elements | Senawa",
  description: "Elements: an index of architectural details.",
};

export default function ElementsPage() {
  return (
    <main>
      <h1 className="visually-hidden">Elements: An Index of Architectural Details</h1>
      <ElementsExplorer />
    </main>
  );
}
