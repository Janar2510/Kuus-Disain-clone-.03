import Link from "next/link";
import { footerLinks, studio } from "@/lib/senawa/content";
import { SenawaMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="ft-footer">
      <div className="ft-inner">
        <div className="ft-cta">
          <div className="ft-ctaText">
            <span className="ft-kicker">Start a project</span>
            <Link className="ft-ctaLink" href="/contact">
              <span>Tell us about your site</span>
              <svg
                className="ft-ctaArrow"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 12h15M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <span className="ft-markWrap" aria-hidden="true">
            <SenawaMark width={56} height={56} />
          </span>
        </div>

        <div className="ft-rule" />

        <div className="ft-cols">
          <nav className="ft-col" aria-label="Footer">
            <span className="ft-colLabel">Index</span>
            {footerLinks.map((link) => (
              <Link key={link.href} className="ft-colLink" href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ft-col">
            <span className="ft-colLabel">Studio</span>
            <address className="ft-address">
              {studio.location}
              <br />
              By appointment
            </address>
          </div>

          <div className="ft-col">
            <span className="ft-colLabel">Connect</span>
            <a href={`mailto:${studio.email}`} className="ft-colLink">
              contact.senawastudio
              <wbr />
              @gmail.com
            </a>
            <a href={studio.phoneHref} className="ft-colLink">
              {studio.phone}
            </a>
            <a
              href={studio.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="ft-colLink"
            >
              Instagram
            </a>
          </div>

          <div className="ft-rule" />

          <div className="ft-bottom">
            <span className="ft-fine">© 2026 Senawa Studio</span>
            <span className="ft-fine">Architecture &amp; Interior Design</span>
            <span className="ft-fine">BSD, Tangerang Selatan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
