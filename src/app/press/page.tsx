import { studio } from "@/lib/senawa/content";

export const metadata = {
  title: "Press | Senawa",
  description:
    "We are glad to talk with editors and writers about the studio and its work.",
};

export default function PressPage() {
  return (
    <main className="sv-main">
      <div className="container">
        <div className="sv-titleBlock">
          <div className="sv-tbTitle">
            <span className="section-label">Press</span>
            <h1 className="sv-pageTitle">Enquiries</h1>
          </div>
          <div className="sv-tbMeta">
            <div className="sv-tbCell">
              <span className="sv-tbLabel">Contact</span>
              <span className="sv-tbValue">{studio.email}</span>
            </div>
            <div className="sv-tbCell">
              <span className="sv-tbLabel">Studio</span>
              <span className="sv-tbValue">{studio.location}</span>
            </div>
          </div>
        </div>

        <p className="sv-lede">
          We are glad to talk with editors and writers about the studio and its
          work.
        </p>

        <ul className="sv-list">
          <li className="sv-row sv-rowLast">
            <div className="sv-rail">
              <span className="sv-num">01</span>
              <span className="sv-railLabel">Enquiries</span>
            </div>
            <div className="sv-body">
              <p className="sv-description">
                For press and publication enquiries, including images and
                interviews, write to{" "}
                <a href={`mailto:${studio.email}`}>{studio.email}</a>.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}
