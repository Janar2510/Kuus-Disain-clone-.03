"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CustomSelect } from "./CustomSelect";
import { faqs, selectOptions, studio } from "@/lib/senawa/content";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setSent(true);
    }, 600);
  };

  return (
    <div className="ct-formWrap">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            className="ct-success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="ct-successLabel">Enquiry received</span>
            <p className="ct-successMessage">Thank you. We will be in touch.</p>
            <p className="ct-successSub">
              Every note is read personally by one of us, and we reply within a
              couple of days.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="ct-form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="ct-formNote">Name, email and a few words are required.</p>

            <div className="ct-pair">
              <div className="ct-field">
                <label className="ct-fieldLabel" htmlFor="name">
                  Name <span className="ct-requiredMark">*</span>
                </label>
                <input
                  className="ct-input"
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                />
              </div>
              <div className="ct-field">
                <label className="ct-fieldLabel" htmlFor="email">
                  Email <span className="ct-requiredMark">*</span>
                </label>
                <input
                  className="ct-input"
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="ct-group">
              <p className="ct-groupNote">About the project (optional)</p>

              <div className="ct-pair">
                <div className="ct-field">
                  <label className="ct-fieldLabel" id="property-label">
                    Property type
                  </label>
                  <CustomSelect
                    label="Property type"
                    name="propertyType"
                    options={selectOptions.propertyType}
                  />
                </div>
                <div className="ct-field">
                  <label className="ct-fieldLabel" id="scope-label">
                    Scope
                  </label>
                  <CustomSelect
                    label="Scope"
                    name="scope"
                    options={selectOptions.scope}
                  />
                </div>
              </div>

              <div className="ct-pair">
                <div className="ct-field">
                  <label className="ct-fieldLabel" htmlFor="location">
                    Location
                  </label>
                  <input className="ct-input" id="location" name="location" type="text" />
                </div>
                <div className="ct-field">
                  <label className="ct-fieldLabel" htmlFor="size">
                    Approx. size (m²)
                  </label>
                  <input className="ct-input" id="size" name="size" type="text" />
                </div>
              </div>

              <div className="ct-pair">
                <div className="ct-field">
                  <label className="ct-fieldLabel" htmlFor="timeline">
                    Timeline
                  </label>
                  <input className="ct-input" id="timeline" name="timeline" type="text" />
                </div>
                <div className="ct-field">
                  <label className="ct-fieldLabel">Budget range</label>
                  <CustomSelect
                    label="Budget range"
                    name="budget"
                    options={selectOptions.budget}
                  />
                </div>
              </div>
            </div>

            <div className="ct-field">
              <label className="ct-fieldLabel" htmlFor="vision">
                Your vision <span className="ct-requiredMark">*</span>
              </label>
              <p className="ct-fieldHint">
                The mood, how you live, any references from Pinterest or Instagram,
                and anything else on your mind.
              </p>
              <textarea
                className="ct-input ct-textarea"
                id="vision"
                name="vision"
                required
              />
            </div>

            <div className="ct-hp" aria-hidden="true">
              <label>
                Leave this field empty
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <button
              type="submit"
              className="ct-submit"
              aria-disabled={busy}
            >
              <span>{busy ? "Sending" : "Send enquiry"}</span>
              <svg
                className="ct-submitArrow"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8h11M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <section className="ct-faq">
        <h2 className="ct-faqHeading">Common questions</h2>
        <dl className="ct-faqList">
          {faqs.map((faq) => (
            <div className="ct-faqItem" key={faq.q}>
              <dt className="ct-faqQ">{faq.q}</dt>
              <dd className="ct-faqA">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="visually-hidden">
        Studio contact: {studio.email}
      </p>
    </div>
  );
}
