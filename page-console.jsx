// Direction 3: CONSOLE
// Minimal Swiss + product-led. White canvas, deep ink, lime accent.
// Clean sans, lots of whitespace, the live demo as the hero anchor.

const CN_BG = '#ffffff';
const CN_INK = '#0a0a0a';
const CN_INK2 = '#3a3a3a';
const CN_DIM = '#888';
const CN_LINE = '#ececec';
const CN_SOFT = '#f7f7f5';
const CN_LIME = '#a3e635';
const CN_LIME_DK = '#7aac1f';

const cnSans = 'Inter, -apple-system, sans-serif';
const cnMono = '"JetBrains Mono", monospace';

function CnEyebrow({ num, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: cnMono, fontSize: 11, color: CN_DIM, letterSpacing: 1, textTransform: 'uppercase' }}>
      <span style={{ color: CN_INK, fontWeight: 600 }}>[{num}]</span>
      <span>{label}</span>
    </div>
  );
}

function ConsolePage({ density = 'comfy' }) {
  const pad = density === 'compact' ? 56 : 88;
  const sectionGap = density === 'compact' ? 88 : 140;
  const [openFaq, setOpenFaq] = React.useState(0);

  return (
    <div style={{ background: CN_BG, color: CN_INK, fontFamily: cnSans, minHeight: '100%' }}>
      {/* NAV */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        padding: `18px ${pad}px`,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', gap: 24,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${CN_LINE}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600, letterSpacing: -0.3 }}>
          <span style={{ width: 22, height: 22, background: CN_INK, color: CN_LIME, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: cnMono, fontSize: 12, fontWeight: 700 }}>◆</span>
          northsouth
        </div>
        <nav style={{ display: 'flex', gap: 28, fontSize: 13, color: CN_INK2, justifyContent: 'center' }}>
          <a href="#how" style={{ color: 'inherit', textDecoration: 'none' }}>How it works</a>
          <a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a>
          <a href="#case" style={{ color: 'inherit', textDecoration: 'none' }}>Case study</a>
          <a href="#demo" style={{ color: 'inherit', textDecoration: 'none' }}>Demo</a>
          <a href="#pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a>
        </nav>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <a href="#cta" style={{
            fontSize: 13, color: CN_INK, background: CN_LIME,
            padding: '9px 16px', textDecoration: 'none', fontWeight: 500,
          }}>Book a free audit</a>
        </div>
      </header>

      {/* HERO — split: copy left, live demo right (the demo IS the proof) */}
      <section style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${CN_LINE}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: cnMono, fontSize: 11, color: CN_INK2, letterSpacing: 1, textTransform: 'uppercase', background: CN_SOFT, padding: '6px 10px', marginBottom: 32 }}>
              <span style={{ width: 6, height: 6, background: CN_LIME_DK, borderRadius: '50%' }}></span>
              <span>Q3 2026 · accepting projects</span>
            </div>
            <h1 style={{
              fontSize: 'clamp(44px, 5.4vw, 80px)',
              fontWeight: 500, letterSpacing: -2.5, lineHeight: 1.0,
              margin: 0, maxWidth: 600,
            }}>
              AI systems that organize, automate, and scale your business.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: CN_INK2, margin: '28px 0 0', maxWidth: 520 }}>
              We design and build AI-powered knowledge systems, automations, and internal tools — engineered to reduce manual work, improve response times, and increase conversions.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 36, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#cta" style={{
                fontSize: 14, color: CN_INK, background: CN_LIME,
                padding: '14px 22px', textDecoration: 'none', fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: 10,
              }}>Book a free AI audit <span>→</span></a>
              <a href="#demo" style={{
                fontSize: 14, color: CN_INK,
                padding: '14px 18px', textDecoration: 'none',
                border: `1px solid ${CN_LINE}`, fontWeight: 500,
              }}>Try the demo</a>
            </div>
            <div style={{ marginTop: 48, display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              {[
                ['80%', 'faster replies'],
                ['60%', 'less manual work'],
                ['25%', 'more conversions'],
              ].map(([n, l]) => (
                <div key={n}>
                  <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: -0.8 }}>{n}</div>
                  <div style={{ fontSize: 12, color: CN_DIM, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            background: CN_SOFT, padding: 16, position: 'relative',
            border: `1px solid ${CN_LINE}`,
          }}>
            <div style={{
              position: 'absolute', top: -10, left: 16,
              background: CN_INK, color: CN_LIME, padding: '4px 10px',
              fontFamily: cnMono, fontSize: 10, letterSpacing: 1,
            }}>LIVE · TRY IT</div>
            <ChatConsole accent={CN_INK} lime={CN_LIME_DK} />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — process diagram */}
      <section id="how" style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${CN_LINE}` }}>
        <CnEyebrow num="01" label="The problem" />
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, marginTop: 24, alignItems: 'start' }}>
          <h2 style={{
            fontSize: 'clamp(40px, 4.8vw, 64px)', fontWeight: 500,
            letterSpacing: -2, lineHeight: 1.05, margin: 0,
          }}>
            Most businesses are running on messy, manual systems.
          </h2>
          <div style={{ paddingTop: 12 }}>
            {[
              ['Information', 'scattered across WhatsApp, Docs, emails, PDFs'],
              ['Repetition', 'staff answer the same questions, daily'],
              ['Latency', 'leads lost to slow or inconsistent replies'],
              ['Ceiling', 'manual processes that don\'t scale'],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr',
                padding: '14px 0', borderBottom: `1px solid ${CN_LINE}`,
                alignItems: 'baseline', gap: 16,
              }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{k}</span>
                <span style={{ fontSize: 15, color: CN_INK2, lineHeight: 1.5 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 96 }}>
          <CnEyebrow num="02" label="The solution" />
          <h2 style={{
            fontSize: 'clamp(40px, 4.8vw, 64px)', fontWeight: 500,
            letterSpacing: -2, lineHeight: 1.05, margin: '24px 0 0', maxWidth: 1100,
          }}>
            We build systems that <span style={{ background: CN_LIME, padding: '0 8px' }}>think, respond, and operate</span> for you.
          </h2>
          <p style={{ fontSize: 17, color: CN_INK2, lineHeight: 1.6, maxWidth: 720, marginTop: 28 }}>
            We turn your business knowledge and workflows into structured systems powered by AI — centralizing data, building assistants trained on your business, automating repetitive processes, and improving response times.
          </p>

          {/* Process flow */}
          <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, alignItems: 'stretch' }}>
            {[
              ['Audit', 'We map your workflows and identify the highest-leverage automation opportunities.'],
              ['Structure', 'We organize your scattered data into a retrieval-ready knowledge base.'],
              ['Build', 'We develop AI assistants and automations on top of that structured foundation.'],
              ['Deploy', 'We ship to your team or customers, monitor performance, and improve over time.'],
            ].map(([t, d], i) => (
              <div key={t} style={{
                background: i === 0 ? CN_LIME : CN_SOFT,
                padding: 24, position: 'relative',
              }}>
                <div style={{ fontFamily: cnMono, fontSize: 11, color: CN_INK2, letterSpacing: 1, marginBottom: 12 }}>STEP {String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ fontSize: 24, fontWeight: 600, margin: 0, letterSpacing: -0.6 }}>{t}</h3>
                <p style={{ fontSize: 14, color: CN_INK2, lineHeight: 1.5, margin: '10px 0 0' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — 6 in a 3x2 grid */}
      <section id="services" style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${CN_LINE}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <CnEyebrow num="03" label="What we handle" />
            <h2 style={{ fontSize: 'clamp(40px, 4.8vw, 56px)', fontWeight: 500, letterSpacing: -1.8, margin: '20px 0 0', maxWidth: 800, lineHeight: 1.05 }}>
              End-to-end implementation, from idea to deployment.
            </h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 64, border: `1px solid ${CN_LINE}` }}>
          {[
            ['Strategy & Ideation', ['Identify automation opportunities', 'Map business workflows', 'Define AI use cases']],
            ['Knowledge Base Design', ['Structure FAQs, services, policies', 'Clean scattered information', 'Prepare for retrieval (RAG)']],
            ['AI Development', ['Assistants on Claude / OpenAI GPT', 'Prompt engineering', 'Context-aware retrieval']],
            ['Automation & Integrations', ['Automate replies and lead handling', 'Connect CRM, forms, messaging', 'Reduce manual operations']],
            ['Interface & Deployment', ['Chat interfaces — internal or public', 'Website integration', 'Simple team dashboards']],
            ['Maintenance & Optimization', ['Update knowledge base', 'Improve responses over time', 'Monitor performance']],
          ].map(([title, items], i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            return (
              <div key={title} style={{
                padding: 32,
                borderRight: col < 2 ? `1px solid ${CN_LINE}` : 'none',
                borderBottom: row < 1 ? `1px solid ${CN_LINE}` : 'none',
                display: 'flex', flexDirection: 'column', gap: 16,
                minHeight: 240,
              }}>
                <div style={{ fontFamily: cnMono, fontSize: 11, color: CN_DIM, letterSpacing: 1 }}>0{i + 1}</div>
                <h3 style={{ fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: -0.5 }}>{title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {items.map(it => (
                    <li key={it} style={{ fontSize: 14, color: CN_INK2, lineHeight: 1.5, display: 'flex', gap: 10 }}>
                      <span style={{ color: CN_LIME_DK, fontWeight: 700 }}>+</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* USE CASES + STACK row */}
      <section style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${CN_LINE}`, background: CN_SOFT }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <CnEyebrow num="04" label="Where it pays off" />
            <h2 style={{ fontSize: 40, fontWeight: 500, letterSpacing: -1.5, margin: '20px 0 32px', lineHeight: 1.1 }}>Use cases.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['Customer Support Automation', 'Answer FAQs instantly and consistently'],
                ['Sales & Lead Qualification', 'Guide customers, recommend services, capture leads'],
                ['Internal Knowledge Assistant', 'Help staff access information quickly, reduce onboarding time'],
                ['Operations Automation', 'Reduce repetitive manual processes'],
              ].map(([t, d], i) => (
                <div key={t} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto', gap: 24,
                  padding: '20px 0', borderTop: i === 0 ? `1px solid ${CN_LINE}` : 'none',
                  borderBottom: `1px solid ${CN_LINE}`,
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: -0.3 }}>{t}</div>
                    <div style={{ fontSize: 14, color: CN_INK2, marginTop: 4 }}>{d}</div>
                  </div>
                  <span style={{ color: CN_DIM, fontSize: 18 }}>→</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <CnEyebrow num="05" label="Stack" />
            <h2 style={{ fontSize: 40, fontWeight: 500, letterSpacing: -1.5, margin: '20px 0 32px', lineHeight: 1.1 }}>Tools we use.</h2>
            <div style={{ background: CN_BG, padding: 24, border: `1px solid ${CN_LINE}` }}>
              {[
                ['Knowledge', 'Obsidian · Notion'],
                ['AI Models', 'Claude · OpenAI GPT'],
                ['Retrieval', 'Vector databases · embeddings'],
                ['Automation', 'Zapier · Make'],
                ['Deployment', 'Web · chat widgets'],
              ].map(([k, v], i) => (
                <div key={k} style={{
                  display: 'grid', gridTemplateColumns: '120px 1fr',
                  padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${CN_LINE}`,
                  alignItems: 'baseline', gap: 16,
                }}>
                  <span style={{ fontFamily: cnMono, fontSize: 11, color: CN_DIM, letterSpacing: 1, textTransform: 'uppercase' }}>{k}</span>
                  <span style={{ fontSize: 14, color: CN_INK }}>{v}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: CN_DIM, lineHeight: 1.5, marginTop: 16 }}>Flexible — chosen per project based on your data shape, scale, and existing tooling.</p>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section id="case" style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${CN_LINE}` }}>
        <CnEyebrow num="06" label="Case study" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 24, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, letterSpacing: -2, margin: 0, lineHeight: 1.0 }}>
              NomadNest Travel Co.
            </h2>
            <p style={{ fontSize: 17, color: CN_INK2, lineHeight: 1.55, margin: '20px 0 0', maxWidth: 480 }}>
              A boutique travel agency drowning in repetitive customer questions across email, WhatsApp, and Instagram.
            </p>

            <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div>
                <div style={{ fontFamily: cnMono, fontSize: 11, color: CN_DIM, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Problem</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: CN_INK2, lineHeight: 1.5 }}>
                  <li>· 100+ daily inquiries</li>
                  <li>· slow response times</li>
                  <li>· inconsistent info across channels</li>
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: cnMono, fontSize: 11, color: CN_DIM, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Solution</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: CN_INK2, lineHeight: 1.5 }}>
                  <li>· structured KB</li>
                  <li>· AI assistant for support</li>
                  <li>· automated replies</li>
                </ul>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              ['80%', 'faster response time'],
              ['60%', 'fewer manual replies'],
              ['25%', 'increase in conversions'],
            ].map(([n, l], i) => (
              <div key={n} style={{
                display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'baseline',
                padding: '32px 0', borderTop: i === 0 ? `1px solid ${CN_INK}` : `1px solid ${CN_LINE}`,
                borderBottom: i === 2 ? `1px solid ${CN_INK}` : 'none',
              }}>
                <span style={{ fontSize: 88, fontWeight: 600, letterSpacing: -3, lineHeight: 1, fontFeatureSettings: '"tnum"' }}>{n}</span>
                <span style={{ fontSize: 16, color: CN_INK2, textAlign: 'right' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO — second appearance, full bleed */}
      <section id="demo" style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${CN_LINE}`, background: CN_INK, color: CN_BG }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: cnMono, fontSize: 11, color: CN_LIME, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, background: CN_LIME, borderRadius: '50%', boxShadow: `0 0 0 4px ${CN_LIME}33` }}></span>
          [07] Real example, running live
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, letterSpacing: -2, lineHeight: 1.05, margin: 0 }}>
              The same assistant — try a harder question.
            </h2>
            <p style={{ fontSize: 17, color: '#bbb', lineHeight: 1.6, margin: '24px 0 0', maxWidth: 460 }}>
              This is the actual NomadNest assistant, trained on company data, running with retrieval. Ask about edge cases — refunds inside 14 days, custom itineraries, payment plans — and watch it handle them.
            </p>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12, fontFamily: cnMono, fontSize: 12, color: '#999' }}>
              <div>· model: claude-haiku-4-5</div>
              <div>· kb: 47 docs, 312 retrieval chunks</div>
              <div>· avg latency: 1.2s · uptime: 99.94%</div>
            </div>
          </div>
          <div style={{ background: CN_BG, color: CN_INK, padding: 4, border: `1px solid #333` }}>
            <ChatConsole accent={CN_INK} lime={CN_LIME_DK} />
          </div>
        </div>
      </section>

      {/* OFFER / PRICING */}
      <section id="pricing" style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${CN_LINE}` }}>
        <CnEyebrow num="08" label="The offer" />
        <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, letterSpacing: -2, margin: '20px 0 56px', maxWidth: 900, lineHeight: 1.05 }}>
          AI Knowledge System Setup. One scope, one price.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 0, border: `1px solid ${CN_INK}` }}>
          <div style={{ padding: 40, borderRight: `1px solid ${CN_INK}` }}>
            <div style={{ fontFamily: cnMono, fontSize: 11, color: CN_DIM, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>Scope</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['Knowledge base structuring', 'Audit, clean, organize, and prepare for retrieval.'],
                ['AI assistant development', 'Build and tune the agent on your data.'],
                ['Workflow automation', 'Connect tools, automate replies and lead handling.'],
                ['Deployment + training', 'Ship it. Train your team. Hand off cleanly.'],
              ].map(([t, d]) => (
                <li key={t} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 12 }}>
                  <span style={{ color: CN_LIME_DK, fontWeight: 700, fontSize: 18 }}>+</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600 }}>{t}</div>
                    <div style={{ fontSize: 14, color: CN_INK2, marginTop: 2 }}>{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ padding: 40, background: CN_LIME, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: cnMono, fontSize: 11, color: CN_INK2, letterSpacing: 1, textTransform: 'uppercase' }}>Setup · one-time</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 64, fontWeight: 600, letterSpacing: -2.5, lineHeight: 1 }}>RM3K</span>
                <span style={{ fontSize: 18, color: CN_INK2 }}>– RM8K</span>
              </div>
              <div style={{ height: 1, background: CN_INK, opacity: 0.2, margin: '32px 0' }}></div>
              <div style={{ fontFamily: cnMono, fontSize: 11, color: CN_INK2, letterSpacing: 1, textTransform: 'uppercase' }}>Maintenance · monthly</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: -1.2, lineHeight: 1 }}>RM500</span>
                <span style={{ fontSize: 16, color: CN_INK2 }}>/ mo</span>
              </div>
            </div>
            <a href="#cta" style={{
              marginTop: 32, fontSize: 14, color: CN_LIME, background: CN_INK,
              padding: '14px 20px', textDecoration: 'none', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: 10, justifyContent: 'space-between',
            }}>Start with a free audit <span>→</span></a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${CN_LINE}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'end' }}>
          <h2 style={{
            fontSize: 'clamp(56px, 7vw, 104px)',
            fontWeight: 500, letterSpacing: -3.5, lineHeight: 0.95, margin: 0,
          }}>
            Replace manual work with <span style={{ background: CN_LIME, padding: '0 12px' }}>systems that scale</span>.
          </h2>
          <div>
            <p style={{ fontSize: 17, color: CN_INK2, lineHeight: 1.55, margin: 0, maxWidth: 420 }}>
              Book a free audit and we'll identify where AI can reduce workload and improve operations — concrete wins, no fluff.
            </p>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              marginTop: 28, fontSize: 16, color: CN_BG, background: CN_INK,
              padding: '18px 28px', textDecoration: 'none', fontWeight: 500,
            }}>Book my free AI audit <span>→</span></a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${CN_LINE}` }}>
        <CnEyebrow num="09" label="FAQ" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, marginTop: 24 }}>
          <h2 style={{ fontSize: 40, fontWeight: 500, letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>Common questions.</h2>
          <div>
            {[
              ['What do you need from us?', 'Access to your existing documents, FAQs, and workflows. We handle the structuring, cleaning, and integration from there.'],
              ['How long does setup take?', 'Typically 5–10 days, depending on the size of your knowledge base and the number of integrations.'],
              ['Do you customize for each business?', 'Yes — every system is tailored to your workflows, data, and the specific outcomes you want to drive.'],
            ].map(([q, a], i) => (
              <div key={q} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{
                borderTop: `1px solid ${CN_LINE}`, padding: '20px 0', cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                  <h4 style={{ fontSize: 19, fontWeight: 600, margin: 0, letterSpacing: -0.3 }}>{q}</h4>
                  <span style={{ fontFamily: cnMono, color: CN_DIM, fontSize: 18 }}>{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && (
                  <p style={{ fontSize: 15, color: CN_INK2, lineHeight: 1.6, margin: '12px 0 0', maxWidth: 720 }}>{a}</p>
                )}
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${CN_LINE}` }}></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: `40px ${pad}px` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 600 }}>
            <span style={{ width: 22, height: 22, background: CN_INK, color: CN_LIME, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: cnMono, fontSize: 12, fontWeight: 700 }}>◆</span>
            northsouth
          </div>
          <div style={{ fontSize: 13, color: CN_DIM }}>
            AI systems · Automation · Knowledge infrastructure
          </div>
          <div style={{ fontFamily: cnMono, fontSize: 12, color: CN_DIM }}>© 2026</div>
        </div>
      </footer>
    </div>
  );
}

window.ConsolePage = ConsolePage;
