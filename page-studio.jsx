// Direction 2: STUDIO
// Editorial / warm / approachable. Off-white canvas, deep ink, warm orange
// accent paired with lime as a secondary highlight. Magazine-style typography.

const ST_BG = '#f5f1e6';
const ST_INK = '#1a1612';
const ST_INK2 = '#3a3328';
const ST_DIM = '#7a6f5c';
const ST_LINE = '#d9d2c0';
const ST_PAPER = '#fdfcf8';
const ST_ACCENT = '#c2410c';
const ST_LIME = '#84a83a';

const stSerif = '"Fraunces", "Times New Roman", serif';
const stSans = 'Inter, -apple-system, sans-serif';
const stMono = '"JetBrains Mono", monospace';

function StRule({ num, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: stMono, fontSize: 11, color: ST_DIM, letterSpacing: 1.5, textTransform: 'uppercase' }}>
      <span style={{ fontFamily: stSerif, fontStyle: 'italic', fontSize: 22, color: ST_ACCENT, fontWeight: 400 }}>№ {num}</span>
      <span style={{ height: 1, flex: 1, background: ST_LINE }}></span>
      <span>{label}</span>
    </div>
  );
}

function StHeroVisual() {
  // A "knowledge cloud" condensing into a single answer — the agency's value prop in motion.
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 1800); return () => clearInterval(t); }, []);

  const sources = [
    { x: 8, y: 12, label: 'whatsapp.thread' },
    { x: 70, y: 8, label: 'pricing.pdf' },
    { x: 4, y: 72, label: 'faq.notion' },
    { x: 80, y: 80, label: 'crm.export' },
    { x: 38, y: 4, label: 'email.archive' },
    { x: 58, y: 88, label: 'policies.doc' },
  ];

  return (
    <div style={{
      position: 'relative',
      background: ST_PAPER,
      border: `1px solid ${ST_LINE}`,
      borderRadius: 4,
      aspectRatio: '4/3',
      overflow: 'hidden',
      boxShadow: '0 30px 80px -40px rgba(60,40,20,0.25)',
    }}>
      <div style={{
        position: 'absolute',
        top: 16, left: 20, fontFamily: stMono, fontSize: 10,
        color: ST_DIM, letterSpacing: 1.5, textTransform: 'uppercase',
      }}>your data, organized</div>

      {sources.map((s, i) => (
        <div key={s.label} style={{
          position: 'absolute',
          left: `${s.x}%`, top: `${s.y}%`,
          fontFamily: stMono, fontSize: 10,
          background: ST_BG,
          border: `1px solid ${ST_LINE}`,
          padding: '5px 9px',
          borderRadius: 2,
          color: ST_INK2,
          opacity: 0.4 + 0.6 * (((tick + i) % 6) / 6),
          transition: 'opacity .8s ease',
        }}>{s.label}</div>
      ))}

      {/* center node */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        width: 140, height: 140, borderRadius: '50%',
        background: ST_ACCENT, color: ST_PAPER,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: stSerif, fontStyle: 'italic', fontWeight: 300, fontSize: 28,
        boxShadow: `0 0 0 12px ${ST_BG}, 0 0 0 13px ${ST_LINE}`,
      }}>
        agent
      </div>

      {/* connecting strokes */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {sources.map((s, i) => (
          <line key={i}
            x1={`${s.x + 8}%`} y1={`${s.y + 4}%`}
            x2="50%" y2="50%"
            stroke={ST_LINE} strokeWidth="1" strokeDasharray="2 4"
            opacity={((tick + i) % 6) === 0 ? 0.9 : 0.25}
            style={{ transition: 'opacity .8s' }}
          />
        ))}
      </svg>

      {/* output */}
      <div style={{
        position: 'absolute', bottom: 18, right: 20,
        background: ST_LIME, color: ST_INK,
        padding: '8px 12px', fontFamily: stMono, fontSize: 11,
        borderRadius: 2, fontWeight: 600,
      }}>→ answered in 1.2s</div>
    </div>
  );
}

function StudioPage({ density = 'comfy' }) {
  const pad = density === 'compact' ? 64 : 96;
  const sectionGap = density === 'compact' ? 80 : 130;
  const [openFaq, setOpenFaq] = React.useState(0);
  const [hoveredService, setHoveredService] = React.useState(null);

  const services = [
    { num: '01', title: 'Strategy & Ideation', sub: 'Where will AI move the needle for your business?', items: ['Identify automation opportunities', 'Map business workflows', 'Define AI use cases — support, sales, operations'] },
    { num: '02', title: 'Knowledge Base Design', sub: 'Take scattered information and make it think-ready.', items: ['Structure FAQs, services, policies', 'Clean and organize scattered data', 'Prepare data for retrieval (RAG)'] },
    { num: '03', title: 'AI Development', sub: 'Build the assistant that knows your business.', items: ['Assistants on Claude or OpenAI GPT', 'Prompt engineering and tuning', 'Context-aware retrieval'] },
    { num: '04', title: 'Automation & Integrations', sub: 'Wire your tools so work flows on its own.', items: ['Automate replies and lead handling', 'Connect CRM, forms, messaging', 'Reduce manual operations'] },
    { num: '05', title: 'Interface & Deployment', sub: 'Put the system in front of the people who need it.', items: ['Chat interfaces — internal or customer-facing', 'Website integration', 'Simple dashboards for your team'] },
    { num: '06', title: 'Maintenance & Optimization', sub: 'Systems improve with care. We provide it.', items: ['Update and grow the knowledge base', 'Improve responses over time', 'Monitor performance and accuracy'] },
  ];

  return (
    <div style={{ background: ST_BG, color: ST_INK, fontFamily: stSans, minHeight: '100%' }}>
      {/* NAV */}
      <header style={{
        padding: `22px ${pad}px`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${ST_LINE}`,
      }}>
        <div style={{ fontFamily: stSerif, fontSize: 22, fontWeight: 400, letterSpacing: -0.5 }}>
          Quietworks <span style={{ fontStyle: 'italic', color: ST_ACCENT }}>&</span> Co.
        </div>
        <nav style={{ display: 'flex', gap: 32, fontSize: 14, color: ST_INK2 }}>
          <a href="#approach" style={{ color: 'inherit', textDecoration: 'none' }}>Approach</a>
          <a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a>
          <a href="#case" style={{ color: 'inherit', textDecoration: 'none' }}>Case study</a>
          <a href="#demo" style={{ color: 'inherit', textDecoration: 'none' }}>Live demo</a>
        </nav>
        <a href="#cta" style={{
          fontSize: 13, color: ST_PAPER, background: ST_INK,
          padding: '10px 18px', textDecoration: 'none', borderRadius: 999,
        }}>Book a free audit →</a>
      </header>

      {/* HERO */}
      <section style={{ padding: `${sectionGap}px ${pad}px ${sectionGap - 30}px`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: stMono, fontSize: 11, color: ST_DIM, letterSpacing: 1.5, marginBottom: 40, textTransform: 'uppercase' }}>
          <span style={{ width: 6, height: 6, background: ST_LIME, borderRadius: '50%' }}></span>
          <span>An AI automation studio · accepting Q3 projects</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'end' }}>
          <h1 style={{
            fontFamily: stSerif,
            fontSize: 'clamp(56px, 7.5vw, 116px)',
            fontWeight: 300,
            letterSpacing: -3,
            lineHeight: 0.95,
            margin: 0,
          }}>
            AI systems that <span style={{ fontStyle: 'italic', color: ST_ACCENT }}>organize</span>,<br />
            <span style={{ fontStyle: 'italic', color: ST_ACCENT }}>automate</span>, <span style={{ fontStyle: 'italic', color: ST_ACCENT }}>scale</span><br />
            your business.
          </h1>
          <div>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: ST_INK2, margin: 0, maxWidth: 460 }}>
              We design and build AI-powered knowledge systems, automations, and internal tools — engineered to reduce manual work, sharpen response times, and lift conversions.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 32, alignItems: 'center' }}>
              <a href="#cta" style={{
                fontSize: 15, color: ST_PAPER, background: ST_INK,
                padding: '14px 24px', textDecoration: 'none', borderRadius: 999,
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>Book a free AI audit <span>→</span></a>
              <a href="#demo" style={{
                fontSize: 15, color: ST_INK,
                padding: '14px 8px', textDecoration: 'none',
                borderBottom: `1px solid ${ST_INK}`,
              }}>See it live</a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <StHeroVisual />
        </div>
      </section>

      {/* PROBLEM */}
      <section id="approach" style={{ padding: `${sectionGap}px ${pad}px`, background: ST_PAPER, borderTop: `1px solid ${ST_LINE}`, borderBottom: `1px solid ${ST_LINE}` }}>
        <StRule num="01" label="The problem we solve" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginTop: 48, alignItems: 'start' }}>
          <h2 style={{
            fontFamily: stSerif, fontWeight: 300,
            fontSize: 'clamp(40px, 4.8vw, 68px)',
            letterSpacing: -1.8, lineHeight: 1.02, margin: 0,
          }}>
            Most businesses are running on <span style={{ fontStyle: 'italic', color: ST_ACCENT }}>messy, manual</span> systems.
          </h2>
          <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Information scattered across WhatsApp, Google Docs, emails, and PDFs',
                'Staff repeatedly answering the same questions',
                'Leads lost to slow or inconsistent replies',
                'Processes that are manual and difficult to scale',
              ].map((t, i) => (
                <li key={t} style={{
                  display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16,
                  padding: '20px 0', borderBottom: `1px solid ${ST_LINE}`,
                  alignItems: 'baseline',
                }}>
                  <span style={{ fontFamily: stSerif, fontStyle: 'italic', color: ST_ACCENT, fontSize: 20, fontWeight: 400 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 17, color: ST_INK, lineHeight: 1.5 }}>{t}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: stSerif, fontStyle: 'italic', fontSize: 22, color: ST_DIM, marginTop: 32, lineHeight: 1.5, fontWeight: 300 }}>
              The result — wasted time, inconsistent service, missed revenue.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{ padding: `${sectionGap}px ${pad}px` }}>
        <StRule num="02" label="What we do" />
        <h2 style={{
          fontFamily: stSerif, fontWeight: 300,
          fontSize: 'clamp(48px, 6vw, 88px)', letterSpacing: -2.5,
          lineHeight: 0.98, margin: '40px 0 0', maxWidth: 1100,
        }}>
          We build systems that <span style={{ fontStyle: 'italic', color: ST_ACCENT }}>think</span>, <span style={{ fontStyle: 'italic', color: ST_ACCENT }}>respond</span>, and <span style={{ fontStyle: 'italic', color: ST_ACCENT }}>operate</span> for you.
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: ST_INK2, maxWidth: 720, marginTop: 32 }}>
          We turn your business knowledge and workflows into structured systems powered by AI — centralizing data, building assistants trained on your business, automating repetitive processes, and improving customer response and internal efficiency.
        </p>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: `0 ${pad}px ${sectionGap}px` }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((s, i) => (
            <div key={s.num}
              onMouseEnter={() => setHoveredService(i)}
              onMouseLeave={() => setHoveredService(null)}
              style={{
                display: 'grid', gridTemplateColumns: '120px 1fr 1.4fr', gap: 40,
                padding: '36px 0', borderTop: `1px solid ${ST_LINE}`,
                alignItems: 'start',
                transition: 'background .25s',
                background: hoveredService === i ? ST_PAPER : 'transparent',
                margin: hoveredService === i ? `0 -${pad / 2}px` : '0',
                paddingLeft: hoveredService === i ? pad / 2 : 0,
                paddingRight: hoveredService === i ? pad / 2 : 0,
              }}>
              <div style={{ fontFamily: stSerif, fontStyle: 'italic', fontSize: 32, color: ST_ACCENT, fontWeight: 300 }}>№{s.num}</div>
              <div>
                <h3 style={{ fontFamily: stSerif, fontSize: 32, fontWeight: 400, margin: 0, letterSpacing: -0.8, lineHeight: 1.1 }}>{s.title}</h3>
                <p style={{ fontFamily: stSerif, fontStyle: 'italic', fontSize: 18, color: ST_DIM, margin: '8px 0 0', fontWeight: 300, lineHeight: 1.4 }}>{s.sub}</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {s.items.map(item => (
                  <li key={item} style={{ fontSize: 16, color: ST_INK2, lineHeight: 1.5, display: 'flex', gap: 12 }}>
                    <span style={{ color: ST_ACCENT, marginTop: 2 }}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${ST_LINE}` }}></div>
        </div>
      </section>

      {/* USE CASES */}
      <section style={{ padding: `${sectionGap}px ${pad}px`, background: ST_INK, color: ST_PAPER, borderTop: `1px solid ${ST_LINE}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: stMono, fontSize: 11, color: '#999', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>
          <span style={{ fontFamily: stSerif, fontStyle: 'italic', fontSize: 22, color: ST_LIME, fontWeight: 400 }}>№ 03</span>
          <span style={{ height: 1, flex: 1, background: '#333' }}></span>
          <span>Where it pays off</span>
        </div>
        <h2 style={{ fontFamily: stSerif, fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, letterSpacing: -1.8, margin: '40px 0 56px', maxWidth: 900 }}>
          Four places AI quietly does the heavy lifting.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: '#2a2520' }}>
          {[
            ['Customer Support Automation', 'Answer FAQs instantly and consistently — across email, chat, and messaging channels.'],
            ['Sales & Lead Qualification', 'Guide customers, recommend services, and capture leads while their attention is yours.'],
            ['Internal Knowledge Assistant', 'Help staff access information quickly. Cut onboarding time meaningfully.'],
            ['Operations Automation', 'Reduce repetitive manual processes that bleed hours from skilled people.'],
          ].map(([t, d], i) => (
            <div key={t} style={{ background: ST_INK, padding: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ fontFamily: stSerif, fontStyle: 'italic', color: ST_LIME, fontSize: 22, fontWeight: 300 }}>{String(i + 1).padStart(2, '0')}.</span>
              <h3 style={{ fontFamily: stSerif, fontSize: 28, fontWeight: 400, letterSpacing: -0.5, margin: 0 }}>{t}</h3>
              <p style={{ fontSize: 15, color: '#bbb', margin: 0, lineHeight: 1.6 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDY */}
      <section id="case" style={{ padding: `${sectionGap}px ${pad}px` }}>
        <StRule num="04" label="Case study" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginTop: 48, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: stMono, fontSize: 11, color: ST_DIM, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12 }}>Hospitality · 2025</div>
            <h2 style={{ fontFamily: stSerif, fontSize: 64, fontWeight: 300, letterSpacing: -2, margin: 0, lineHeight: 1 }}>
              NomadNest <span style={{ fontStyle: 'italic', color: ST_ACCENT }}>Travel Co.</span>
            </h2>
            <p style={{ fontFamily: stSerif, fontStyle: 'italic', fontSize: 22, color: ST_DIM, margin: '16px 0 0', lineHeight: 1.4, fontWeight: 300, maxWidth: 460 }}>
              Boutique travel agency, 12 staff. Drowning in repetitive inquiries.
            </p>
            <div style={{ marginTop: 40 }}>
              <h4 style={{ fontFamily: stMono, fontSize: 11, color: ST_DIM, letterSpacing: 1.5, textTransform: 'uppercase', margin: 0 }}>Problem</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', color: ST_INK2, fontSize: 16, lineHeight: 1.7 }}>
                <li>— 100+ daily customer inquiries</li>
                <li>— slow response times</li>
                <li>— inconsistent information across channels</li>
              </ul>
              <h4 style={{ fontFamily: stMono, fontSize: 11, color: ST_DIM, letterSpacing: 1.5, textTransform: 'uppercase', margin: '32px 0 0' }}>Solution</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', color: ST_INK2, fontSize: 16, lineHeight: 1.7 }}>
                <li>— structured KB across packages, FAQs, policies</li>
                <li>— AI assistant for support and internal use</li>
                <li>— automated responses for common inquiries</li>
              </ul>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: `1px solid ${ST_LINE}`, background: ST_PAPER }}>
            {[
              ['80%', 'Faster response time'],
              ['60%', 'Fewer manual replies'],
              ['25%', 'Increase in conversions'],
            ].map(([n, l], i) => (
              <div key={n} style={{
                padding: 40, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                borderTop: i === 0 ? 'none' : `1px solid ${ST_LINE}`,
              }}>
                <span style={{ fontFamily: stSerif, fontSize: 96, fontWeight: 300, color: ST_ACCENT, letterSpacing: -3, fontStyle: 'italic', lineHeight: 1 }}>{n}</span>
                <span style={{ fontSize: 16, color: ST_INK2, maxWidth: 180, textAlign: 'right', lineHeight: 1.4 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{ padding: `${sectionGap}px ${pad}px`, background: ST_PAPER, borderTop: `1px solid ${ST_LINE}`, borderBottom: `1px solid ${ST_LINE}` }}>
        <StRule num="05" label="A live example" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, marginTop: 48, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: stSerif, fontSize: 'clamp(40px, 4.8vw, 64px)', fontWeight: 300, letterSpacing: -1.8, lineHeight: 1.05, margin: 0 }}>
              Real example: AI <span style={{ fontStyle: 'italic', color: ST_ACCENT }}>answering</span> customer questions.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: ST_INK2, margin: '24px 0 0', maxWidth: 460 }}>
              This assistant is trained on company data and responds instantly with accurate, context-aware answers. Type a question — it's answering live.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {['claude · haiku-4.5', '47 docs indexed', '~1.2s avg latency'].map(t => (
                <div key={t} style={{ fontFamily: stMono, fontSize: 11, color: ST_DIM, letterSpacing: 1, textTransform: 'uppercase' }}>· {t}</div>
              ))}
            </div>
          </div>
          <ChatStudio accent={ST_ACCENT} />
        </div>
      </section>

      {/* OFFER */}
      <section style={{ padding: `${sectionGap}px ${pad}px` }}>
        <StRule num="06" label="The offer" />
        <div style={{
          marginTop: 48,
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60,
          padding: 56, background: ST_PAPER, border: `1px solid ${ST_LINE}`,
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontFamily: stMono, fontSize: 11, color: ST_DIM, letterSpacing: 1.5, textTransform: 'uppercase' }}>One package · end to end</div>
            <h3 style={{ fontFamily: stSerif, fontSize: 52, fontWeight: 300, margin: '8px 0 0', letterSpacing: -1.8, lineHeight: 1.05 }}>
              AI Knowledge<br />
              <span style={{ fontStyle: 'italic', color: ST_ACCENT }}>System</span> Setup
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Knowledge base structuring', 'AI assistant development', 'Workflow automation', 'Deployment + team training'].map(i => (
                <li key={i} style={{ fontSize: 17, color: ST_INK2, display: 'flex', gap: 12 }}>
                  <span style={{ color: ST_ACCENT }}>—</span>{i}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ borderLeft: `1px solid ${ST_LINE}`, paddingLeft: 48 }}>
            <div>
              <div style={{ fontFamily: stMono, fontSize: 10, color: ST_DIM, letterSpacing: 1.5, textTransform: 'uppercase' }}>Setup · one-time</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span style={{ fontFamily: stSerif, fontSize: 72, fontWeight: 300, color: ST_INK, letterSpacing: -2.5, fontStyle: 'italic', lineHeight: 1 }}>RM3K</span>
                <span style={{ fontSize: 18, color: ST_DIM }}>– RM8K</span>
              </div>
            </div>
            <div style={{ height: 1, background: ST_LINE, margin: '32px 0' }}></div>
            <div>
              <div style={{ fontFamily: stMono, fontSize: 10, color: ST_DIM, letterSpacing: 1.5, textTransform: 'uppercase' }}>Maintenance · monthly</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span style={{ fontFamily: stSerif, fontSize: 44, fontWeight: 300, color: ST_INK, letterSpacing: -1.5, fontStyle: 'italic', lineHeight: 1 }}>RM500</span>
                <span style={{ fontSize: 16, color: ST_DIM }}>/ mo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: `${sectionGap}px ${pad}px`, background: ST_ACCENT, color: ST_PAPER, position: 'relative', overflow: 'hidden' }}>
        <div style={{ fontFamily: stMono, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 24, opacity: 0.8 }}>Final call</div>
        <h2 style={{
          fontFamily: stSerif, fontWeight: 300,
          fontSize: 'clamp(56px, 7vw, 108px)', letterSpacing: -3,
          lineHeight: 0.95, margin: 0, maxWidth: 1200,
        }}>
          Replace manual work with <span style={{ fontStyle: 'italic' }}>systems that scale.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, marginTop: 56, alignItems: 'end' }}>
          <p style={{ fontSize: 19, lineHeight: 1.5, margin: 0, maxWidth: 560, opacity: 0.9 }}>
            Book a free audit and we'll identify where AI can reduce workload and improve operations — concrete wins, no fluff.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href="#" style={{
              fontSize: 17, color: ST_ACCENT, background: ST_PAPER,
              padding: '20px 32px', textDecoration: 'none', borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', gap: 12, fontWeight: 500,
            }}>Book my free AI audit <span>→</span></a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: `${sectionGap}px ${pad}px` }}>
        <StRule num="07" label="Common questions" />
        <div style={{ marginTop: 40, maxWidth: 920 }}>
          {[
            ['What do you need from us?', 'Access to your existing documents, FAQs, and workflows. We handle the structuring, cleaning, and integration from there.'],
            ['How long does setup take?', 'Typically 5–10 days, depending on the size of your knowledge base and the number of integrations.'],
            ['Do you customize for each business?', 'Yes — every system is tailored to your workflows, data, voice, and the specific outcomes you want to drive.'],
          ].map(([q, a], i) => (
            <div key={q} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{
              borderTop: `1px solid ${ST_LINE}`, padding: '28px 0', cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                <h4 style={{ fontFamily: stSerif, fontSize: 28, fontWeight: 400, margin: 0, letterSpacing: -0.8 }}>{q}</h4>
                <span style={{ fontFamily: stSerif, color: ST_ACCENT, fontSize: 28, fontStyle: 'italic', fontWeight: 300 }}>{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && (
                <p style={{ fontSize: 17, color: ST_INK2, lineHeight: 1.65, margin: '14px 0 0', maxWidth: 760 }}>{a}</p>
              )}
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${ST_LINE}` }}></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: `52px ${pad}px`, borderTop: `1px solid ${ST_LINE}`, background: ST_PAPER }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ fontFamily: stSerif, fontSize: 22, fontWeight: 400 }}>Quietworks <span style={{ fontStyle: 'italic', color: ST_ACCENT }}>&</span> Co.</div>
          <div style={{ fontFamily: stSerif, fontStyle: 'italic', fontSize: 16, color: ST_DIM, fontWeight: 300 }}>
            AI systems · Automation · Knowledge infrastructure — built for efficiency and scale.
          </div>
          <div style={{ fontFamily: stMono, fontSize: 12, color: ST_DIM }}>© 2026</div>
        </div>
      </footer>
    </div>
  );
}

window.StudioPage = StudioPage;
