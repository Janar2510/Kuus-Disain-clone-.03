import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";
import { TeamRoster } from "@/components/site/TeamRoster";

export const metadata = {
  title: "Studio | Senawa",
  description:
    "Senawa is a creative studio working across architecture, interior, and furniture design in BSD, Tangerang Selatan.",
};

export default function StudioPage() {
  return (
    <main className="st-main">
      <header className="container st-lead">
        <p className="st-eyebrow">The Studio</p>
        <h1 className="st-title">
          Inside
          <br />
          the Studio
        </h1>

        <div className="st-leadGrid">
          <Reveal y={20}>
            <div className="st-philosophy">
              <p className="st-philoLead">Satu Nafas dan Satu Nyawa</p>
              <p className="st-philoBody">
                Senawa merupakan studio kreatif yang bergerak dalam bidang
                arsitektur, interior, dan furnitur. Kami mempercayai bahwa ruang
                dan manusia harus berbagi nafas dan nyawa yang sama agar keduanya
                mampu hidup seutuhnya. Dialog di antaranya merupakan pendekatan
                yang menjadi komitmen kami dalam melihat arsitektur secara
                keseluruhan.
              </p>
              <p className="st-philoLead">Karakter, Konteks, dan Komposisi.</p>
              <p className="st-philoBody">
                Senawa is a creative studio working across architecture, interior,
                and furniture design. We believe that space and its inhabitants
                must share the same breath and spirit for both to exist in their
                fullest sense. Neither stands complete without the presence of the
                other. The dialogue between the two defines our approach and shapes
                our commitment to architecture as a whole.
              </p>
              <p className="st-philoLead">Character, Context, and Composition.</p>
            </div>
          </Reveal>

          <div className="st-markWrap" aria-hidden="true">
            <span
              className="st-mark"
              style={{
                display: "block",
                aspectRatio: "407 / 203",
                backgroundColor: "currentColor",
                maskImage: "url(/sites/senawa/studio/mark.png)",
                WebkitMaskImage: "url(/sites/senawa/studio/mark.png)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            />
          </div>
        </div>

        <dl className="st-facts">
          <div className="st-fact">
            <dt>Established</dt>
            <dd>2018</dd>
          </div>
          <div className="st-fact">
            <dt>Location</dt>
            <dd>BSD, Tangerang Selatan</dd>
          </div>
          <div className="st-fact">
            <dt>Discipline</dt>
            <dd>Architecture, Interior, Furniture Design</dd>
          </div>
        </dl>
      </header>

      <section className="container st-section">
        <div className="st-sectionHead">
          <h2 className="st-eyebrow">The Team</h2>
          <p className="st-lede">
            <strong className="st-ledeName">SENAWA</strong> is a multidisciplinary
            design studio driven by a passion for architecture, interiors, and the
            art of living. Our team brings together creative thinkers, designers,
            and project specialists who believe in the power of thoughtful design
            to enrich everyday life.
          </p>
        </div>

        <TeamRoster />
      </section>

      <section className="container st-closing">
        <p className="st-closeStatement">
          An architecture, interior, and furniture studio in Greater Jakarta.
        </p>
        <Link className="st-closeLink" href="/work">
          See the work
        </Link>
      </section>
    </main>
  );
}
