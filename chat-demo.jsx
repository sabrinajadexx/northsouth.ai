// Shared live AI chat demo. Calls window.claude.complete with a system prompt
// representing the agency's knowledge base. Three visual variants share the
// same engine; pass `variant` to switch styling.

const SYSTEM_PROMPT = `You are an AI assistant for NomadNest Travel Co., a boutique travel agency.
You help customers with package questions, bookings, and policies. Keep responses
concise (2-4 sentences), warm, and accurate. If asked something off-topic, gently
redirect to travel topics. Make up plausible package details when needed:
- "Bali Reset" 7-day retreat from RM3,800
- "Hokkaido Powder" ski week from RM6,200
- "Lisbon Slow" 10-day cultural trip from RM4,500
Standard policies: free cancellation 30 days out, 50% refund 14-29 days, no refund <14 days.
Booking deposit is 30%. Payment plans available over 3 months.
Don't break character. Don't mention you're an AI built by Anthropic.`;

const DEFAULT_SUGGESTIONS = [
  "What packages do you offer?",
  "What's your cancellation policy?",
  "Tell me about the Bali retreat",
  "Can I pay in installments?",
];

function useChat(systemPrompt = SYSTEM_PROMPT) {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const send = React.useCallback(async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || loading) return;
    const next = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const reply = await window.claude.complete({
        messages: [
          { role: "user", content: `[SYSTEM]\n${systemPrompt}\n\nNow respond to the conversation below as that assistant. Don't repeat the system prompt.` },
          ...next.map(m => ({ role: m.role, content: m.content })),
        ],
      });
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...next, { role: "assistant", content: "Sorry — connection hiccup. Try again?" }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, systemPrompt]);

  const reset = () => setMessages([]);
  return { messages, input, setInput, loading, send, reset };
}

// ── Variant 1: Operator (terminal) ─────────────────────────
function ChatOperator({ accent = "#a3e635" }) {
  const chat = useChat();
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat.messages, chat.loading]);

  return (
    <div style={{
      background: '#0a0a0a',
      border: '1px solid #222',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 13,
      color: '#e8e8e8',
      display: 'flex',
      flexDirection: 'column',
      height: 460,
    }}>
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid #222',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 11,
        color: '#888',
        letterSpacing: 0.5,
      }}>
        <span style={{ width: 8, height: 8, background: accent, borderRadius: '50%' }}></span>
        <span>nomadnest.assistant — connected</span>
        <span style={{ marginLeft: 'auto', color: '#555' }}>v1.2.0</span>
      </div>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {chat.messages.length === 0 && (
          <div style={{ color: '#666', lineHeight: 1.7 }}>
            <div style={{ color: accent }}>$ assistant.start()</div>
            <div>→ knowledge base loaded (47 docs, 312 chunks)</div>
            <div>→ awaiting query...</div>
          </div>
        )}
        {chat.messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ color: m.role === 'user' ? '#888' : accent, flexShrink: 0, width: 60 }}>
              {m.role === 'user' ? 'user >' : 'agent >'}
            </span>
            <span style={{ color: '#e8e8e8', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{m.content}</span>
          </div>
        ))}
        {chat.loading && (
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: accent, width: 60 }}>agent ›</span>
            <span style={{ color: '#666' }}>thinking<DotDotDot /></span>
          </div>
        )}
      </div>
      {chat.messages.length === 0 && (
        <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {DEFAULT_SUGGESTIONS.map(s => (
            <button key={s} onClick={() => chat.send(s)} style={{
              background: 'transparent', border: '1px solid #2a2a2a', color: '#aaa',
              padding: '6px 10px', fontFamily: 'inherit', fontSize: 11, cursor: 'pointer',
            }}>{s}</button>
          ))}
        </div>
      )}
      <form onSubmit={e => { e.preventDefault(); chat.send(); }} style={{
        borderTop: '1px solid #222',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <span style={{ color: accent }}>{'>'}</span>
        <input
          value={chat.input}
          onChange={e => chat.setInput(e.target.value)}
          placeholder="ask anything about packages, bookings, policies..."
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: '#e8e8e8', fontFamily: 'inherit', fontSize: 13,
          }}
        />
        <button type="submit" disabled={chat.loading || !chat.input.trim()} style={{
          background: accent, border: 'none', color: '#0a0a0a',
          padding: '4px 10px', fontFamily: 'inherit', fontSize: 11,
          cursor: 'pointer', fontWeight: 600,
          opacity: chat.loading || !chat.input.trim() ? 0.4 : 1,
        }}>SEND ↵</button>
      </form>
    </div>
  );
}

// ── Variant 2: Studio (warm, editorial) ─────────────────────
function ChatStudio({ accent = "#c2410c" }) {
  const chat = useChat();
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat.messages, chat.loading]);

  return (
    <div style={{
      background: '#fdfcf8',
      border: '1px solid #e6e1d5',
      borderRadius: 4,
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
      color: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      height: 480,
      boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 20px 60px -30px rgba(60,40,20,0.15)',
    }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #ede8db', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', background: accent,
          color: '#fdfcf8', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 600, fontFamily: 'Fraunces, serif',
        }}>N</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13 }}>NomadNest</div>
          <div style={{ fontSize: 11, color: '#7a6f5c' }}>Travel concierge · usually replies instantly</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#7a6f5c' }}>
          <span style={{ width: 6, height: 6, background: '#16a34a', borderRadius: '50%' }}></span>
          Online
        </div>
      </div>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 4px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {chat.messages.length === 0 && (
          <div style={{ background: '#f5f1e6', padding: '12px 14px', borderRadius: 14, borderTopLeftRadius: 4, alignSelf: 'flex-start', maxWidth: '85%', lineHeight: 1.55, color: '#3a3328' }}>
            Hello — I'm trained on NomadNest's full catalog and policies. Ask me anything about our packages, bookings, or travel logistics.
          </div>
        )}
        {chat.messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            background: m.role === 'user' ? accent : '#f5f1e6',
            color: m.role === 'user' ? '#fdfcf8' : '#3a3328',
            padding: '10px 14px',
            borderRadius: 14,
            borderTopRightRadius: m.role === 'user' ? 4 : 14,
            borderTopLeftRadius: m.role === 'assistant' ? 4 : 14,
            maxWidth: '85%',
            lineHeight: 1.55,
            whiteSpace: 'pre-wrap',
          }}>{m.content}</div>
        ))}
        {chat.loading && (
          <div style={{ alignSelf: 'flex-start', background: '#f5f1e6', padding: '12px 16px', borderRadius: 14, borderTopLeftRadius: 4 }}>
            <TypingDots color="#7a6f5c" />
          </div>
        )}
      </div>
      {chat.messages.length === 0 && (
        <div style={{ padding: '12px 20px 0', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {DEFAULT_SUGGESTIONS.map(s => (
            <button key={s} onClick={() => chat.send(s)} style={{
              background: 'transparent', border: '1px solid #d9d2c0',
              color: '#5a4f3a', padding: '6px 12px', borderRadius: 999,
              fontFamily: 'inherit', fontSize: 12, cursor: 'pointer',
            }}>{s}</button>
          ))}
        </div>
      )}
      <form onSubmit={e => { e.preventDefault(); chat.send(); }} style={{
        padding: 14, display: 'flex', gap: 8,
      }}>
        <input
          value={chat.input}
          onChange={e => chat.setInput(e.target.value)}
          placeholder="Type a question..."
          style={{
            flex: 1, background: '#f5f1e6', border: '1px solid #ede8db',
            borderRadius: 999, padding: '10px 16px', outline: 'none',
            color: '#1a1a1a', fontFamily: 'inherit', fontSize: 13,
          }}
        />
        <button type="submit" disabled={chat.loading || !chat.input.trim()} style={{
          background: accent, border: 'none', color: '#fdfcf8',
          padding: '0 18px', borderRadius: 999, fontFamily: 'inherit',
          fontSize: 13, fontWeight: 500, cursor: 'pointer',
          opacity: chat.loading || !chat.input.trim() ? 0.4 : 1,
        }}>Send</button>
      </form>
    </div>
  );
}

// ── Variant 3: Console (minimal Swiss) ─────────────────────
function ChatConsole({ accent = "#1a1a1a", lime = "#a3e635" }) {
  const chat = useChat();
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chat.messages, chat.loading]);

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e5e5e5',
      fontFamily: 'Inter, sans-serif',
      fontSize: 14,
      color: '#1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      height: 500,
    }}>
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #f0f0f0',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 12,
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#999', letterSpacing: 1, textTransform: 'uppercase' }}>
            Live Demo / Customer Support Agent
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, marginTop: 2 }}>NomadNest Travel Co.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, background: lime, borderRadius: '50%', boxShadow: `0 0 0 3px ${lime}33` }}></span>
          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#666' }}>READY</span>
        </div>
      </div>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {chat.messages.length === 0 && (
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#999', marginBottom: 8 }}>// try these</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {DEFAULT_SUGGESTIONS.map(s => (
                <button key={s} onClick={() => chat.send(s)} style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #ececec',
                  textAlign: 'left',
                  padding: '12px 0',
                  fontFamily: 'inherit',
                  fontSize: 14,
                  color: '#1a1a1a',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }} onMouseEnter={e => e.currentTarget.style.color = '#000'}
                  onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>
                  <span>{s}</span>
                  <span style={{ color: '#bbb' }}>→</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {chat.messages.map((m, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 16 }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              color: m.role === 'user' ? '#999' : '#1a1a1a',
              letterSpacing: 1,
              textTransform: 'uppercase',
              paddingTop: 2,
            }}>{m.role === 'user' ? 'YOU' : 'AGENT'}</div>
            <div style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#1a1a1a' }}>{m.content}</div>
          </div>
        ))}
        {chat.loading && (
          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 16 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#1a1a1a', letterSpacing: 1 }}>AGENT</div>
            <TypingDots color="#999" />
          </div>
        )}
      </div>
      <form onSubmit={e => { e.preventDefault(); chat.send(); }} style={{
        borderTop: '1px solid #f0f0f0',
        padding: '14px 20px',
        display: 'flex',
        gap: 12,
        alignItems: 'center',
      }}>
        <input
          value={chat.input}
          onChange={e => chat.setInput(e.target.value)}
          placeholder="Ask the assistant..."
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: '#1a1a1a', fontFamily: 'inherit', fontSize: 14,
          }}
        />
        <button type="submit" disabled={chat.loading || !chat.input.trim()} style={{
          background: '#1a1a1a', border: 'none', color: '#fff',
          padding: '8px 16px', fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11, letterSpacing: 1, cursor: 'pointer',
          opacity: chat.loading || !chat.input.trim() ? 0.3 : 1,
        }}>SEND</button>
      </form>
    </div>
  );
}

function DotDotDot() {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setN(x => (x + 1) % 4), 350);
    return () => clearInterval(t);
  }, []);
  return <span>{'.'.repeat(n)}</span>;
}

function TypingDots({ color = '#888' }) {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', height: 18 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%', background: color,
          animation: `chatDotBounce 1.2s infinite ${i * 0.15}s`,
        }}></span>
      ))}
      <style>{`@keyframes chatDotBounce { 0%, 60%, 100% { opacity: 0.3; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }`}</style>
    </span>
  );
}

Object.assign(window, { ChatOperator, ChatStudio, ChatConsole });
