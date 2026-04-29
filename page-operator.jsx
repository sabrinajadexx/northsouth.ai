// Direction 1: OPERATOR
// Technical / monospace / system aesthetic. Black canvas, lime accent.
// Reads like infrastructure documentation.

const OP_ACCENT = '#a3e635';
const OP_BG = '#0a0a0a';
const OP_FG = '#e8e8e8';
const OP_DIM = '#888';
const OP_LINE = '#1f1f1f';

const opFont = '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace';
const opSans = 'Inter, -apple-system, sans-serif';

function OpRule({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      fontFamily: opFont, fontSize: 11, color: OP_DIM,
      letterSpacing: 1, textTransform: 'uppercase',
    }}>
      <span style={{ height: 1, width: 32, background: OP_LINE }}></span>
      <span>{label}</span>
      <span style={{ height: 1, flex: 1, background: OP_LINE }}></span>
    </div>
  );
}

function OpBlinker() {
  const [on, setOn] = React.useState(true);
  React.useEffect(() => { const t = setInterval(() => setOn(x => !x), 600); return () => clearInterval(t); }, []);
  return <span style={{ opacity: on ? 1 : 0, color: OP_ACCENT }}>▌</span>;
}

function OpHeroAnim() {
  // Animated "thinking" — shows the agent ingesting docs and emitting outputs.
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 1400); return () => clearInterval(t); }, []);

  const inputs = ['email_thread.eml', 'pricing.pdf', 'whatsapp_log.txt', 'faq.md', 'crm_export.csv'];
  const outputs = [
    '→ reply drafted (98% conf.)',
    '→ lead scored: HIGH',
    '→ ticket routed: ops',
    '→ summary written',
    '→ booking confirmed',
  ];

  return (
    <div style={{
      border: `1px solid ${OP_LINE}`,
      background: '#070707',
      padding: 20,
      fontFamily: opFont,
      fontSize: 12,
      color: OP_FG,
      display: 'grid',
      gridTemplateColumns: '1fr 60px 1fr',
      gap: 24,
      alignItems: 'center',
    }}>
      <div>
        <div style={{ color: OP_DIM, fontSize: 10, marginBottom: 10, letterSpacing: 1 }}>INGEST</div>
        {inputs.map((f, i) => (
          <div key={f} style={{
            display: 'flex', justifyContent: 'space-between', padding: '5px 0',
            opacity: ((tick + i) % 5) === 0 ? 1 : 0.45,
            color: ((tick + i) % 5) === 0 ? OP_ACCENT : OP_FG,
            transition: 'opacity .3s, color .3s',
          }}>
            <span>{f}</span>
            <span style={{ color: OP_DIM }}>{((tick + i) % 5) === 0 ? '·· reading' : 'queued'}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 36, height: 36, border: `1.5px solid ${OP_ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: OP_ACCENT }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2 L9 16 M2 9 L16 9 M4 4 L14 14 M14 4 L4 14" stroke="currentColor" strokeWidth="1"></path>
            <circle cx="9" cy="9" r="3" fill="currentColor"></circle>
          </svg>
        </div>
        <div style={{ fontSize: 9, color: OP_DIM, letterSpacing: 1 }}>AGENT</div>
        <div style={{ fontSize: 9, color: OP_ACCENT, letterSpacing: 1 }}>{(['IDLE', 'THINK', 'EMIT', 'WAIT'])[tick % 4]}</div>
      </div>
      <div>
        <div style={{ color: OP_DIM, fontSize: 10, marginBottom: 10, letterSpacing: 1 }}>EMIT</div>
        {outputs.map((o, i) => (
          <div key={o} style={{
            padding: '5px 0',
            opacity: ((tick + i + 2) % 5) === 0 ? 1 : 0.45,
            color: ((tick + i + 2) % 5) === 0 ? OP_ACCENT : OP_FG,
            transition: 'opacity .3s, color .3s',
          }}>{o}</div>
        ))}
      </div>
    </div>
  );
}

function OpServiceCard({ id, title, items }) {
  return (
    <div style={{
      border: `1px solid ${OP_LINE}`,
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      background: '#070707',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: opFont, fontSize: 11, color: OP_ACCENT, letterSpacing: 1 }}>{id}</span>
        <span style={{ fontFamily: opFont, fontSize: 10, color: OP_DIM }}>module</span>
      </div>
      <h3 style={{ fontFamily: opSans, fontSize: 22, fontWeight: 500, margin: 0, color: OP_FG, letterSpacing: -0.3, lineHeight: 1.15 }}>{title}</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map(item => (
          <li key={item} style={{ fontFamily: opSans, fontSize: 13, color: '#bbb', lineHeight: 1.5, display: 'flex', gap: 10 }}>
            <span style={{ color: OP_ACCENT, fontFamily: opFont }}>+</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OperatorPage({ density = 'comfy' }) {
  const pad = density === 'compact' ? 60 : 96;
  const sectionGap = density === 'compact' ? 80 : 120;
  const [openFaq, setOpenFaq] = React.useState(0);

  return (
    <div style={{
      background: OP_BG,
      color: OP_FG,
      fontFamily: opSans,
      minHeight: '100%',
      backgroundImage: `linear-gradient(${OP_LINE} 1px, transparent 1px), linear-gradient(90deg, ${OP_LINE} 1px, transparent 1px)`,
      backgroundSize: '64px 64px',
      backgroundPosition: '-1px -1px',
    }}>
      {/* NAV */}
      <header style={{
        padding: `20px ${pad}px`,
        borderBottom: `1px solid ${OP_LINE}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: opFont, fontSize: 13 }}>
          <span style={{ width: 10, height: 10, background: OP_ACCENT }}></span>
          <span style={{ fontWeight: 600 }}>signal/ops</span>
          <span style={{ color: OP_DIM, fontSize: 11 }}>// ai automation agency</span>
        </div>
        <nav style={{ display: 'flex', gap: 28, fontFamily: opFont, fontSize: 12 }}>
          <a href="#problem" style={{ color: OP_DIM, textDecoration: 'none' }}>problem</a>
          <a href="#stack" style={{ color: OP_DIM, textDecoration: 'none' }}>stack</a>
          <a href="#case" style={{ color: OP_DIM, textDecoration: 'none' }}>case-study</a>
          <a href="#demo" style={{ color: OP_DIM, textDecoration: 'none' }}>demo</a>
        </nav>
        <a href="#cta" style={{
          fontFamily: opFont, fontSize: 12, color: OP_BG, background: OP_ACCENT,
          padding: '8px 14px', textDecoration: 'none', fontWeight: 600, letterSpacing: 0.5,
        }}>book audit ↵</a>
      </header>

      {/* HERO */}
      <section style={{ padding: `${sectionGap}px ${pad}px`, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: opFont, fontSize: 11, color: OP_DIM, marginBottom: 32, letterSpacing: 1 }}>
          <span style={{ width: 6, height: 6, background: OP_ACCENT, borderRadius: '50%', boxShadow: `0 0 0 4px ${OP_ACCENT}22` }}></span>
          <span>SYS_STATUS: ACCEPTING_NEW_PROJECTS_Q3</span>
        </div>
        <h1 style={{
          fontSize: 'clamp(48px, 6.5vw, 96px)',
          fontWeight: 400,
          letterSpacing: -2.5,
          lineHeight: 0.98,
          margin: 0,
          maxWidth: 1100,
        }}>
          AI systems that <span style={{ fontStyle: 'italic', color: OP_ACCENT, fontFamily: '"Fraunces", serif', fontWeight: 300 }}>organize</span>,<br />
          <span style={{ fontStyle: 'italic', color: OP_ACCENT, fontFamily: '"Fraunces", serif', fontWeight: 300 }}>automate</span>, and <span style={{ fontStyle: 'italic', color: OP_ACCENT, fontFamily: '"Fraunces", serif', fontWeight: 300 }}>scale</span> your business<OpBlinker />
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, marginTop: 56, alignItems: 'end' }}>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: '#bbb', margin: 0, maxWidth: 560 }}>
            We design and build AI-powered knowledge systems, automations, and internal tools — engineered to reduce manual work, improve response times, and increase conversions.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <a href="#cta" style={{
              fontFamily: opFont, fontSize: 13, background: OP_ACCENT, color: OP_BG,
              padding: '14px 24px', textDecoration: 'none', fontWeight: 600, letterSpacing: 0.5,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              [ book a free ai audit ]
            </a>
            <a href="#demo" style={{
              fontFamily: opFont, fontSize: 13, color: OP_FG,
              padding: '14px 18px', textDecoration: 'none', border: `1px solid ${OP_LINE}`,
            }}>see live demo →</a>
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <OpRule label="agent.runtime" />
          <div style={{ marginTop: 20 }}>
            <OpHeroAnim />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" style={{ padding: `${sectionGap}px ${pad}px`, borderTop: `1px solid ${OP_LINE}` }}>
        <OpRule label="01 / problem" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, marginTop: 40, alignItems: 'start' }}>
          <h2 style={{
            fontSize: 'clamp(36px, 4vw, 56px)',
            fontWeight: 400,
            letterSpacing: -1.5,
            lineHeight: 1.05,
            margin: 0,
          }}>
            Most teams run on <span style={{ color: OP_ACCENT, fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontWeight: 300 }}>messy, manual</span> systems.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              ['ENTROPY', 'Information scattered across WhatsApp, Google Docs, emails, and PDFs'],
              ['REPETITION', 'Staff answer the same questions, again and again'],
              ['LATENCY', 'Leads lost to slow or inconsistent replies'],
              ['CEILING', 'Manual processes that don\'t scale past the team size'],
            ].map(([code, text]) => (
              <div key={code} style={{
                display: 'grid', gridTemplateColumns: '140px 1fr',
                padding: '18px 0', borderBottom: `1px solid ${OP_LINE}`, gap: 24, alignItems: 'baseline',
              }}>
                <span style={{ fontFamily: opFont, fontSize: 12, color: OP_ACCENT, letterSpacing: 1 }}>{code}</span>
                <span style={{ fontSize: 17, color: OP_FG, lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
            <p style={{ fontSize: 14, color: OP_DIM, marginTop: 24, lineHeight: 1.6, fontFamily: opFont }}>
              {'>'} result: wasted time, inconsistent service, missed revenue.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{ padding: `${sectionGap}px ${pad}px`, borderTop: `1px solid ${OP_LINE}`, background: '#060606' }}>
        <OpRule label="02 / solution" />
        <h2 style={{
          fontSize: 'clamp(40px, 5vw, 72px)',
          fontWeight: 400,
          letterSpacing: -2,
          lineHeight: 1.02,
          margin: '40px 0 0',
          maxWidth: 1100,
        }}>
          We build systems that <span style={{ color: OP_ACCENT, fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontWeight: 300 }}>think, respond, and operate</span> for you.
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#aaa', maxWidth: 720, marginTop: 32 }}>
          We turn your business knowledge and workflows into structured systems powered by AI — centralizing data, building assistants trained on your business, automating repetitive processes, and improving response and internal efficiency.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginTop: 64, background: OP_LINE, border: `1px solid ${OP_LINE}` }}>
          <OpServiceCard id="01" title="Strategy & Ideation" items={[
            'Identify automation opportunities',
            'Map business workflows',
            'Define AI use cases (support, sales, ops)',
          ]} />
          <OpServiceCard id="02" title="Knowledge Base Design" items={[
            'Structure company data: FAQs, services, policies',
            'Clean and organize scattered information',
            'Prepare data for retrieval (RAG systems)',
          ]} />
          <OpServiceCard id="03" title="AI Development" items={[
            'Build assistants on Claude or OpenAI GPT',
            'Prompt engineering and response tuning',
            'Context-aware retrieval pipelines',
          ]} />
          <OpServiceCard id="04" title="Automation & Integrations" items={[
            'Automate replies and lead handling',
            'Connect CRM, forms, messaging platforms',
            'Reduce manual tasks across operations',
          ]} />
          <OpServiceCard id="05" title="Interface & Deployment" items={[
            'Chat interfaces — internal or customer-facing',
            'Website integration',
            'Simple dashboards for your team',
          ]} />
          <OpServiceCard id="06" title="Maintenance & Optimization" items={[
            'Update and grow the knowledge base',
            'Improve responses over time',
            'Monitor performance and accuracy',
          ]} />
        </div>
      </section>

      {/* USE CASES */}
      <section style={{ padding: `${sectionGap}px ${pad}px`, borderTop: `1px solid ${OP_LINE}` }}>
        <OpRule label="03 / use-cases" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, marginTop: 40, background: OP_LINE }}>
          {[
            ['customer.support', 'Customer Support Automation', 'Answer FAQs instantly and consistently — across email, chat, and messaging.'],
            ['sales.qualify', 'Sales & Lead Qualification', 'Guide customers, recommend services, capture leads while they\'re hot.'],
            ['internal.kb', 'Internal Knowledge Assistant', 'Help staff access information quickly. Cut onboarding time in half.'],
            ['ops.automate', 'Operations Automation', 'Eliminate the repetitive manual tasks bleeding hours from your team.'],
          ].map(([id, title, desc]) => (
            <div key={id} style={{ background: OP_BG, padding: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span style={{ fontFamily: opFont, fontSize: 11, color: OP_ACCENT, letterSpacing: 1 }}>~/{id}</span>
              <h3 style={{ fontSize: 26, fontWeight: 400, margin: 0, letterSpacing: -0.5 }}>{title}</h3>
              <p style={{ fontSize: 15, color: '#999', margin: 0, lineHeight: 1.55 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STACK */}
      <section id="stack" style={{ padding: `${sectionGap}px ${pad}px`, borderTop: `1px solid ${OP_LINE}`, background: '#060606' }}>
        <OpRule label="04 / stack" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginTop: 40 }}>
          <h2 style={{ fontSize: 40, fontWeight: 400, letterSpacing: -1, lineHeight: 1.05, margin: 0 }}>
            Flexible stack, <span style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', color: OP_ACCENT, fontWeight: 300 }}>chosen per project</span>
          </h2>
          <div style={{ fontFamily: opFont, fontSize: 13 }}>
            {[
              ['knowledge', 'Obsidian · Notion'],
              ['llm.models', 'Claude · OpenAI GPT'],
              ['retrieval', 'vector databases · embeddings'],
              ['automation', 'Zapier · Make'],
              ['deployment', 'web interfaces · chat widgets · dashboards'],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'grid', gridTemplateColumns: '180px 1fr',
                padding: '20px 0', borderBottom: `1px solid ${OP_LINE}`, gap: 24,
              }}>
                <span style={{ color: OP_DIM }}>{k}</span>
                <span style={{ color: OP_FG }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section id="case" style={{ padding: `${sectionGap}px ${pad}px`, borderTop: `1px solid ${OP_LINE}` }}>
        <OpRule label="05 / case-study" />
        <div style={{ marginTop: 40, display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, letterSpacing: -1.5, margin: 0 }}>NomadNest Travel Co.</h2>
          <span style={{ fontFamily: opFont, fontSize: 12, color: OP_DIM }}>// hospitality · 2025</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, marginTop: 56, background: OP_LINE, border: `1px solid ${OP_LINE}` }}>
          <div style={{ background: OP_BG, padding: 32 }}>
            <div style={{ fontFamily: opFont, fontSize: 11, color: OP_DIM, letterSpacing: 1, marginBottom: 14 }}>PROBLEM</div>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, color: '#bbb', fontSize: 14, lineHeight: 1.55 }}>
              <li>· 100+ daily customer inquiries</li>
              <li>· slow response times</li>
              <li>· inconsistent info across channels</li>
            </ul>
          </div>
          <div style={{ background: OP_BG, padding: 32 }}>
            <div style={{ fontFamily: opFont, fontSize: 11, color: OP_DIM, letterSpacing: 1, marginBottom: 14 }}>SOLUTION</div>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, color: '#bbb', fontSize: 14, lineHeight: 1.55 }}>
              <li>· structured KB across packages, FAQs, policies</li>
              <li>· AI assistant for support + internal use</li>
              <li>· automated responses for common inquiries</li>
            </ul>
          </div>
          <div style={{ background: OP_BG, padding: 32 }}>
            <div style={{ fontFamily: opFont, fontSize: 11, color: OP_DIM, letterSpacing: 1, marginBottom: 14 }}>RESULTS</div>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, color: '#bbb', fontSize: 14, lineHeight: 1.55 }}>
              <li>· faster response time</li>
              <li>· fewer manual replies</li>
              <li>· higher conversion rate</li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 56 }}>
          {[
            ['80%', 'faster response time'],
            ['60%', 'fewer manual replies'],
            ['25%', 'increase in conversions'],
          ].map(([n, l]) => (
            <div key={n} style={{ borderTop: `1px solid ${OP_LINE}`, paddingTop: 24 }}>
              <div style={{ fontSize: 88, fontWeight: 300, letterSpacing: -3, color: OP_ACCENT, fontFamily: '"Fraunces", serif', lineHeight: 1, fontStyle: 'italic' }}>{n}</div>
              <div style={{ fontFamily: opFont, fontSize: 12, color: OP_DIM, marginTop: 12, letterSpacing: 0.5 }}>// {l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" style={{ padding: `${sectionGap}px ${pad}px`, borderTop: `1px solid ${OP_LINE}`, background: '#060606' }}>
        <OpRule label="06 / live demo" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, marginTop: 40, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: 44, fontWeight: 400, letterSpacing: -1.2, margin: 0, lineHeight: 1.05 }}>
              Real example: AI <span style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', color: OP_ACCENT, fontWeight: 300 }}>answering</span> customer questions
            </h2>
            <p style={{ fontSize: 16, color: '#aaa', lineHeight: 1.6, marginTop: 24 }}>
              This assistant is trained on company data and responds instantly with accurate, context-aware answers. Type a question — it's running live.
            </p>
            <div style={{ marginTop: 32, fontFamily: opFont, fontSize: 12, color: OP_DIM, lineHeight: 1.8 }}>
              <div>// model: claude-haiku-4-5</div>
              <div>// kb: nomadnest_v3 (47 docs)</div>
              <div>// avg latency: 1.2s</div>
              <div>// uptime: 99.94%</div>
            </div>
          </div>
          <ChatOperator accent={OP_ACCENT} />
        </div>
      </section>

      {/* OFFER */}
      <section style={{ padding: `${sectionGap}px ${pad}px`, borderTop: `1px solid ${OP_LINE}` }}>
        <OpRule label="07 / offer" />
        <div style={{
          marginTop: 40,
          border: `1px solid ${OP_LINE}`,
          padding: 56,
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 60,
          alignItems: 'center',
          background: '#070707',
        }}>
          <div>
            <div style={{ fontFamily: opFont, fontSize: 12, color: OP_ACCENT, letterSpacing: 1, marginBottom: 12 }}>AI_KNOWLEDGE_SYSTEM_SETUP</div>
            <h3 style={{ fontSize: 40, fontWeight: 400, margin: 0, letterSpacing: -1 }}>One package. End-to-end.</h3>
            <ul style={{ padding: 0, margin: '24px 0 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, color: '#bbb' }}>
              <li>+ knowledge base structuring</li>
              <li>+ AI assistant development</li>
              <li>+ workflow automation</li>
              <li>+ deployment + team training</li>
            </ul>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: '"Fraunces", serif', fontSize: 64, fontWeight: 300, color: OP_ACCENT, letterSpacing: -2, fontStyle: 'italic' }}>RM3K</span>
              <span style={{ fontFamily: opFont, color: OP_DIM, fontSize: 14 }}>– RM8K</span>
            </div>
            <div style={{ fontFamily: opFont, fontSize: 12, color: OP_DIM, letterSpacing: 1 }}>setup // one-time</div>
            <div style={{ height: 1, background: OP_LINE, margin: '24px 0' }}></div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: '"Fraunces", serif', fontSize: 40, fontWeight: 300, color: OP_FG, letterSpacing: -1, fontStyle: 'italic' }}>RM500</span>
              <span style={{ fontFamily: opFont, color: OP_DIM, fontSize: 14 }}>/ month</span>
            </div>
            <div style={{ fontFamily: opFont, fontSize: 12, color: OP_DIM, letterSpacing: 1 }}>maintenance // optional</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: `${sectionGap}px ${pad}px`, borderTop: `1px solid ${OP_LINE}`, background: OP_ACCENT, color: OP_BG }}>
        <div style={{ fontFamily: opFont, fontSize: 11, letterSpacing: 1, marginBottom: 20 }}>// FINAL_PROMPT</div>
        <h2 style={{
          fontSize: 'clamp(48px, 6vw, 88px)',
          fontWeight: 400,
          letterSpacing: -2.5,
          lineHeight: 1,
          margin: 0,
          maxWidth: 1100,
        }}>
          Replace manual work with <span style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontWeight: 300 }}>systems that scale</span>.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, marginTop: 48, alignItems: 'end' }}>
          <p style={{ fontSize: 18, lineHeight: 1.5, margin: 0, maxWidth: 600, color: 'rgba(10,10,10,0.85)' }}>
            Book a free audit and we'll identify where AI can reduce workload and improve operations — concrete wins, no fluff.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <a href="#" style={{
              fontFamily: opFont, fontSize: 14, background: OP_BG, color: OP_ACCENT,
              padding: '20px 28px', textDecoration: 'none', fontWeight: 600, letterSpacing: 0.5,
              display: 'inline-flex', alignItems: 'center', gap: 12,
            }}>
              [ book my free ai audit ] <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: `${sectionGap}px ${pad}px`, borderTop: `1px solid ${OP_LINE}` }}>
        <OpRule label="08 / faq" />
        <div style={{ marginTop: 40, maxWidth: 900 }}>
          {[
            ['What do you need from us?', 'Access to your existing documents, FAQs, and workflows. We handle the structuring, cleaning, and integration from there.'],
            ['How long does setup take?', 'Typically 5–10 days, depending on the size of your knowledge base and the number of integrations required.'],
            ['Do you customize for each business?', 'Yes. Each system is tailored to your workflows, data, brand voice, and the specific outcomes you want to drive.'],
          ].map(([q, a], i) => (
            <div key={q} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{
              borderTop: `1px solid ${OP_LINE}`,
              padding: '24px 0',
              cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
                <h4 style={{ fontSize: 22, fontWeight: 400, margin: 0, letterSpacing: -0.5 }}>{q}</h4>
                <span style={{ fontFamily: opFont, color: OP_ACCENT, fontSize: 18 }}>{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && (
                <p style={{ fontSize: 16, color: '#aaa', lineHeight: 1.65, margin: '16px 0 0', maxWidth: 720 }}>{a}</p>
              )}
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${OP_LINE}` }}></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: `48px ${pad}px`, borderTop: `1px solid ${OP_LINE}`, background: '#060606' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: opFont, fontSize: 13 }}>
            <span style={{ width: 10, height: 10, background: OP_ACCENT }}></span>
            <span style={{ fontWeight: 600 }}>signal/ops</span>
          </div>
          <div style={{ fontFamily: opFont, fontSize: 12, color: OP_DIM }}>
            ai systems · automation · knowledge infrastructure — built for efficiency and scale
          </div>
          <div style={{ fontFamily: opFont, fontSize: 12, color: OP_DIM }}>© 2026</div>
        </div>
      </footer>
    </div>
  );
}

window.OperatorPage = OperatorPage;
