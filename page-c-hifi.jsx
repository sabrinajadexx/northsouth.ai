// C · CONSOLE — Hi-fi standalone
// Minimal Swiss + Fraunces italic for emphasis. Demo-led product page.
// Tweakable: accent, display style, hero layout, dark mode, hero stats, density.

const ACCENTS = {
  lime:    { base: '#a3e635', dark: '#7aac1f', onLight: '#0a0a0a', name: 'Lime' },
  cobalt:  { base: '#3b5bdb', dark: '#2845b8', onLight: '#ffffff', name: 'Cobalt' },
  sunset:  { base: '#f06a3e', dark: '#c2410c', onLight: '#ffffff', name: 'Sunset' },
  mono:    { base: '#0a0a0a', dark: '#0a0a0a', onLight: '#ffffff', name: 'Monochrome' },
};

function CnPage({ tweaks }) {
  const { density, accent: accentKey, display, heroLayout, dark, heroStats } = tweaks;
  const A = ACCENTS[accentKey] || ACCENTS.lime;
  const accent = A.base;
  const accentDark = A.dark;
  const onAccent = A.onLight;

  // Theme colors
  const T = dark ? {
    bg: '#0a0a0a', ink: '#f5f5f4', ink2: '#bbb', dim: '#777',
    line: '#1f1f1f', soft: '#161616', surface: '#0f0f0f',
    invBg: '#f5f5f4', invInk: '#0a0a0a',
  } : {
    bg: '#ffffff', ink: '#0a0a0a', ink2: '#3a3a3a', dim: '#888',
    line: '#ececec', soft: '#f7f7f5', surface: '#fafafa',
    invBg: '#0a0a0a', invInk: '#ffffff',
  };

  const sans = '"IBM Plex Sans", -apple-system, sans-serif';
  const mono = '"IBM Plex Mono", ui-monospace, monospace';
  const serif = '"IBM Plex Serif", "Times New Roman", serif';

  // Display style — kept for tweak compatibility but neutralized.
  // Emphasis words now share the headline weight/family. Color is the only differentiator
  // unless 'serif-accent' is chosen, which uses Plex Serif (same family, slight humanist note).
  const Em = ({ children, color, weight }) => {
    if (display === 'mixed' /* Plex Serif accent */) {
      return (
        <span style={{
          fontFamily: serif,
          fontWeight: weight || 500,
          color: color || (dark ? accent : T.ink),
        }}>{children}</span>
      );
    }
    if (display === 'italic' /* underlined accent */) {
      return (
        <span style={{
          fontWeight: weight || 500,
          color: color || (dark ? accent : T.ink),
          borderBottom: `2px solid ${dark ? accent : accentDark}`,
          paddingBottom: 2,
        }}>{children}</span>
      );
    }
    // 'pure' — color only
    return (
      <span style={{
        fontWeight: weight || 500,
        color: color || (dark ? accent : T.ink),
      }}>{children}</span>
    );
  };

  const pad = density === 'compact' ? 64 : 96;
  const sectionGap = density === 'compact' ? 90 : 140;
  const [openFaq, setOpenFaq] = React.useState(0);
  const [hoveredService, setHoveredService] = React.useState(null);

  return (
    <div style={{ background: T.bg, color: T.ink, fontFamily: sans, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Abstract background watermarks */}
      <BackgroundFigures dark={dark} accent={accent} T={T} />
      {/* NAV */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        padding: `18px ${pad}px`,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', gap: 24,
        background: dark ? 'rgba(10,10,10,0.85)' : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${T.line}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 500, letterSpacing: -0.2 }}>
          <span style={{
            width: 24, height: 24, background: T.ink, color: accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: mono, fontSize: 13, fontWeight: 600,
          }}>◆</span>
          northsouth<span style={{ color: T.dim, fontWeight: 400, marginLeft: 2 }}>/ai</span>
        </div>
        <nav style={{ display: 'flex', gap: 28, fontSize: 13, color: T.ink2, justifyContent: 'center' }}>
          <a href="#how" style={{ color: 'inherit', textDecoration: 'none' }}>How it works</a>
          <a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a>
          <a href="#case" style={{ color: 'inherit', textDecoration: 'none' }}>Case study</a>
          <a href="#demo" style={{ color: 'inherit', textDecoration: 'none' }}>Demo</a>
          <a href="#pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a>
        </nav>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <a href="#cta" style={{
            fontSize: 13, color: onAccent, background: accent,
            padding: '10px 18px', textDecoration: 'none', fontWeight: 500,
          }}>Book a free audit</a>
        </div>
      </header>

      {/* HERO */}
      <Hero tweaks={tweaks} T={T} accent={accent} accentDark={accentDark} onAccent={onAccent} pad={pad} sectionGap={sectionGap} sans={sans} mono={mono} Em={Em} />

      {/* PROBLEM + SOLUTION */}
      <section id="how" style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${T.line}` }}>
        <Eyebrow num="01" label="The problem" T={T} />
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, marginTop: 24, alignItems: 'start' }}>
          <h2 style={{ fontSize: 'clamp(40px, 4.8vw, 64px)', fontWeight: 500, letterSpacing: -2, lineHeight: 1.05, margin: 0 }}>
            Most businesses are running on <Em>messy</Em>, <Em>manual</Em> systems.
          </h2>
          <div style={{ paddingTop: 12 }}>
            {[
              ['Information', 'scattered across WhatsApp, Docs, emails, and PDFs'],
              ['Repetition', 'staff answer the same questions, daily'],
              ['Latency', 'leads lost to slow or inconsistent replies'],
              ['Ceiling', "manual processes that don't scale"],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr',
                padding: '14px 0', borderBottom: `1px solid ${T.line}`,
                alignItems: 'baseline', gap: 16,
              }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{k}</span>
                <span style={{ fontSize: 15, color: T.ink2, lineHeight: 1.5 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 96 }}>
          <Eyebrow num="02" label="The solution" T={T} />
          <h2 style={{ fontSize: 'clamp(40px, 4.8vw, 64px)', fontWeight: 500, letterSpacing: -2, lineHeight: 1.05, margin: '24px 0 0', maxWidth: 1100 }}>
            We build systems that <span style={{ background: accent, color: onAccent, padding: '0 10px' }}>think, respond, and operate</span> for you.
          </h2>
          <p style={{ fontSize: 17, color: T.ink2, lineHeight: 1.6, maxWidth: 720, marginTop: 28 }}>
            We turn your business knowledge and workflows into structured systems powered by AI — centralizing data, building assistants trained on your business, automating repetitive processes, and improving response times.
          </p>

          <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, alignItems: 'stretch' }}>
            {[
              ['Audit', 'We map your workflows and identify the highest-leverage automation opportunities.'],
              ['Structure', 'We organize your scattered data into a retrieval-ready knowledge base.'],
              ['Build', 'We develop AI assistants and automations on top of that structured foundation.'],
              ['Deploy', 'We ship to your team or customers, monitor performance, and improve over time.'],
            ].map(([t, d], i) => (
              <div key={t} style={{
                background: i === 0 ? accent : T.soft,
                color: i === 0 ? onAccent : T.ink,
                padding: 28, position: 'relative',
              }}>
                <div style={{ fontFamily: mono, fontSize: 11, color: i === 0 ? onAccent : T.dim, opacity: i === 0 ? 0.7 : 1, letterSpacing: 1, marginBottom: 14 }}>STEP {String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ fontSize: 26, fontWeight: 500, margin: 0, letterSpacing: -0.5 }}>{t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5, margin: '12px 0 0', opacity: i === 0 ? 0.85 : 1, color: i === 0 ? onAccent : T.ink2 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${T.line}` }}>
        <Eyebrow num="03" label="What we handle" T={T} />
        <h2 style={{ fontSize: 'clamp(40px, 4.8vw, 56px)', fontWeight: 500, letterSpacing: -1.8, margin: '20px 0 0', maxWidth: 800, lineHeight: 1.05 }}>
          End-to-end implementation, <Em>from idea to deployment</Em>.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 64, border: `1px solid ${T.line}` }}>
          {[
            ['Strategy & Ideation', ['Identify automation opportunities', 'Map business workflows', 'Define AI use cases'], 'compass'],
            ['Knowledge Base Design', ['Structure FAQs, services, policies', 'Clean scattered information', 'Prepare for retrieval (RAG)'], 'stack'],
            ['AI Development', ['Assistants on Claude / OpenAI GPT', 'Prompt engineering', 'Context-aware retrieval'], 'core'],
            ['Automation & Integrations', ['Automate replies and lead handling', 'Connect CRM, forms, messaging', 'Reduce manual operations'], 'flow'],
            ['Interface & Deployment', ['Chat interfaces — internal or public', 'Website integration', 'Simple team dashboards'], 'window'],
            ['Maintenance & Optimization', ['Update knowledge base', 'Improve responses over time', 'Monitor performance'], 'pulse'],
          ].map(([title, items, icon], i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const hovered = hoveredService === i;
            return (
              <div key={title}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                style={{
                  padding: 32,
                  borderRight: col < 2 ? `1px solid ${T.line}` : 'none',
                  borderBottom: row < 1 ? `1px solid ${T.line}` : 'none',
                  display: 'flex', flexDirection: 'column', gap: 18,
                  minHeight: 280,
                  background: hovered ? T.soft : 'transparent',
                  transition: 'background .2s',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <ServiceIcon kind={icon} accent={accentDark} dark={dark} T={T} />
                  <div style={{ fontFamily: mono, fontSize: 11, color: T.dim, letterSpacing: 1 }}>0{i + 1}</div>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 500, margin: 0, letterSpacing: -0.4 }}>{title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {items.map(it => (
                    <li key={it} style={{ fontSize: 14, color: T.ink2, lineHeight: 1.55, display: 'flex', gap: 10 }}>
                      <span style={{ color: accentDark, fontWeight: 500 }}>+</span>
                      <span style={{ fontFamily: serif }}>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* USE CASES + STACK */}
      <section style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${T.line}`, background: T.soft }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'start' }}>
          <div>
            <Eyebrow num="04" label="Where it pays off" T={T} />
            <h2 style={{ fontSize: 40, fontWeight: 500, letterSpacing: -1.5, margin: '20px 0 32px', lineHeight: 1.1 }}>
              <Em>Use cases</Em>.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                ['Customer Support Automation', 'Answer FAQs instantly and consistently'],
                ['Sales & Lead Qualification', 'Guide customers, recommend services, capture leads'],
                ['Internal Knowledge Assistant', 'Help staff access information quickly, reduce onboarding time'],
                ['Operations Automation', 'Reduce repetitive manual processes'],
              ].map(([t, d], i) => (
                <div key={t} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto', gap: 24,
                  padding: '20px 0', borderTop: i === 0 ? `1px solid ${T.line}` : 'none',
                  borderBottom: `1px solid ${T.line}`,
                  alignItems: 'center',
                  cursor: 'pointer',
                }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: -0.2 }}>{t}</div>
                    <div style={{ fontSize: 14, color: T.ink2, marginTop: 4, fontFamily: serif }}>{d}</div>
                  </div>
                  <span style={{ color: T.dim, fontSize: 18 }}>→</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow num="05" label="Stack" T={T} />
            <h2 style={{ fontSize: 40, fontWeight: 500, letterSpacing: -1.5, margin: '20px 0 32px', lineHeight: 1.1 }}>
              <Em>Tools</Em> we use.
            </h2>
            <div style={{ background: T.bg, padding: 24, border: `1px solid ${T.line}` }}>
              {[
                ['Knowledge', 'Obsidian · Notion'],
                ['AI Models', 'Claude · OpenAI GPT'],
                ['Retrieval', 'Vector databases · embeddings'],
                ['Automation', 'Zapier · Make'],
                ['Deployment', 'Web · chat widgets'],
              ].map(([k, v], i) => (
                <div key={k} style={{
                  display: 'grid', gridTemplateColumns: '120px 1fr',
                  padding: '12px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.line}`,
                  alignItems: 'baseline', gap: 16,
                }}>
                  <span style={{ fontFamily: mono, fontSize: 11, color: T.dim, letterSpacing: 1, textTransform: 'uppercase' }}>{k}</span>
                  <span style={{ fontSize: 14, color: T.ink }}>{v}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.5, marginTop: 16 }}>Flexible — chosen per project based on your data shape, scale, and existing tooling.</p>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section id="case" style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${T.line}` }}>
        <Eyebrow num="06" label="Case study" T={T} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 24, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, letterSpacing: -2, margin: 0, lineHeight: 1.0 }}>
              NomadNest <Em>Travel Co.</Em>
            </h2>
            <p style={{ fontSize: 17, color: T.ink2, lineHeight: 1.6, margin: '20px 0 0', maxWidth: 480, fontFamily: serif }}>
              A boutique travel agency drowning in repetitive customer questions across email, WhatsApp, and Instagram.
            </p>
            <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div>
                <div style={{ fontFamily: mono, fontSize: 11, color: T.dim, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Problem</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>
                  <li>· 100+ daily inquiries</li>
                  <li>· slow response times</li>
                  <li>· inconsistent info across channels</li>
                </ul>
              </div>
              <div>
                <div style={{ fontFamily: mono, fontSize: 11, color: T.dim, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Solution</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: T.ink2, lineHeight: 1.5 }}>
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
                padding: '32px 0',
                borderTop: i === 0 ? `1px solid ${T.ink}` : `1px solid ${T.line}`,
                borderBottom: i === 2 ? `1px solid ${T.ink}` : 'none',
              }}>
                <span style={{
                  fontSize: 96, letterSpacing: -3, lineHeight: 1, fontFeatureSettings: '"tnum"',
                  fontFamily: sans,
                  fontWeight: 400,
                  color: T.ink,
                }}>{n}</span>
                <span style={{ fontSize: 16, color: T.ink2, textAlign: 'right' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO — full-bleed dark */}
      <section id="demo" style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${T.line}`, background: '#0a0a0a', color: '#f5f5f4' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: mono, fontSize: 11, color: accent, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, background: accent, borderRadius: '50%', boxShadow: `0 0 0 4px ${accent}33` }}></span>
          [07] Real example, running live
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, letterSpacing: -2, lineHeight: 1.05, margin: 0 }}>
              An assistant that <Em color={accent}>actually</Em> knows your business.
            </h2>
            <p style={{ fontSize: 17, color: '#bbb', lineHeight: 1.65, margin: '24px 0 0', maxWidth: 480, fontFamily: serif }}>
              This is the actual NomadNest assistant, trained on company data, running with retrieval. Ask about edge cases — refunds inside 14 days, custom itineraries, payment plans — and watch it handle them.
            </p>
            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10, fontFamily: mono, fontSize: 12, color: '#888' }}>
              <div>· model: claude-haiku-4-5</div>
              <div>· kb: 47 docs, 312 retrieval chunks</div>
              <div>· avg latency: 1.2s · uptime: 99.94%</div>
            </div>
          </div>
          <div style={{ background: '#fff', color: '#0a0a0a', padding: 4, border: `1px solid #2a2a2a` }}>
            <ChatConsole accent={'#0a0a0a'} lime={accentDark} />
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section id="pricing" style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${T.line}` }}>
        <Eyebrow num="08" label="The offer" T={T} />
        <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500, letterSpacing: -2, margin: '20px 0 56px', maxWidth: 900, lineHeight: 1.05 }}>
          AI Knowledge System Setup. <Em>One scope, one price.</Em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 0, border: `1px solid ${T.ink}` }}>
          <div style={{ padding: 40, borderRight: `1px solid ${T.ink}` }}>
            <div style={{ fontFamily: mono, fontSize: 11, color: T.dim, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>Scope</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['Knowledge base structuring', 'Audit, clean, organize, and prepare for retrieval.'],
                ['AI assistant development', 'Build and tune the agent on your data.'],
                ['Workflow automation', 'Connect tools, automate replies and lead handling.'],
                ['Deployment + training', 'Ship it. Train your team. Hand off cleanly.'],
              ].map(([t, d]) => (
                <li key={t} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 12 }}>
                  <span style={{ color: accentDark, fontWeight: 500, fontSize: 18 }}>+</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 500 }}>{t}</div>
                    <div style={{ fontSize: 14, color: T.ink2, marginTop: 2, fontFamily: serif }}>{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ padding: 40, background: accent, color: onAccent, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 11, opacity: 0.7, letterSpacing: 1, textTransform: 'uppercase' }}>Setup · one-time</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span style={{
                  fontSize: 64, letterSpacing: -2, lineHeight: 1,
                  fontFamily: sans,
                  fontWeight: 500,
                  fontVariantNumeric: 'tabular-nums',
                }}>RM3K</span>
                <span style={{ fontSize: 18, opacity: 0.7 }}>– RM8K</span>
              </div>
              <div style={{ height: 1, background: onAccent, opacity: 0.2, margin: '32px 0' }}></div>
              <div style={{ fontFamily: mono, fontSize: 11, opacity: 0.7, letterSpacing: 1, textTransform: 'uppercase' }}>Maintenance · monthly</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                <span style={{
                  fontSize: 40, letterSpacing: -1, lineHeight: 1,
                  fontFamily: sans,
                  fontWeight: 500,
                  fontVariantNumeric: 'tabular-nums',
                }}>RM500</span>
                <span style={{ fontSize: 16, opacity: 0.7 }}>/ mo</span>
              </div>
            </div>
            <a href="#cta" style={{
              marginTop: 32, fontSize: 14, color: accent, background: '#0a0a0a',
              padding: '14px 20px', textDecoration: 'none', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: 10, justifyContent: 'space-between',
            }}>Start with a free audit <span>→</span></a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${T.line}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'end' }}>
          <h2 style={{ fontSize: 'clamp(56px, 7vw, 104px)', fontWeight: 500, letterSpacing: -3.5, lineHeight: 0.95, margin: 0 }}>
            Replace manual work with <span style={{ background: accent, color: onAccent, padding: '0 14px' }}>systems that scale</span>.
          </h2>
          <div>
            <p style={{ fontSize: 17, color: T.ink2, lineHeight: 1.65, margin: 0, maxWidth: 420, fontFamily: serif }}>
              Book a free audit and we'll identify where AI can reduce workload and improve operations — concrete wins, no fluff.
            </p>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              marginTop: 28, fontSize: 16, color: T.invInk, background: T.invBg,
              padding: '18px 28px', textDecoration: 'none', fontWeight: 500,
            }}>Book my free AI audit <span>→</span></a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${T.line}` }}>
        <Eyebrow num="09" label="FAQ" T={T} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, marginTop: 24 }}>
          <h2 style={{ fontSize: 40, fontWeight: 500, letterSpacing: -1.5, margin: 0, lineHeight: 1.1 }}>
            <Em>Common</Em> questions.
          </h2>
          <div>
            {[
              ['What do you need from us?', 'Access to your existing documents, FAQs, and workflows. We handle the structuring, cleaning, and integration from there.'],
              ['How long does setup take?', 'Typically 5–10 days, depending on the size of your knowledge base and the number of integrations.'],
              ['Do you customize for each business?', 'Yes — every system is tailored to your workflows, data, and the specific outcomes you want to drive.'],
              ['What does maintenance cover?', 'Ongoing knowledge base updates, response tuning, integration health checks, and a monthly performance report.'],
            ].map(([q, a], i) => (
              <div key={q} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{
                borderTop: `1px solid ${T.line}`, padding: '20px 0', cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                  <h4 style={{ fontSize: 19, fontWeight: 500, margin: 0, letterSpacing: -0.2 }}>{q}</h4>
                  <span style={{ fontFamily: mono, color: T.dim, fontSize: 18 }}>{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && (
                  <p style={{ fontSize: 15, color: T.ink2, lineHeight: 1.6, margin: '12px 0 0', maxWidth: 720 }}>{a}</p>
                )}
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${T.line}` }}></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: `48px ${pad}px`, background: T.soft }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, alignItems: 'start', marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, fontWeight: 600 }}>
              <span style={{ width: 24, height: 24, background: T.ink, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 13, fontWeight: 700 }}>◆</span>
              northsouth<span style={{ color: T.dim, fontWeight: 400, marginLeft: 2 }}>/ai</span>
            </div>
            <p style={{ fontSize: 14, color: T.ink2, lineHeight: 1.6, margin: '16px 0 0', maxWidth: 280, fontFamily: '"IBM Plex Serif", "Times New Roman", serif' }}>
              AI systems, automation, and knowledge infrastructure — built for efficiency and scale.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: T.dim, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Sections</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              <a href="#how" style={{ color: T.ink, textDecoration: 'none' }}>How it works</a>
              <a href="#services" style={{ color: T.ink, textDecoration: 'none' }}>Services</a>
              <a href="#case" style={{ color: T.ink, textDecoration: 'none' }}>Case study</a>
              <a href="#demo" style={{ color: T.ink, textDecoration: 'none' }}>Live demo</a>
              <a href="#pricing" style={{ color: T.ink, textDecoration: 'none' }}>Pricing</a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: mono, fontSize: 11, color: T.dim, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
              <a href="mailto:hello@northsouth.ai" style={{ color: T.ink, textDecoration: 'none' }}>hello@northsouth.ai</a>
              <a href="#" style={{ color: T.ink, textDecoration: 'none' }}>Schedule a call →</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: mono, fontSize: 11, color: T.dim, letterSpacing: 0.5 }}>
          <div>© 2026 northsouth/ai · all rights reserved</div>
          <div>Built for efficiency and scale</div>
        </div>
      </footer>
    </div>
  );
}

// ── HERO with three layouts ────────────────────────────────
function Hero({ tweaks, T, accent, accentDark, onAccent, pad, sectionGap, sans, mono, Em }) {
  const { heroLayout, heroStats, dark } = tweaks;

  const headline = (
    <h1 style={{
      fontSize: heroLayout === 'centered' ? 'clamp(56px, 7vw, 104px)' : 'clamp(44px, 5.4vw, 80px)',
      fontWeight: 500, letterSpacing: heroLayout === 'centered' ? -3 : -2.5, lineHeight: 0.98,
      margin: 0, maxWidth: heroLayout === 'centered' ? 1200 : 620,
      textAlign: heroLayout === 'centered' ? 'center' : 'left',
      marginInline: heroLayout === 'centered' ? 'auto' : 0,
    }}>
      AI systems that <Em>organize</Em>, <Em>automate</Em>, and <Em>scale</Em> your business.
    </h1>
  );

  const sub = (
    <p style={{
      fontSize: 18, lineHeight: 1.65, color: T.ink2,
      margin: heroLayout === 'centered' ? '28px auto 0' : '28px 0 0',
      maxWidth: 540,
      textAlign: heroLayout === 'centered' ? 'center' : 'left',
      fontFamily: '"IBM Plex Serif", "Times New Roman", serif',
    }}>
      We design and build AI-powered knowledge systems, automations, and internal tools — engineered to reduce manual work, improve response times, and increase conversions.
    </p>
  );

  const ctas = (
    <div style={{
      display: 'flex', gap: 12, marginTop: 36, alignItems: 'center', flexWrap: 'wrap',
      justifyContent: heroLayout === 'centered' ? 'center' : 'flex-start',
    }}>
      <a href="#cta" style={{
        fontSize: 14, color: onAccent, background: accent,
        padding: '14px 22px', textDecoration: 'none', fontWeight: 500,
        display: 'inline-flex', alignItems: 'center', gap: 10,
      }}>Book a free AI audit <span>→</span></a>
      <a href="#demo" style={{
        fontSize: 14, color: T.ink,
        padding: '14px 18px', textDecoration: 'none',
        border: `1px solid ${T.line}`, fontWeight: 500,
      }}>Try the demo</a>
    </div>
  );

  const stats = heroStats && (
    <div style={{
      marginTop: 48, display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap',
      justifyContent: heroLayout === 'centered' ? 'center' : 'flex-start',
    }}>
      {[
        ['80%', 'faster replies'],
        ['60%', 'less manual work'],
        ['25%', 'more conversions'],
      ].map(([n, l]) => (
        <div key={n}>
          <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: -0.7, fontVariantNumeric: 'tabular-nums' }}>{n}</div>
          <div style={{ fontSize: 12, color: T.dim, marginTop: 2 }}>{l}</div>
        </div>
      ))}
    </div>
  );

  const eyebrow = (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: mono, fontSize: 11, color: T.ink2, letterSpacing: 1, textTransform: 'uppercase',
      background: T.soft, padding: '6px 10px', marginBottom: 32,
    }}>
      <span style={{ width: 6, height: 6, background: accentDark, borderRadius: '50%' }}></span>
      <span>Q3 2026 · accepting projects</span>
    </div>
  );

  if (heroLayout === 'split') {
    return (
      <section style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${T.line}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            {eyebrow}
            {headline}
            {sub}
            {ctas}
            {stats}
          </div>
          <div style={{ background: T.soft, padding: 16, position: 'relative', border: `1px solid ${T.line}` }}>
            <div style={{
              position: 'absolute', top: -10, left: 16,
              background: T.ink, color: accent, padding: '4px 10px',
              fontFamily: mono, fontSize: 10, letterSpacing: 1,
            }}>LIVE · TRY IT</div>
            <ChatConsole accent={T.ink} lime={accentDark} />
          </div>
        </div>
      </section>
    );
  }

  if (heroLayout === 'dark') {
    return (
      <section style={{ padding: `${sectionGap}px ${pad}px ${sectionGap - 30}px`, borderBottom: `1px solid ${T.line}`, background: '#0a0a0a', color: '#f5f5f4' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: mono, fontSize: 11, color: '#bbb', letterSpacing: 1, textTransform: 'uppercase',
            background: '#1a1a1a', padding: '6px 10px', marginBottom: 32, border: '1px solid #222',
          }}>
            <span style={{ width: 6, height: 6, background: accent, borderRadius: '50%' }}></span>
            <span>Q3 2026 · accepting projects</span>
          </div>
          <h1 style={{
            fontSize: 'clamp(56px, 7vw, 108px)',
            fontWeight: 500, letterSpacing: -3.5, lineHeight: 0.95,
            margin: 0, maxWidth: 1300, marginInline: 'auto', color: '#f5f5f4',
          }}>
            AI systems that <Em color={accent}>organize</Em>, <Em color={accent}>automate</Em>, and <Em color={accent}>scale</Em> your business.
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.65, color: '#bbb', margin: '32px auto 0', maxWidth: 640, fontFamily: '"IBM Plex Serif", "Times New Roman", serif' }}>
            We design and build AI-powered knowledge systems, automations, and internal tools — engineered to reduce manual work, improve response times, and increase conversions.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#cta" style={{
              fontSize: 14, color: onAccent, background: accent,
              padding: '14px 22px', textDecoration: 'none', fontWeight: 500,
            }}>Book a free AI audit →</a>
            <a href="#demo" style={{
              fontSize: 14, color: '#f5f5f4',
              padding: '14px 18px', textDecoration: 'none',
              border: `1px solid #2a2a2a`, fontWeight: 500,
            }}>Try the demo</a>
          </div>
        </div>
        <div style={{ maxWidth: 980, margin: '0 auto', background: '#fff', color: '#0a0a0a', padding: 4, border: '1px solid #2a2a2a' }}>
          <ChatConsole accent={'#0a0a0a'} lime={accentDark} />
        </div>
        {heroStats && (
          <div style={{ display: 'flex', gap: 56, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginTop: 56 }}>
            {[['80%', 'faster replies'], ['60%', 'less manual work'], ['25%', 'more conversions']].map(([n, l]) => (
              <div key={n} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 500, letterSpacing: -0.9, color: '#f5f5f4', fontVariantNumeric: 'tabular-nums' }}>{n}</div>
                <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  // centered
  return (
    <section style={{ padding: `${sectionGap}px ${pad}px`, borderBottom: `1px solid ${T.line}`, textAlign: 'center' }}>
      {eyebrow}
      {headline}
      {sub}
      {ctas}
      {stats}
    </section>
  );
}

function Eyebrow({ num, label, T }) {
  const mono = '"JetBrains Mono", monospace';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: mono, fontSize: 11, color: T.dim, letterSpacing: 1, textTransform: 'uppercase' }}>
      <span style={{ color: T.ink, fontWeight: 500 }}>[{num}]</span>
      <span>{label}</span>
    </div>
  );
}

function ServiceIcon({ kind, accent, dark, T }) {
  const stroke = accent;
  const size = 28;
  const props = { width: size, height: size, viewBox: '0 0 28 28', fill: 'none', stroke, strokeWidth: 1.5 };
  const shapes = {
    compass: <g><circle cx="14" cy="14" r="10" /><path d="M10 18 L14 8 L18 18 L14 14 Z" fill={stroke} stroke="none" /></g>,
    stack:   <g><rect x="4" y="6" width="20" height="4" /><rect x="4" y="12" width="20" height="4" /><rect x="4" y="18" width="20" height="4" /></g>,
    core:    <g><circle cx="14" cy="14" r="3" fill={stroke} stroke="none" /><circle cx="14" cy="14" r="7" /><circle cx="14" cy="14" r="11" /></g>,
    flow:    <g><circle cx="6" cy="14" r="2" fill={stroke} stroke="none" /><circle cx="22" cy="14" r="2" fill={stroke} stroke="none" /><circle cx="14" cy="6" r="2" fill={stroke} stroke="none" /><circle cx="14" cy="22" r="2" fill={stroke} stroke="none" /><path d="M8 14 L20 14 M14 8 L14 20" /></g>,
    window:  <g><rect x="4" y="6" width="20" height="16" /><path d="M4 10 L24 10 M7 8 L9 8" /></g>,
    pulse:   <g><path d="M2 14 L8 14 L11 6 L17 22 L20 14 L26 14" /></g>,
  };
  return (
    <div style={{
      width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: `1px solid ${T.line}`, background: T.bg,
    }}>
      <svg {...props}>{shapes[kind] || shapes.core}</svg>
    </div>
  );
}

window.CnPage = CnPage;

// Subtle abstract background — blueprint grid + faint geometric watermarks
function BackgroundFigures({ dark, accent, T }) {
  const lineColor = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.035)';
  const inkColor = dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)';
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      backgroundImage:
        `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
      backgroundSize: '64px 64px',
      maskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)',
      WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)',
    }}>
      {/* Concentric circles — top right */}
      <svg style={{ position: 'absolute', top: 80, right: -120, width: 480, height: 480, opacity: 1 }} viewBox="0 0 480 480" fill="none">
        {[60, 110, 160, 210].map((r, i) => (
          <circle key={r} cx="240" cy="240" r={r} stroke={inkColor} strokeWidth={i === 1 ? 1.5 : 1} strokeDasharray={i === 2 ? '4 6' : 'none'} />
        ))}
        <circle cx="240" cy="240" r="4" fill={inkColor} />
        <line x1="240" y1="30" x2="240" y2="450" stroke={inkColor} strokeWidth="0.5" />
        <line x1="30" y1="240" x2="450" y2="240" stroke={inkColor} strokeWidth="0.5" />
      </svg>
      {/* Diagram triangle — mid left */}
      <svg style={{ position: 'absolute', top: 1100, left: -80, width: 360, height: 360 }} viewBox="0 0 360 360" fill="none">
        <polygon points="180,40 320,300 40,300" stroke={inkColor} strokeWidth="1" />
        <polygon points="180,40 320,300 40,300" stroke={inkColor} strokeWidth="1" strokeDasharray="3 5" transform="translate(20 -10)" />
        <line x1="180" y1="40" x2="180" y2="300" stroke={inkColor} strokeWidth="0.5" />
        <circle cx="180" cy="40" r="3" fill={inkColor} />
        <circle cx="320" cy="300" r="3" fill={inkColor} />
        <circle cx="40" cy="300" r="3" fill={inkColor} />
      </svg>
      {/* Tech stack diagram — right side mid page */}
      <svg style={{ position: 'absolute', top: 2600, right: 60, width: 280, height: 380 }} viewBox="0 0 280 380" fill="none">
        {[0, 1, 2, 3, 4].map(i => (
          <rect key={i} x={20 + i * 8} y={20 + i * 12} width="200" height="50" stroke={inkColor} strokeWidth="1" />
        ))}
        <line x1="20" y1="260" x2="260" y2="260" stroke={inkColor} strokeWidth="0.5" />
        <line x1="20" y1="280" x2="180" y2="280" stroke={inkColor} strokeWidth="0.5" />
        <line x1="20" y1="300" x2="220" y2="300" stroke={inkColor} strokeWidth="0.5" />
      </svg>
      {/* Coordinate cross — bottom left */}
      <svg style={{ position: 'absolute', bottom: 600, left: 40, width: 220, height: 220 }} viewBox="0 0 220 220" fill="none">
        <line x1="10" y1="110" x2="210" y2="110" stroke={inkColor} strokeWidth="1" />
        <line x1="110" y1="10" x2="110" y2="210" stroke={inkColor} strokeWidth="1" />
        {[30, 60, 90, 130, 160, 190].map(p => (
          <g key={p}>
            <line x1={p} y1="107" x2={p} y2="113" stroke={inkColor} strokeWidth="0.5" />
            <line x1="107" y1={p} x2="113" y2={p} stroke={inkColor} strokeWidth="0.5" />
          </g>
        ))}
        <circle cx="160" cy="70" r="3" fill={inkColor} />
        <circle cx="75" cy="140" r="3" fill={inkColor} />
        <line x1="160" y1="70" x2="75" y2="140" stroke={inkColor} strokeWidth="0.5" strokeDasharray="2 3" />
      </svg>
    </div>
  );
}
