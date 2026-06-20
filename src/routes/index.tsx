import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Cpu, GitBranch, Lock, Terminal, ArrowUpRight, Activity, FileCheck2, Network, Coins, Globe, Rocket, Code2, FileCode2, FolderOpen, Search as SearchIcon, Settings as SettingsIcon, X as XIcon, ChevronRight } from "lucide-react";
import { motion, useInView, animate, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

// Single shared motion language for the whole page.
const EASE_STANDARD: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DUR_STANDARD = 0.25;

function Reveal({ children, className = "", delay = 0, y = 24 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DUR_STANDARD, delay, ease: EASE_STANDARD }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, suffix = "", prefix = "", duration = 1.6, decimals = 0 }: { value: number; suffix?: string; prefix?: string; duration?: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "-40px", once: true });
  const reduced = useReducedMotion();
  const format = (n: number) =>
    prefix + (decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString()) + suffix;
  const [display, setDisplay] = useState<string>(reduced ? format(value) : format(0));
  useEffect(() => {
    if (reduced) {
      setDisplay(format(value));
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE_STANDARD,
      onUpdate: (latest) => setDisplay(format(latest)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration, suffix, prefix, decimals, reduced]);
  return <span ref={ref}>{display}</span>;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noah Labs — Sentinel: AI engineering for air-gapped environments" },
      { name: "description", content: "Sentinel is an AI-native software engineering platform built for defense, intelligence, and regulated industries. Modernize legacy code without leaving your network." },
    ],
  }),
  component: Index,
});

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono uppercase tracking-[0.18em] text-xs ${className}`}>{children}</span>;
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 h-16 flex items-center justify-between">
        <motion.a href="#" className="group flex items-center gap-2 relative" initial="rest" whileHover="hover" animate="rest">
          <span className="font-mono text-lg font-semibold tracking-tight relative inline-flex items-center">
            <motion.span
              className="ember-text inline-block"
              variants={{ rest: { scale: 1, rotate: 0, filter: "drop-shadow(0 0 0px var(--ember))" }, hover: { scale: 1.4, rotate: -10, filter: "drop-shadow(0 0 8px var(--ember))" } }}
              transition={{ duration: DUR_STANDARD, ease: EASE_STANDARD }}
            >
              '
            </motion.span>
            <span className="relative ml-0.5 inline-flex">
              {"NOAH".split("").map((c, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{ rest: { y: 0, color: "var(--foreground)" }, hover: { y: -3, color: "var(--ember)" } }}
                  transition={{ duration: DUR_STANDARD, delay: i * 0.03, ease: EASE_STANDARD }}
                >
                  {c}
                </motion.span>
              ))}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-x-3 -inset-y-2 rounded-sm"
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: DUR_STANDARD, ease: EASE_STANDARD }}
                style={{ boxShadow: "0 0 28px color-mix(in oklab, var(--ember) 60%, transparent)" }}
              />
            </span>
          </span>
          <span className="hidden sm:inline text-muted-foreground font-mono text-xs ml-2 border-l border-border pl-3 group-hover:text-foreground transition-colors">LABS</span>
          <motion.span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px bg-ember origin-left w-full"
            variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ duration: DUR_STANDARD, ease: EASE_STANDARD }}
          />
        </motion.a>
        <nav className="hidden md:flex items-center gap-8">
          {["Sentinel", "Capabilities", "Deployment", "Company"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="font-mono uppercase tracking-[0.18em] text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden sm:inline-flex font-mono uppercase tracking-[0.18em] text-xs px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">Docs</a>
          <a href="#contact" className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-xs px-4 py-2 bg-foreground text-background rounded-sm hover:bg-ember hover:text-background transition-colors">
            Contact Sales
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const stats: Array<[React.ReactNode, string]> = [
    [<><Counter value={9} suffix="×" /></>, "Faster R&D → ATO"],
    ["2–15×", "Engineer output"],
    [<><Counter value={550} suffix="%" /></>, "Pipeline speed"],
    [<><Counter value={200} suffix="%" /></>, "Code comprehension"],
    [<><Counter value={91.1} suffix="%" decimals={1} /></>, "SWE-Bench+"],
  ];
  return (
    <section className="relative border-b border-border overflow-hidden bg-grid">
      <div className="mx-auto max-w-[1400px] px-6 pt-24 pb-32 relative">
        <Reveal y={16}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-[0.95] max-w-5xl text-foreground">
            Build your<br />airgapped AI IDE
          </h1>
          <p className="mt-10 max-w-xl font-mono text-base md:text-lg text-muted-foreground leading-relaxed">
            A context-aware system for regulated codebases. Hold your full repository live, execute against policy, and ship without a single black-box diff.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background font-mono uppercase tracking-[0.18em] text-xs rounded-sm hover:opacity-90 transition">
              Download
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 hairline font-mono uppercase tracking-[0.18em] text-xs rounded-sm hover:bg-card transition group">
              Contact Sales <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-20 grid grid-cols-2 md:grid-cols-5 gap-px bg-border hairline rounded-sm overflow-hidden">
          {stats.map(([n, l]) => (
            <div key={l} className="bg-background p-6 relative">
              <div className="text-3xl font-semibold tracking-tight ember-text font-mono">{n}</div>
              <div className="mt-2 text-xs text-muted-foreground font-mono uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Problem() {
  const left = ["Cloud connectivity", "Small repositories", "Modern codebases", "Commercial dev teams"];
  const right = ["Air-gapped networks", "Millions of legacy LOC", "COBOL · Ada · Fortran · C/C++", "Compliance & ATO evidence", "Mission-critical uptime"];
  return (
    <section className="surface-base border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28">
        <Reveal>
          <Mono className="ember-text">// 01 — The Gap</Mono>
          <h2 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight max-w-4xl leading-[1.02]">
            Copilot, Cursor, and Claude assume the world looks like Silicon Valley.
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] text-muted-foreground leading-relaxed">
            For agencies, contractors, and regulated industries — it doesn't. Source code can't leave the network. Repositories are decades old. Every change needs an audit trail.
          </p>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-px bg-border hairline rounded-sm overflow-hidden">
          <div className="bg-background bg-grid p-8 relative">
            <Mono className="text-muted-foreground relative">What current AI assumes</Mono>
            <ul className="mt-6 space-y-3 relative">
              {left.map((i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground line-through">
                  <span className="font-mono text-xs text-destructive">×</span> {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-background bg-grid p-8 relative">
            <Mono className="ember-text relative">What your environment actually is</Mono>
            <ul className="mt-6 space-y-3 relative">
              {right.map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" /> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sentinel() {
  const pillars = [
    { icon: Network, name: "Infinite Context", spec: "7.5M token repository window", body: "Sentinel ingests entire codebases — not just a few files. It reasons across millions of lines of legacy logic, header chains, and build artifacts at once." },
    { icon: Cpu, name: "Agent Mode", spec: "Plans · edits up to 25k LOC", body: "Multi-step engineering tasks, not autocomplete. Sentinel plans, executes, and orchestrates tools while keeping the engineer in the loop." },
    { icon: ShieldCheck, name: "Verification", spec: "Formal · static · runtime · cyber", body: "Proof before review. Sentinel runs formal verification, static analysis, and posture checks so changes ship with evidence, not vibes." },
    { icon: Lock, name: "Air-Gapped", spec: "Zero telemetry · zero egress", body: "Runs entirely inside your environment. No cloud calls. No outbound traffic. No data ever leaves your perimeter." },
  ];
  return (
    <section id="sentinel" className="surface-elevated border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <Mono className="ember-text">// 02 — Sentinel</Mono>
              <h2 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl leading-[1.02]">
                One platform. Four capabilities that don't exist anywhere else combined.
              </h2>
            </div>
            <Mono className="text-muted-foreground">v.SENTINEL/2026.Q2</Mono>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-px bg-border hairline rounded-sm overflow-hidden">
          {pillars.map(({ icon: Icon, name, spec, body }, i) => (
            <div
              key={name}
              className="surface-base p-10 group hover:bg-card transition-colors relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <Mono className="text-muted-foreground">0{i + 1}</Mono>
                <Icon className="h-4 w-4 text-muted-foreground group-hover:ember-text transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="mt-8 text-2xl font-semibold tracking-tight">{name}</h3>
              <Mono className="block mt-2 text-muted-foreground">{spec}</Mono>
              <p className="mt-6 text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeploymentTerminal({ mode }: { mode: string }) {
  const scripts: Record<string, Array<{ t: string; cls?: string }>> = {
    SaaS: [
      { t: "$ sentinel cluster status --region us-east-1" },
      { t: "> control plane ............................ healthy", cls: "ember-text" },
      { t: "> tenant isolation ......................... enforced" },
      { t: "> auto-scaling group ....................... 12 / 24 nodes" },
      { t: "> uptime SLO ............................... 99.95%", cls: "ember-text" },
    ],
    Hybrid: [
      { t: "$ sentinel hybrid bridge --tenant acme" },
      { t: "> control plane (cloud) .................... reachable" },
      { t: "> compute plane (vpc-prod) ................. 8 workers online", cls: "ember-text" },
      { t: "> egress policy ............................ control-only" },
      { t: "> code/data egress ......................... 0 bytes" },
    ],
    "On-Prem": [
      { t: "$ sentinel deploy --target onprem-dc01" },
      { t: "> k8s cluster .............................. v1.29.4" },
      { t: "> model weights (local) .................... 412 GB synced" },
      { t: "> dependency mirror ........................ pinned" },
      { t: "> outbound DNS ............................. denied", cls: "ember-text" },
    ],
    "Air-Gapped": [
      { t: "$ sentinel verify --air-gap" },
      { t: "> iptables OUTPUT .......................... DROP (default)", cls: "ember-text" },
      { t: "> NIC eth0 ................................. link down" },
      { t: "> update channel ........................... usb-media:offline" },
      { t: "> telemetry ................................ disabled" },
    ],
    Classified: [
      { t: "$ sentinel attest --enclave il6 --tenant ic-prog-7" },
      { t: "[ok] network isolation ..................... egress=0  ingress=tap-only", cls: "ember-text" },
      { t: "[ok] enclave ............................... DISA IL6  ·  SCIF-resident" },
      { t: "[ok] FIPS 140-3 module ..................... loaded  (kernel: hardened)" },
      { t: "[ok] mTLS + PIV/CAC ........................ 2 of 2 factors verified" },
      { t: "[ok] RBAC ................................. role=program-ic  clearance=TS/SCI" },
      { t: "[ok] audit chain ........................... 14,221 events  ·  hash-linked" },
      { t: "[ok] cross-domain transfer ................. blocked at guard", cls: "ember-text" },
      { t: "  → attestation signed  ·  ATO package: rmf-2026.q2.tar.zst", cls: "ember-text" },
    ],
  };
  const lines = scripts[mode] ?? scripts.Classified;
  const reduced = useReducedMotion();

  // Randomize per-line delays (40-90ms each) so output reads like real log streaming
  // instead of a uniform animation. Recomputed when `mode` changes.
  const delays = useMemo(() => {
    let acc = 0;
    return lines.map(() => {
      acc += 0.04 + Math.random() * 0.05; // 40-90ms
      return acc;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <div className="surface-base hairline rounded-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/30">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-ember" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
          enclave://{mode.toLowerCase().replace(/[^a-z]/g, "-")} · sentinel-cli
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">●&nbsp;live</span>
      </div>
      <div
        key={mode}
        className="p-5 font-mono text-[12.5px] leading-6 text-muted-foreground"
      >
        {lines.map((l, i) =>
          reduced ? (
            <div key={i} className={l.cls}>{l.t}</div>
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delays[i], duration: DUR_STANDARD, ease: EASE_STANDARD }}
              className={l.cls}
            >
              {l.t}
            </motion.div>
          ),
        )}
        {/* Cursor blink — capped to 3 iterations, then settles visible. */}
        <motion.div
          className="inline-block h-3 w-1.5 bg-ember align-middle mt-1"
          animate={reduced ? { opacity: 1 } : { opacity: [1, 0, 1, 0, 1] }}
          transition={{ duration: 1.1, repeat: 2, ease: EASE_STANDARD }}
        />
      </div>
    </div>
  );
}

function Deployment() {
  const modes = [
    { name: "SaaS",        body: "Fully managed control plane on commercial AWS · GCP." },
    { name: "Hybrid",      body: "Our control plane, your compute. Source never leaves your VPC." },
    { name: "On-Prem",     body: "Entirely inside your data center. Mirrored deps, no outbound DNS." },
    { name: "Air-Gapped",  body: "Disconnected facilities. Updates via signed offline media." },
    { name: "Classified",  body: "DISA Impact Level 6 · National Security Regions · SCIF-resident." },
  ];
  const [active, setActive] = useState("Classified");
  const reduced = useReducedMotion();
  return (
    <section id="deployment" className="surface-panel border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_1fr] gap-x-16 gap-y-10 items-end">
            <div>
              <Mono className="ember-text">// 03 — Sovereign Deployment</Mono>
              <h2 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
                We meet you where you operate.
              </h2>
            </div>
            <p className="text-base md:text-[17px] text-muted-foreground leading-relaxed max-w-lg">
              From commercial cloud to DISA Impact Level 6 and disconnected facilities. Sentinel runs on AWS, Azure, Oracle Government Cloud, GCP, and bare metal — managed entirely by your engineers.
            </p>
          </div>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {["AWS GovCloud", "Azure Gov", "Oracle NSR", "GCP", "Bare Metal"].map((p) => (
            <span key={p} className="hairline px-2.5 py-1 rounded-sm font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground">{p}</span>
          ))}
        </div>

        <div className="mt-14 grid lg:grid-cols-[280px_1fr] gap-px bg-border hairline rounded-sm overflow-hidden">
          {/* Quiet list of modes — active/inactive design preserved exactly */}
          <ul className="surface-base">
            {modes.map((m) => {
              const isActive = active === m.name;
              return (
                <li key={m.name}>
                  <button
                    type="button"
                    onClick={() => setActive(m.name)}
                    className={`w-full text-left px-5 py-4 border-b border-border last:border-b-0 flex items-center gap-3 transition-colors ${
                      isActive ? "surface-elevated" : "hover:bg-card/40"
                    }`}
                    style={isActive ? { boxShadow: "inset 2px 0 0 var(--ember)" } : undefined}
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.16em] w-5 ${
                        isActive ? "ember-text" : "text-muted-foreground/60"
                      }`}
                    >
                      0{modes.indexOf(m) + 1}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {m.name}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="dep-dot"
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-ember"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Expanded detail */}
          <div className="surface-elevated p-7 md:p-9">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <Mono className="text-muted-foreground">active deployment</Mono>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight">{active}</h3>
                <p className="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
                  {modes.find((m) => m.name === active)?.body}
                </p>
              </div>
              {/* The single pulsing status dot on the page lives here — the
                  functionally meaningful "attested" badge. Capped to 3 pulses. */}
              <div className="flex items-center gap-2 hairline rounded-sm px-3 py-1.5">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-ember"
                  animate={reduced ? { opacity: 1 } : { opacity: [1, 0.3, 1, 0.3, 1] }}
                  transition={{ duration: 1.6, repeat: 2, ease: EASE_STANDARD }}
                />
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                  attested · {active === "Classified" ? "IL6" : "verified"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <DeploymentTerminal mode={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SDLC() {
  const stages = ["PLAN", "TRIAGE", "SIGNAL", "AUTOMATE", "MONITOR", "SHIP", "VALIDATE", "EXECUTE"];
  const reduced = useReducedMotion();
  // Stages are evenly distributed around the ring. The whole ring rotates at a
  // constant linear speed so each node travels the same arc-length per second
  // and spacing between nodes is preserved.
  const angleStep = 360 / stages.length;
  return (
    <section className="surface-base border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28">
        <Reveal>
          <Mono className="ember-text">// 04 — Across the SDLC</Mono>
          <h2 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl leading-[1.02]">
            Not just coding. Every stage strengthens every other.
          </h2>
        </Reveal>

        <motion.div
          className="mt-16 relative aspect-square max-w-2xl mx-auto"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_STANDARD }}
        >
          {/* Outer dashed orbit ring (no spokes to the center) */}
          <svg
            className="absolute inset-0 h-full w-full text-border"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              strokeDasharray="0.6 1.2"
            />
          </svg>

          {/* Stationary center */}
          <div className="absolute inset-0 grid place-items-center z-10 pointer-events-none">
            <div className="text-center">
              <Mono className="text-muted-foreground">Shared</Mono>
              <div className="ember-text font-mono text-sm mt-1">CONTEXT</div>
            </div>
          </div>

          {/* Rotating ring of stages. Single transform on the wrapper guarantees
              equal arc-length per node and constant linear angular velocity. */}
          <motion.div
            className="absolute inset-0"
            animate={reduced ? { rotate: 0 } : { rotate: 360 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 40, ease: "linear", repeat: Infinity }
            }
          >
            {stages.map((s, i) => {
              const angle = i * angleStep - 90;
              const rad = (angle * Math.PI) / 180;
              const left = `${50 + Math.cos(rad) * 42}%`;
              const top = `${50 + Math.sin(rad) * 42}%`;
              return (
                <motion.div
                  key={s}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left, top }}
                  // Counter-rotate inner content so labels stay upright.
                  animate={reduced ? { rotate: 0 } : { rotate: -360 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { duration: 40, ease: "linear", repeat: Infinity }
                  }
                >
                  <div className="h-20 w-20 rounded-full hairline grid place-items-center bg-background">
                    <span className="font-mono text-[10px] tracking-[0.15em] ember-text">{s}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Partners() {
  const partners = [
    { name: "Georgetown University", tag: "Academic Foundation" },
    { name: "In-Q-Tel", tag: "National Security Context" },
    { name: "NASA", tag: "Mission Assurance" },
    { name: "Lockheed Martin", tag: "Defense Systems" },
    { name: "Stanford University", tag: "Research Depth" },
    { name: "StartX", tag: "Builder Ecosystem" },
  ];
  // Duplicated for seamless marquee. Marquee is capped to 3 iterations and
  // settles in the start position rather than scrolling forever.
  const loop = [...partners, ...partners];
  const reduced = useReducedMotion();
  return (
    <section className="surface-panel border-b border-border overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 py-28">
        <Reveal>
          <Mono className="ember-text">// 07 — Partners</Mono>
          <div className="mt-4 flex items-end justify-between flex-wrap gap-6">
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl leading-[1.02]">
              The environments behind Noah Labs.
            </h2>
            <p className="text-[17px] text-muted-foreground max-w-md leading-relaxed">
              Spanning national security, aerospace, frontier research, and early-stage company building.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 relative overflow-hidden">
          {/* Seamless infinite carousel: translate from 0 to -50% (the width of
              one full set) and loop. Because `loop` is the partners array
              duplicated back-to-back, -50% lands exactly on the first card of
              the second copy, which is visually identical to 0% — so the wrap
              is invisible and cards appear to enter from the right at the same
              instant they exit on the left. */}
          <motion.div
            className="flex w-max"
            animate={reduced ? { x: 0 } : { x: ["0%", "-50%"] }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 40, ease: "linear", repeat: Infinity, repeatType: "loop" }
            }
          >
            {loop.map((p, i) => (
              <div
                key={i}
                className="shrink-0 w-[320px] surface-base p-8 group hover:surface-elevated transition-colors border-r border-border"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:ember-text group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" strokeWidth={1.5} />
                </div>
                <Mono className="block mt-3 text-muted-foreground">{p.tag}</Mono>
                <div className="mt-6 h-px w-12 bg-border group-hover:bg-ember group-hover:w-full transition-all" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Industries() {
  const items = [
    { icon: Coins, name: "Financial Services", body: "Secure, compliant AI agents. SOC 2, audit trails, and policy enforcement built in." },
    { icon: Lock, name: "Defense & NatSec", body: "Sovereign infrastructure. Air-gapped, zero-trust environments — only an LLM required." },
    { icon: ShieldCheck, name: "Healthcare", body: "HIPAA-ready development workflows with full data isolation and lineage tracking." },
    { icon: Globe, name: "Telecom", body: "Scale with your network. AI agents built for massive-scale telecommunications infrastructure." },
    { icon: Rocket, name: "National Labs", body: "AI for American research. Sovereign deployment with BYOK/BYOM and on-premises support." },
    { icon: Code2, name: "SaaS", body: "Ship features faster without sacrificing reliability. Automate testing, review, and deployment at scale." },
  ];
  return (
    <section className="surface-base border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28 grid lg:grid-cols-[1fr_2fr] gap-16">
        <Reveal>
          <Mono className="ember-text">// 08 — Industries</Mono>
          <h2 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
            Built for industries that need AI the most — and can't afford to vibe-code.
          </h2>
          <p className="mt-6 text-[17px] text-muted-foreground leading-relaxed max-w-md">
            Production-grade software delivery where quality, security, and compliance are non-negotiable.
          </p>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-xs text-muted-foreground hover:text-ember transition">
            Enterprise <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-px bg-border hairline rounded-sm overflow-hidden">
          {items.map(({ icon: Icon, name, body }) => (
            <div key={name} className="surface-panel p-8 group hover:surface-elevated transition-colors relative">
              <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition" strokeWidth={1.5} />
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{name}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    { icon: GitBranch, t: "Legacy Modernization", b: "COBOL, Ada, Fortran, C/C++ → modern Rust, Java, C#. Semantic-preserving migration with formal proofs." },
    { icon: FileCheck2, t: "ATO-Aligned Delivery", b: "Every change ties to compliance evidence. Generate RMF artifacts as you ship." },
    { icon: Lock, t: "Air-Gapped Programs", b: "Deploy inside classified enclaves with no outbound connectivity. Models, weights, and context stay local." },
    { icon: Activity, t: "Human-in-the-Loop", b: "Engineers retain control. Every Sentinel action is reviewable with a complete audit trail." },
  ];
  return (
    <section className="surface-elevated border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28">
        <Reveal>
          <Mono className="ember-text">// 05 — Use Cases</Mono>
          <h2 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl leading-[1.02]">
            Where Sentinel is deployed today.
          </h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border hairline rounded-sm overflow-hidden">
          {cases.map(({ icon: Icon, t, b }) => (
            <div key={t} className="surface-base p-8 group hover:bg-card transition-colors">
              <Icon className="h-4 w-4 text-muted-foreground group-hover:ember-text transition" strokeWidth={1.5} />
              <h3 className="mt-6 text-lg font-semibold">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section id="customers" className="surface-panel border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28">
        <Reveal>
          <Mono className="ember-text">// 06 — Proof</Mono>
          <div className="mt-4 grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <h2 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
                500,000 lines. Two weeks. Three times cheaper.
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
                In partnership with TSRI, Sentinel modernized Deutsche Bank's KreditManager — a half-million-line legacy system — with automated compliance reporting throughout the migration.
              </p>
              <a href="#contact" className="mt-8 inline-flex items-center gap-2 hairline px-4 py-2.5 rounded-sm font-mono text-xs uppercase tracking-[0.18em] hover:bg-card transition">
                Read the case study <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="lg:col-span-2 hairline rounded-sm bg-card/40 p-8 space-y-6">
              {([
                [<><Counter value={500} suffix="K+" /></>, "Lines modernized"],
                [<><Counter value={2} suffix=" weeks" /></>, "End-to-end"],
                [<><Counter value={3} suffix="×" /></>, "Cheaper than incumbent"],
                [<><Counter value={100} suffix="%" /></>, "Automated compliance"],
              ] as Array<[React.ReactNode, string]>).map(([n, l]) => (
                <div key={l} className="flex items-baseline justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <span className="text-3xl font-semibold ember-text font-mono">{n}</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Competition() {
  return (
    <section className="surface-elevated border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-28">
        <Reveal>
          <Mono className="ember-text">// 09 — Why Sentinel</Mono>
          <h2 className="mt-4 text-5xl md:text-6xl font-semibold tracking-tight max-w-3xl leading-[1.02]">
            Customers don't buy Sentinel because AI writes code.
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
            They buy it because they cannot use ChatGPT. They cannot use Cursor. They cannot send source code to the cloud. They have decades-old software, mandatory audit trails, and adversaries on the other side of the firewall.
          </p>
        </Reveal>
        <div className="mt-12 overflow-x-auto hairline rounded-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="p-5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Capability</th>
                <th className="p-5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Generic AI tools</th>
                <th className="p-5 font-mono text-xs uppercase tracking-[0.18em] ember-text">Sentinel</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Air-gapped operation", "—", "Native"],
                ["Formal verification", "—", "Built-in"],
                ["Legacy language depth (Ada, COBOL)", "Limited", "First-class"],
                ["Compliance / ATO artifacts", "Manual", "Automated"],
                ["Repository context window", "<1M tokens", "7.5M tokens"],
                ["Classified deployment", "—", "IL5 / IL6"],
              ].map(([cap, a, b]) => (
                <tr key={cap} className="border-b border-border last:border-0">
                  <td className="p-5">{cap}</td>
                  <td className="p-5 text-muted-foreground font-mono text-sm">{a}</td>
                  <td className="p-5 ember-text font-mono text-sm">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-32 text-center">
        <Terminal className="h-6 w-6 ember-text mx-auto" />
        <h2 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight max-w-4xl mx-auto">
          Modernize the systems you can't <span className="ember-text italic font-serif">afford</span> to lose.
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-muted-foreground leading-relaxed">
          Talk to our team about deploying Sentinel inside your environment.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          <a href="mailto:contact@noahlabs.ai" className="inline-flex items-center gap-2 px-6 py-3.5 bg-ember text-background font-mono uppercase tracking-[0.18em] text-xs rounded-sm hover:opacity-90 transition">
            Contact Sales <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a href="mailto:partners@noahlabs.ai" className="inline-flex items-center gap-2 px-6 py-3.5 hairline font-mono uppercase tracking-[0.18em] text-xs rounded-sm hover:bg-card transition">
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-12 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-lg font-semibold">
            <span className="ember-text">'</span>NOAH
          </span>
          <span className="font-mono text-xs text-muted-foreground">LABS · © 2026</span>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <a href="#" className="hover:text-foreground">Security</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Trust</a>
          <a href="#" className="hover:text-foreground">Careers</a>
        </div>
        {/* Footer status no longer pulses — the single pulsing dot lives on
            the Deployment "attested" badge. */}
        <Mono className="text-muted-foreground">STATUS: <span className="ember-text">● OPERATIONAL</span></Mono>
      </div>
    </footer>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px bg-ember origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

function Index() {
  return (
    <div className="dark min-h-screen text-foreground">
      <ScrollProgress />
      <Nav />
      <Hero />
      <Problem />
      <Sentinel />
      <Deployment />
      <SDLC />
      <UseCases />
      <CaseStudy />
      <Partners />
      <Industries />
      <Competition />
      <CTA />
      <Footer />
    </div>
  );
}
