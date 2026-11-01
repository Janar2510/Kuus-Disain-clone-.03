import { services, studio } from "@/lib/senawa/content";

export const metadata = {
  title: "Services | Senawa",
  description:
    "Architecture, interior, and furniture design, under one practice. Senawa Studio, Greater Jakarta.",
};

export default function ServicesPage() {
  return (
    <main className="sv-main">
      <div className="container">
        <div className="sv-titleBlock">
          <div className="sv-tbTitle">
            <span className="section-label">Services</span>
            <h1 className="sv-pageTitle">Disciplines</h1>
          </div>
          <div className="sv-tbMeta">
            <div className="sv-tbCell">
              <span className="sv-tbLabel">Count</span>
              <span className="sv-tbValue">03</span>
            </div>
            <div className="sv-tbCell">
              <span className="sv-tbLabel">Scope</span>
              <span className="sv-tbValue">Architecture, Interior, Furniture Design</span>
            </div>
            <div className="sv-tbCell">
              <span className="sv-tbLabel">Location</span>
              <span className="sv-tbValue">Greater Jakarta</span>
            </div>
          </div>
        </div>

        <p className="sv-lede">
          Architecture, interior, and furniture design, under one practice.
        </p>

        <ul className="sv-list">
          {services.map((service, index) => (
            <li
              className={`sv-row${
                index === services.length - 1 ? " sv-rowLast" : ""
              }`}
              key={service.title}
            >
              <div className="sv-rail">
                <span className="sv-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="sv-railLabel">{service.title}</span>
              </div>
              <div className="sv-body">
                <p className="sv-description">{service.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="visually-hidden">Studio: {studio.location}</p>
      </div>
    </main>
  );
}
