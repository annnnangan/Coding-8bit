import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import MainTitle from "@/components/MainTitle";
import Form from "@/components/help-center/Form";

import { faqData, contactInfo, socialLinks } from "@/data/help-center";

export default function HelpCenter() {
  return (
    <>
      <Helmet>
        <title>Coding∞bit ｜ 幫助中心</title>
      </Helmet>

      <div className="wrap">
        {/* header */}
        <header className="help-center-banner-section">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <NavLink to="/" className="underline-hover">
                    首頁
                  </NavLink>
                </li>
                <li
                  className="breadcrumb-item active fw-semibold"
                  aria-current="page"
                >
                  幫助中心
                </li>
              </ol>
            </nav>
            <h1 className="text-brand-03 mt-4 mt-lg-8">幫助中心</h1>
          </div>
        </header>

        {/* FAQ */}
        <section className="help-center-FAQ-section">
          <div className="container">
            <div className="row f-center">
              <div className="col">
                <div className="bg-white rounded shadow py-8 px-4 p-md-13">
                  <MainTitle
                    longTitle={false}
                    beforeTitle="常見問題"
                    afterTitle=""
                  />
                  <div className="accordion mt-10" id="FAQ-accordion">
                    {faqData.map((faq, index) => (
                      <div key={faq.id} className="accordion-item">
                        <h3
                          className="accordion-header"
                          id={`panelsStayOpen-heading${faq.id}`}
                        >
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#panelsStayOpen-collapse${faq.id}`}
                            aria-expanded={index === 0 ? "true" : "false"}
                            aria-controls={`panelsStayOpen-collapse${faq.id}`}
                          >
                            {faq.question}
                          </button>
                        </h3>
                        <div
                          id={`panelsStayOpen-collapse${faq.id}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`panelsStayOpen-heading${faq.id}`}
                        >
                          <div className="accordion-body">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 聯絡我們 */}
        <section className="help-center-contact-section mt-10">
          <div className="container">
            <div className="row f-center">
              <div className="col">
                <div className="bg-white rounded shadow py-8 px-4 p-md-13">
                  <MainTitle
                    longTitle={false}
                    beforeTitle="聯絡我們"
                    afterTitle=""
                  />
                  <div className="row mt-6 mt-lg-12">
                    <div className="col-lg-6">
                      <ul>
                        {contactInfo.map((item) => (
                          <li key={item.id} className="f-align-center mt-4">
                            <div className="flex-shrink-0 f-align-center">
                              <span className="material-symbols-outlined text-brand-01 fs-2">
                                {item.icon}
                              </span>
                            </div>
                            <div className="flex-grow-1 ms-4">
                              <p className="fw-semibold">{item.title}</p>
                              <small>{item.content}</small>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <hr />
                      <h4 className="fw-medium fs-6 fs-lg-4 mt-6">Follow us</h4>
                      <ul className="d-flex mt-4">
                        {socialLinks.map((link) => (
                          <li
                            key={link.id}
                            className={link.id !== 1 ? "ms-3" : ""}
                          >
                            <a href={link.href} className="icon-hover">
                              <img src={link.iconSrc} alt={link.altText} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="col-lg-6 mt-10 mt-lg-0">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d903.6875711010141!2d121.51242426953871!3d25.042547213645992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a90b40d1885d%3A0xaa64cab47db4b886!2zMTAw5Y-w5YyX5biC5Lit5q2j5Y2A6YeN5oW25Y2X6Lev5LiA5q61MTAy6Jmf!5e0!3m2!1szh-TW!2stw!4v1728110805181!5m2!1szh-TW!2stw"
                        width="100%"
                        height="400"
                        style={{ border: "0" }}
                        allowFullScreen=""
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>

                  <Form />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
