import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { processPhases } from "@/lib/senawa/content";

export const metadata = {
  title: "Process | Senawa",
  description:
    "From the first conversation to the day the keys are in your hand. The whole path, set down plainly.",
};

export default function ProcessPage() {
  return (
    <main className="pr-main">
      <header className="container pr-head">
        <span className="pr-eyebrow">Process</span>
        <h1 className="pr-title">How we work</h1>
        <Reveal y={20}>
          <p className="pr-statement">
            From the first conversation to the day the keys are in your hand. The
            whole path, set down plainly.
          </p>
        </Reveal>
      </header>

      <div className="container pr-path">
        {processPhases.map((phase) => (
          <section className="pr-phase" key={phase.phase}>
            <Reveal>
              <div className="pr-phaseHead">
                <span className="pr-phaseLabel pr-tnum">{phase.phase}</span>
                <h2 className="pr-phaseName">{phase.name}</h2>
                <p className="pr-phaseBlurb">{phase.blurb}</p>
              </div>
            </Reveal>

            <div className="pr-steps">
              {phase.steps.map((step) => (
                <Reveal key={step.num} y={20}>
                  <div className="pr-step">
                    <span className="pr-stepNum pr-tnum">{step.num}</span>
                    <div className="pr-stepMain">
                      <h3 className="pr-stepTitle">{step.title}</h3>
                      <p className="pr-stepBody">{step.body}</p>
                      <dl className="pr-stepMeta">
                        <dt className="pr-metaLabel">Your part</dt>
                        <dd className="pr-metaValue">{step.part}</dd>
                      </dl>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        ))}

        <div className="pr-close">
          <p className="pr-closeline">And the keys are yours.</p>
          <Link className="pr-closelink" href="/work">
            See the work →
          </Link>
        </div>
      </div>
    </main>
  );
}
