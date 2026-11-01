import { ContactForm } from "@/components/site/ContactForm";
import { studio } from "@/lib/senawa/content";

export const metadata = {
  title: "Contact | Senawa",
  description:
    "Tell us about your site, how you live, and what you are hoping for. Every note is read by one of us, and we reply within a couple of days.",
};

export default function ContactPage() {
  return (
    <main className="ct-main">
      <div className="container">
        <div className="ct-grid">
          <header className="ct-lead">
            <span className="ct-kicker">Contact</span>
            <h1 className="ct-title">
              Let&rsquo;s start
              <br />
              a conversation.
            </h1>
            <p className="ct-lede">
              Tell us about your site, how you live, and what you are hoping for.
              Every note is read by one of us, and we reply within a couple of
              days.
            </p>
          </header>

          <ContactForm />

          <aside className="ct-details">
            <dl className="ct-detailList">
              <div className="ct-detailBlock">
                <dt className="ct-detailLabel">Studio</dt>
                <dd className="ct-detailValue">
                  <span className="ct-detailLine">{studio.location}</span>
                  <span className="ct-detailLine">By appointment</span>
                </dd>
              </div>
              <div className="ct-detailBlock">
                <dt className="ct-detailLabel">New projects</dt>
                <dd className="ct-detailValue">
                  <a className="ct-detailLink" href={`mailto:${studio.email}`}>
                    {studio.email}
                  </a>
                  <a className="ct-detailLink" href={studio.phoneHref}>
                    {studio.phone}
                  </a>
                </dd>
              </div>
              <div className="ct-detailBlock">
                <dt className="ct-detailLabel">Hours</dt>
                <dd className="ct-detailValue">
                  {studio.hours.map((line) => (
                    <span className="ct-detailLine" key={line}>
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </main>
  );
}
