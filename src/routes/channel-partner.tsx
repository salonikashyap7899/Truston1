import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { InnerHero } from "@/components/InnerHero";
import { Reveal, SectionEyebrow } from "@/components/Reveal";
import { Section3DBackground } from "@/components/Section3DBackground";

export const Route = createFileRoute("/channel-partner")({
  head: () => ({
    meta: [
      { title: "Channel Partner Program — TrustOn" },
      {
        name: "description",
        content:
          "Partner with Trust On and earn industry-leading commissions by connecting buyers to premium plots in our flagship housing society.",
      },
      { property: "og:title", content: "Channel Partner Program — TrustOn" },
    ],
  }),
  component: Page,
});

const stats = [
  { num: "500+", label: "Total Plots" },
  { num: "3%", label: "Base Commission" },
  { num: "6%", label: "Max Earning Rate" },
  { num: "30", label: "Days to First Payout" },
  { num: "2", label: "Revenue Streams" },
];

const partnerBenefits = [
  "Official Channel Partner Certificate from Trust On",
  "Access to all plot inventory, pricing, and availability in real-time",
  "Dedicated relationship manager to support your sales",
  "Marketing material: brochures, digital assets, floor plans, site maps",
  "Commission on every plot sold through your referral",
  "Additional commission if client opts for our construction service",
  "Priority access to new launches and pre-launch pricing",
  "Monthly partner performance leaderboard with bonuses",
  "Transparent tracking dashboard for your leads and payments",
];

const commissionCards = [
  {
    type: "Plot Sale — Standard",
    rate: "3",
    desc: "For new partners in their first 3 months, or partners selling fewer than 3 plots per month. Calculated on the total plot sale value.",
    featured: false,
  },
  {
    type: "Plot Sale — Active Tier",
    rate: "5",
    desc: "Unlocked when you sell 3 or more plots in a single calendar month. Applies retroactively to all plots sold that month. This is where most successful partners earn.",
    featured: true,
  },
  {
    type: "Plot Sale — Elite Tier",
    rate: "6",
    desc: "Unlocked when you sell 6+ plots in a calendar month, or achieve a cumulative lifetime sales target. Requires senior management approval.",
    featured: false,
  },
  {
    type: "Construction Referral",
    rate: "1-2",
    desc: "Earned when your client signs a construction agreement with Trust On. Rate depends on project size. Paid on contract signing — not on project completion.",
    featured: false,
  },
];

const steps = [
  { num: "01", title: "Register as a Partner", desc: "Fill out the partner application form. Our team verifies your profile and activates your account within 2 working days. No fee required." },
  { num: "02", title: "Get Onboarded", desc: "Attend a 1-day orientation (in-person or online) covering inventory, pricing, payment plans, legal status, and all sales tools." },
  { num: "03", title: "Refer Buyers", desc: "Market plots through your network, social media, or site visits. Register each lead in your partner portal before bringing them to our office." },
  { num: "04", title: "Deal Confirms", desc: "When your lead books a plot and makes the token payment, the sale is registered under your partner ID. You receive a confirmation with commission amount." },
  { num: "05", title: "Get Paid", desc: "Commission is disbursed within 30 days of booking confirmation via bank transfer. A payment advice slip is shared with every payout." },
];

const partnerTypes = [
  { title: "Real Estate Agents", desc: "Licensed or practicing agents who already work in property sales. Add our inventory to your portfolio." },
  { title: "Property Dealers", desc: "Established dealers who deal in open plots and want to cross-sell a new society to their clientele." },
  { title: "Freelance Marketers", desc: "Digital marketers, social media influencers, or YouTube creators with an audience interested in real estate." },
  { title: "Professionals", desc: "Accountants, lawyers, financial advisors, and HR professionals trusted by clients making major investment decisions." },
  { title: "Real Estate Firms", desc: "Registered companies or brokerage firms who want to include Trust On as a listed project." },
  { title: "Overseas Reps", desc: "Individuals based in UAE, UK, Canada, etc. with connections to Indians looking to invest back home." },
];

const eligibleYes = [
  "Valid Aadhaar Card / PAN Card",
  "A bank account in your name",
  "A network of potential property buyers",
  "Basic understanding of real estate (training provided)",
  "Access to WhatsApp, phone, and email",
  "Signed Partner Agreement with Trust On",
  "Completed onboarding orientation",
];

const eligibleNo = [
  "You are an employee of Trust On or its subsidiaries",
  "You are the buyer yourself",
  "You are under 18 years of age",
  "Your account has been suspended for misconduct",
  "You have misrepresented facts to buyers about the project",
  "You are involved in any legal dispute with the company",
];

const timeline = [
  { tag: "Day 0", title: "Booking Confirmed", desc: "Client pays token amount, booking form is signed, and the plot is allocated. Your sale is registered in the system under your Partner ID." },
  { tag: "Day 1 to 7", title: "Commission Calculated and Verified", desc: "Our accounts team calculates your commission on the total sale value and sends you a Commission Advice note for confirmation." },
  { tag: "Day 7 to 30", title: "Payout Processing", desc: "Commission is queued in the monthly payout batch. Tax is deducted as per applicable rules. Bank transfer is initiated." },
  { tag: "Day 30", title: "Commission Received", desc: "Amount credited to your registered bank account. Payment advice shared via email and WhatsApp. Raise any disputes within 7 days." },
];

const terms = [
  { title: "Lead Registration is Mandatory", desc: "You must register your client's name, phone, and Aadhaar/PAN in the partner portal BEFORE bringing them to our office or sharing a booking form." },
  { title: "No Poaching of Registered Leads", desc: "If a client is already registered under another partner, you may not claim that lead. First-registered partner owns the client unless the registration is more than 90 days old." },
  { title: "No Misrepresentation", desc: "You may not make verbal or written promises to buyers about returns, timelines, or resale value not officially stated in our material." },
  { title: "Construction is Always the Client's Choice", desc: "You may inform clients about our construction service, but you must never pressure or coerce them into it." },
  { title: "Non-Exclusive Agreement", desc: "You are free to work with other developers simultaneously. However, you may not share our confidential inventory data with competitors." },
  { title: "Termination and Exit", desc: "Either party may terminate the agreement with 30 days written notice. Commissions earned on confirmed bookings will still be paid." },
  { title: "Code of Conduct", desc: "Partners must conduct themselves professionally at all times. Abusive language or illegal activities are grounds for immediate suspension." },
  { title: "Marketing Must Be Approved", desc: "Any material you create featuring Trust On branding must be approved by our marketing team before publication." },
];

const faqs = [
  { q: "Is there any joining fee to become a Channel Partner?", a: "No. There is absolutely no registration or joining fee. Our Channel Partner Program is completely free to join. We never charge any upfront amount." },
  { q: "Is this a full-time job or can I do it as a side income?", a: "Both. Many partners do this alongside their existing profession. It is entirely performance-based with no attendance requirements." },
  { q: "What if the buyer pays in installments — when do I get my commission?", a: "Your commission is calculated on the total sale price, not just the first installment. The first 50% is released within 30 days of booking." },
  { q: "Can I sell plots to overseas Indians or foreign nationals?", a: "Yes. We welcome investments from overseas Indians and Non-Resident Indians (NRIs). Power of Attorney arrangements are accepted." },
  { q: "What happens if my client cancels after I have been paid?", a: "If cancellation happens before your second commission tranche is paid, that tranche is forfeited. After 30 days from booking, your first tranche is protected." },
  { q: "Do I need real estate experience or a license?", a: "No formal license is required. However, you must complete our onboarding orientation before you begin selling." },
  { q: "Can I build a team of sub-partners under me?", a: "Yes, subject to approval. Senior or Master Partners can bring in sub-partners and earn an override commission on sub-partner sales." },
  { q: "How do I track my leads and commissions?", a: "Every registered partner gets access to a dedicated Partner Dashboard where you can register leads, track status, and view upcoming payouts." },
];

const commissionNotes = [
  "Commission is calculated on the total agreed sale price — not just the installment received at booking.",
  "If a booking is cancelled before 30% of the total price is paid, no commission is payable. After 30% is paid, 50% of your commission is released.",
  "Commissions are paid to individuals or registered firms — not to third parties.",
  "TDS is deducted as per applicable law. You are responsible for your own income tax filings under Indian IT Act.",
  "No commission is paid for deals where the partner is also the buyer.",
];

function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <InnerHero
        eyebrow="Channel Partner Program — Lucknow"
        title={
          <>
            Earn While You<br />
            <em className="text-luxe-cyan not-italic font-serif italic">Build the Future</em>
          </>
        }
        subtitle="Partner with Trust On and earn industry-leading commissions by connecting buyers to premium plots in our flagship housing society. A transparent, performance-based program designed for real estate professionals and entrepreneurs."
        poster="/attached_assets/image_1779159211927.png"
        alt="Channel Partner Program"
        cta={{ label: "Become a Partner", href: "#register" }}
        secondaryCta={{ label: "Learn More", href: "#program" }}
      />

      {/* Stats Strip */}
      <section className="border-y border-luxe-cyan/20 bg-ink/50 py-12 px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="text-center px-4 border-r border-white/5 last:border-r-0">
                <span className="font-display text-4xl md:text-5xl font-semibold text-luxe-cyan leading-none block">
                  {s.num}
                </span>
                <span className="text-xs uppercase tracking-widest text-white/50 mt-2 block">
                  {s.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About the Program */}
      <section id="program" className="py-24 md:py-32 px-6 bg-ink/30 relative">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <SectionEyebrow>About the Program</SectionEyebrow>
                <h2 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
                  What Is a<br />
                  <em className="text-luxe-cyan italic font-serif">Channel Partner?</em>
                </h2>
                <div className="w-16 h-px bg-luxe-cyan mb-8" />
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  A Channel Partner is an authorized sales representative who markets and sells our housing society plots on our behalf. You act as the bridge between Trust On and potential buyers — and you earn a commission on every successful sale you close.
                </p>
                <p className="text-white/60 leading-relaxed mb-6">
                  There is <strong className="text-white">no salary, no fixed income</strong> — your earnings are entirely performance-based. The more you sell, the more you earn. There are no limits on your earnings.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Our program also gives you an optional second income stream: if your client wishes to construct a home on the purchased plot, you can refer them to our in-house construction services and earn an additional commission on the construction contract.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass-premium p-8 md:p-10 rounded-3xl border border-luxe-cyan/20 relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-luxe-cyan to-transparent rounded-t-3xl" />
                <h3 className="font-display text-2xl text-luxe-cyan mb-6">What You Get as a Partner</h3>
                <ul className="space-y-4">
                  {partnerBenefits.map((b, i) => (
                    <li key={i} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                      <span className="text-luxe-cyan text-xs mt-1 flex-shrink-0">&#10038;</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Two Revenue Opportunities */}
      <section className="py-24 md:py-32 px-6 relative">
        <Section3DBackground opacity={0.08} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>Our Offerings</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
              Two Revenue<br />
              <em className="text-luxe-cyan italic font-serif">Opportunities for You</em>
            </h2>
            <div className="w-16 h-px bg-luxe-cyan mb-12" />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal delay={0.05}>
              <div className="glass-premium p-10 rounded-3xl border border-white/5 relative overflow-hidden h-full">
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-luxe-cyan to-transparent" />
                <div className="text-4xl mb-6">&#127758;</div>
                <h3 className="font-display text-3xl text-white mb-4">Plot Sales</h3>
                <p className="text-white/60 leading-relaxed mb-4">
                  Trust On&apos;s flagship housing society offers residential and commercial plots in multiple sizes. All plots are fully approved, with utility connections available. You earn a commission on the total plot sale value once the booking is confirmed.
                </p>
                <p className="text-white/60 leading-relaxed mb-6">
                  This is the <strong className="text-white">primary income</strong> source for all Channel Partners.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["100 Sq Yd", "200 Sq Yd", "300 Sq Yd", "500 Sq Yd", "Commercial"].map((t) => (
                    <span key={t} className="text-xs uppercase tracking-wider px-3 py-1 border border-luxe-cyan/30 text-luxe-cyan">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass-premium p-10 rounded-3xl border border-white/5 relative overflow-hidden h-full">
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-luxe-cyan to-transparent" />
                <div className="text-4xl mb-6">&#127968;</div>
                <h3 className="font-display text-3xl text-white mb-4">Construction Referral</h3>
                <p className="text-white/60 leading-relaxed mb-4">
                  After plot purchase, if your client agrees to have Trust On build their home, you earn an additional commission on the total construction contract value. Construction is an optional service.
                </p>
                <p className="text-white/60 leading-relaxed mb-6">
                  This is a <strong className="text-white">secondary/bonus income</strong> stream, not guaranteed.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Grey Structure", "Turnkey", "Semi-Furnished", "Fully Furnished"].map((t) => (
                    <span key={t} className="text-xs uppercase tracking-wider px-3 py-1 border border-luxe-cyan/30 text-luxe-cyan">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section id="commission" className="py-24 md:py-32 px-6 bg-ink/30 relative">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>Commission Structure</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
              What You <em className="text-luxe-cyan italic font-serif">Earn</em>
            </h2>
            <div className="w-16 h-px bg-luxe-cyan mb-6" />
            <p className="text-white/60 max-w-2xl mb-12">
              All commissions are calculated on the total confirmed sale value and paid per the payout schedule. Commission rates may be revised periodically — the rate at time of booking confirmation applies.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commissionCards.map((c, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  className={`glass-premium p-8 rounded-2xl border relative transition-all duration-500 hover:-translate-y-1 h-full ${
                    c.featured
                      ? "border-luxe-cyan bg-gradient-to-br from-ink/50 to-luxe-blue/10"
                      : "border-white/5 hover:border-luxe-cyan/40"
                  }`}
                >
                  {c.featured && (
                    <span className="absolute -top-px right-6 bg-luxe-cyan text-ink text-[10px] font-bold uppercase tracking-wider px-3 py-1">
                      Most Earned
                    </span>
                  )}
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-3">{c.type}</p>
                  <p className="font-display text-5xl text-luxe-cyan leading-none">
                    {c.rate}<sup className="text-2xl">%</sup>
                  </p>
                  <p className="text-sm text-white/50 mt-5 pt-5 border-t border-white/5 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Commission Notes */}
          <Reveal delay={0.2}>
            <div className="glass-premium p-8 md:p-10 rounded-2xl border border-luxe-cyan/20 mt-12">
              <h4 className="font-display text-xl text-luxe-cyan mb-6">Important Notes on Commission</h4>
              <ul className="space-y-4">
                {commissionNotes.map((n, i) => (
                  <li key={i} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                    <span className="text-luxe-cyan text-xs mt-1 flex-shrink-0">&#10038;</span>
                    <span dangerouslySetInnerHTML={{ __html: n.replace(/total agreed sale price|total sale price/gi, '<strong class="text-white">$&</strong>') }} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 md:py-32 px-6 relative">
        <Section3DBackground opacity={0.08} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>Process</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
              How the <em className="text-luxe-cyan italic font-serif">Program Works</em>
            </h2>
            <div className="w-16 h-px bg-luxe-cyan mb-16" />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            <div className="hidden lg:block absolute top-9 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxe-cyan to-transparent" />
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="relative">
                  <div className="w-[72px] h-[72px] border border-luxe-cyan flex items-center justify-center font-display text-2xl text-luxe-cyan bg-background mb-6 relative z-10">
                    {s.num}
                  </div>
                  <h4 className="font-display text-xl text-white mb-3">{s.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Profiles */}
      <section className="py-24 md:py-32 px-6 bg-ink/30 relative">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>Partner Profiles</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
              Who Can <em className="text-luxe-cyan italic font-serif">Join?</em>
            </h2>
            <div className="w-16 h-px bg-luxe-cyan mb-6" />
            <p className="text-white/60 max-w-2xl mb-12">
              Our program is open to a wide range of professionals. If you have a network of potential buyers, you qualify.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerTypes.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="glass-premium p-8 rounded-2xl border-t-[3px] border-luxe-cyan transition-transform duration-500 hover:-translate-y-1 h-full">
                  <h4 className="font-display text-xl text-white mb-3">{p.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-24 md:py-32 px-6 relative">
        <Section3DBackground opacity={0.08} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>Eligibility</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
              Who Is <em className="text-luxe-cyan italic font-serif">Eligible?</em>
            </h2>
            <div className="w-16 h-px bg-luxe-cyan mb-12" />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12">
            <Reveal delay={0.05}>
              <div>
                <h4 className="font-display text-2xl text-white mb-6">&#10003; You Qualify If You Have:</h4>
                <ul className="space-y-4">
                  {eligibleYes.map((e, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                      <span className="text-emerald-400 font-bold">&#10003;</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <h4 className="font-display text-2xl text-white mb-6">&#10007; You Are Not Eligible If:</h4>
                <ul className="space-y-4">
                  {eligibleNo.map((e, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                      <span className="text-red-400 font-bold">&#10007;</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Payment Schedule */}
      <section className="py-24 md:py-32 px-6 bg-ink/30 relative">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>Payment Schedule</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
              When You <em className="text-luxe-cyan italic font-serif">Get Paid</em>
            </h2>
            <div className="w-16 h-px bg-luxe-cyan mb-6" />
            <p className="text-white/60 max-w-2xl mb-12">
              All payouts are processed via bank transfer. We do not pay in cash. Below is the exact payout timeline after a booking is confirmed.
            </p>
          </Reveal>
          <div className="relative pl-12 md:pl-16">
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-luxe-cyan to-transparent" />
            {timeline.map((t, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="relative pb-12 last:pb-0">
                  <div className="absolute left-[-32px] md:left-[-40px] top-1 w-3.5 h-3.5 border-2 border-luxe-cyan rounded-full bg-background" />
                  <p className="text-[10px] uppercase tracking-widest text-luxe-cyan mb-1">{t.tag}</p>
                  <h4 className="font-display text-xl text-white mb-2">{t.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section id="terms" className="py-24 md:py-32 px-6 relative">
        <Section3DBackground opacity={0.08} />
        <div className="mx-auto max-w-7xl relative z-10">
          <Reveal>
            <SectionEyebrow>Terms and Policies</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
              Rules of the <em className="text-luxe-cyan italic font-serif">Program</em>
            </h2>
            <div className="w-16 h-px bg-luxe-cyan mb-12" />
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {terms.map((t, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="glass-premium p-8 rounded-xl border-l-[3px] border-luxe-cyan h-full">
                  <h4 className="font-display text-lg text-luxe-cyan mb-3">{t.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 md:py-32 px-6 bg-ink/30 relative">
        <Section3DBackground opacity={0.1} />
        <div className="mx-auto max-w-4xl relative z-10">
          <Reveal>
            <SectionEyebrow>Frequently Asked Questions</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight">
              Everything You <em className="text-luxe-cyan italic font-serif">Need to Know</em>
            </h2>
            <div className="w-16 h-px bg-luxe-cyan mb-12" />
          </Reveal>
          <div className="divide-y divide-white/5">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.03}>
                <div>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center py-6 gap-6 text-left"
                  >
                    <span className="font-display text-lg md:text-xl text-white">{f.q}</span>
                    <span
                      className={`w-7 h-7 border border-luxe-cyan flex items-center justify-center text-luxe-cyan flex-shrink-0 transition-transform duration-300 ${
                        openFaq === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ${
                      openFaq === i ? "max-h-48 pb-6" : "max-h-0"
                    }`}
                  >
                    <p className="text-sm text-white/60 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 border-y border-luxe-cyan/20 bg-gradient-to-br from-ink/50 to-luxe-blue/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_700px_500px_at_50%_50%,rgba(0,191,255,0.06),transparent)]" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <Reveal>
            <h2 className="font-display text-4xl md:text-7xl text-white mb-6 tracking-tight leading-tight">
              Ready to Start <em className="text-luxe-cyan italic font-serif">Earning?</em>
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Join hundreds of partners already earning with Trust On. Registration takes less than 5 minutes. Your first commission could be within 30 days.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#register" className="btn-magnetic btn-luxe px-10 py-4 rounded-full">
                Register Now — It&apos;s Free
              </a>
              <a
                href="tel:+919876543210"
                className="btn-magnetic px-10 py-4 rounded-full border border-white/20 text-white hover:border-luxe-cyan hover:text-luxe-cyan transition-colors font-semibold text-xs uppercase tracking-widest"
              >
                Call Us: +91 98765 43210
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-24 md:py-32 px-6 relative">
        <Section3DBackground opacity={0.08} />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div>
                <SectionEyebrow>Get Started</SectionEyebrow>
                <h2 className="font-display text-4xl md:text-5xl text-white mb-6 tracking-tight leading-tight">
                  Register as a<br />Channel Partner
                </h2>
                <p className="text-white/60 leading-relaxed mb-8">
                  Fill in the form and our partnership team will reach out within 24 hours to complete your onboarding.
                </p>
                <div className="space-y-5">
                  <div className="flex gap-3 items-start">
                    <span className="text-luxe-cyan mt-0.5">&#128205;</span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Office Address</p>
                      <p className="text-white text-sm">Office #7, Hazratganj, Lucknow, Uttar Pradesh 226001</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-luxe-cyan mt-0.5">&#128222;</span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Phone / WhatsApp</p>
                      <p className="text-white text-sm">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-luxe-cyan mt-0.5">&#9993;</span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Email</p>
                      <p className="text-white text-sm">partners@truston.in</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-luxe-cyan mt-0.5">&#9200;</span>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Office Hours</p>
                      <p className="text-white text-sm">Mon–Sat, 10:00 AM – 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <form className="glass-premium rounded-3xl p-8 md:p-10 border border-white/10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Full Name" placeholder="Your full name" />
                  <FormField label="Aadhaar / PAN No." placeholder="XXXX-XXXX-XXXX" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Phone / WhatsApp" type="tel" placeholder="+91 XXXXX XXXXX" />
                  <FormField label="Email Address" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium mb-2 block">
                      Current Profession / Background
                    </span>
                    <select className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3.5 text-white text-sm focus:outline-none focus:border-luxe-cyan/50 transition-colors appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%3E%3Cpath%20fill%3D%22%2300BFFF%22%20d%3D%22M6%208L0%200h12z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] pr-10">
                      <option value="" className="bg-ink">Select your profile</option>
                      <option className="bg-ink">Real Estate Agent / Dealer</option>
                      <option className="bg-ink">Property Consultant</option>
                      <option className="bg-ink">Digital Marketer / Influencer</option>
                      <option className="bg-ink">Professional (Doctor/Lawyer/Accountant)</option>
                      <option className="bg-ink">Business Owner</option>
                      <option className="bg-ink">Freelancer</option>
                      <option className="bg-ink">Other</option>
                    </select>
                  </label>
                </div>
                <FormField label="City" placeholder="Your city" />
                <div>
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium mb-2 block">
                      How did you hear about this program?
                    </span>
                    <select className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3.5 text-white text-sm focus:outline-none focus:border-luxe-cyan/50 transition-colors appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%3E%3Cpath%20fill%3D%22%2300BFFF%22%20d%3D%22M6%208L0%200h12z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] pr-10">
                      <option value="" className="bg-ink">Select source</option>
                      <option className="bg-ink">Existing Channel Partner</option>
                      <option className="bg-ink">Social Media</option>
                      <option className="bg-ink">Google Search</option>
                      <option className="bg-ink">Our Office</option>
                      <option className="bg-ink">WhatsApp / Referral</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium mb-2 block">
                      Message / Any Questions (Optional)
                    </span>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your network or any questions you have..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3.5 text-white text-sm focus:outline-none focus:border-luxe-cyan/50 transition-colors resize-y"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full btn-magnetic btn-luxe py-4 rounded-lg mt-2"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Thank you! Our team will contact you within 24 hours.");
                  }}
                >
                  Submit Application
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-white/50 font-medium mb-2 block">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3.5 text-white text-sm focus:outline-none focus:border-luxe-cyan/50 transition-colors"
      />
    </label>
  );
}
