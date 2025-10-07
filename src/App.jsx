import React, { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom";

const PRESENTATION_URL = "https://docs.google.com/presentation/d/1dvbU33--f3xQsJLefEqvyIFRZTrW0YWG/edit?usp=drive_link&ouid=116802399408052333737&rtpof=true&sd=true";
const YOUTUBE_URL = "https://youtu.be/CROI64ccgEg?si=lDp9cmdgGt0HROeX";

const GALLERY_IMAGES = [
  { src: "gallery/img1.png", alt: "Project gallery image 1", caption: "Formula: Char+Martian Regolith+Cotton Pulp" },
  { src: "gallery/img2.png", alt: "Project gallery image 2", caption: "From putting the seeds to appear of microgreens" },
];

export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 to-white text-slate-900">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lab" element={<PlantGrowthLab />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function Header() {
  const linkBase = "px-3 py-2 rounded-xl text-sm font-medium transition hover:bg-white/70";
  const linkActive = "bg-white text-emerald-700 border border-emerald-200";
  const linkIdle = "text-slate-700";
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-gradient-to-r from-emerald-100 to-sky-100/70 border-b border-emerald-200">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-4">
        <div className="text-3xl">🧪</div>
        <Link to="/" className="text-2xl font-bold text-emerald-700">Project Metamorph</Link>
        <nav className="ml-auto flex items-center gap-2">
          <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>Home</NavLink>
          <NavLink to="/lab" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>Growth Lab</NavLink>
          <a href={PRESENTATION_URL} target="_blank" rel="noreferrer" className={`${linkBase} ${linkIdle}`}>Presentation</a>
          <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className={`${linkBase} ${linkIdle}`}>Video</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-r from-sky-50 to-emerald-50 border-t border-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-600">
        
        <div className="mt-4 text-xl text-slate-500">Build by Md. Mashiur Rahman</div>
        <div className="mt-2 text-xl"><a href="https://www.linkedin.com/in/mashiur-rahman-ruet/" target="_blank" rel="noreferrer" className="text-emerald-700 underline">LinkedIn</a></div>
      </div>
    </footer>
  );
}

function Card({ title, kicker, children, className = "" }) {
  return (
    <div className={`bg-white border border-slate-200 shadow-md rounded-2xl p-6 transition hover:shadow-lg ${className}`}>
      {kicker && <div className="text-xs uppercase tracking-wider text-emerald-600 mb-2">{kicker}</div>}
      {title && <h2 className="text-xl font-bold mb-3 text-slate-800">{title}</h2>}
      {children}
    </div>
  );
}

function Button({ children, to, href, onClick, variant = "primary" }) {
  const base = "px-4 py-2 rounded-xl font-medium transition inline-flex items-center gap-2";
  const styles = { primary: "bg-emerald-500 text-white hover:bg-emerald-600", secondary: "bg-blue-100 text-blue-800 hover:bg-blue-200", ghost: "border border-slate-300 text-slate-600 hover:bg-slate-100" };
  const className = `${base} ${styles[variant]}`;
  if (to) return <Link to={to} className={className}>{children}</Link>;
  if (href) return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
  return <button onClick={onClick} className={className}>{children}</button>;
}

function Stat({ value, label }) {
  return (
    <div className="rounded-xl bg-slate-50 border p-4 text-center shadow-sm">
      <div className="text-2xl font-extrabold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function Gallery({ images = [] }) {
  if (!images.length) return null;
  return (
    <Card kicker="Media" title="Project Gallery">
      <div className="grid sm:grid-cols-2 gap-4">
        {images.map((img, i) => (
          <figure key={i} className="group overflow-hidden rounded-2xl border bg-slate-50">
            <img
              src={img.src}
              alt={img.alt || `Gallery image ${i + 1}`}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            {img.caption && <figcaption className="p-3 text-xs text-slate-600">{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
      
    </Card>
  );
}

function Home() {
  return (
    <div className="grid gap-6">
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">From Trash to Greens: <span className="text-emerald-600">A Circular Life-Support Strategy</span></h1>
          <p className="text-slate-700 text-base">On long-duration Mars missions, eight astronauts can generate ~12,600 kg of inorganic waste in just three years. Bringing it back is impractical and costly, and packing all food from Earth would be ~50 tons — far beyond realistic launch mass. Project Metamorph turns this problem into a resource loop.</p>
          <div className="flex flex-wrap gap-3">
            <Button to="/lab">🚀 Try the Growth Lab</Button>
            <Button variant="secondary" href={PRESENTATION_URL}>📑 View Presentation</Button>
            <Button variant="ghost" href={YOUTUBE_URL}>▶️ Watch Video</Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Stat value="12,600 kg" label="Waste / 3-year crew" />
          <Stat value="~50 tons" label="Food if pre-packed" />
          <Stat value="Food Plants" label="Using wastes" />
        </div>
      </section>

      <Gallery images={GALLERY_IMAGES} />

      <Card kicker="Problem" title="Space missions make mountains of trash">
        <p className="text-slate-700">Returning waste to Earth is effectively impossible and adds huge mass penalties. With limited volume and mass budgets, we must <strong>utilize what we already have on board</strong> — and what we can gather locally on Mars.</p>
      </Card>

      <section className="grid md:grid-cols-3 gap-6">
        <Card kicker="Solution" title="Char from NASA TtG">
          <p className="text-slate-700">NASA's Trash-to-Gas (TtG) systems convert mixed wastes (plastics, textiles, packaging) into useful gases. The solid carbon-rich residue —char — becomes a porous scaffold that holds water and nutrients and supports microbes.</p>
        </Card>
        <Card kicker="Solution" title="Cotton pulp from textiles">
          <p className="text-slate-700">Discarded cotton textiles are pulped into soft fibers that keep seeds hydrated, add air spaces for roots to breathe, and help roots penetrate for easy transplanting.</p>
        </Card>
        <Card kicker="Solution" title="Martian regolith (simulant)">
          <p className="text-slate-700">Regolith provides mineral building blocks and enables in-situ resource utilization (ISRU), reducing the mass we launch from Earth and supporting long-term bases.</p>
        </Card>
      </section>

      <Card kicker="Recipe" title="70% char + 30% Martian regolith + cotton pulp">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-3">
            <p className="text-slate-700">This substrate has a sweet-spot balance: porosity and water-holding from char, structure and minerals from regolith, and seed-friendly moisture from cotton pulp. Try it in the simulator, then iterate.</p>
            <div className="flex gap-3">
              <Button to="/lab">🧪 Open the Growth Lab</Button>
              <Button variant="secondary" href={YOUTUBE_URL}>▶️ See a working demo</Button>
            </div>
          </div>
          <ul className="space-y-2 bg-slate-50 border rounded-2xl p-4 text-sm text-slate-700">
            <li>✅ Porous, microbe-friendly structure</li>
            <li>✅ Good moisture & nutrient retention</li>
            <li>✅ Uses onboard & local materials</li>
          </ul>
        </div>
      </Card>

      <section className="grid md:grid-cols-3 gap-6">
        <Card kicker="Why it works" title="Role of char">
          <p className="text-slate-700">Creates air spaces, buffers moisture, hosts microbes, and can bind some toxins. It turns waste into a growth scaffold.</p>
        </Card>
        <Card kicker="Why it works" title="Role of cotton pulp">
          <p className="text-slate-700">Keeps seeds evenly moist for germination, prevents compaction, and lets delicate roots explore without damage.</p>
        </Card>
        <Card kicker="Why it works" title="Role of regolith">
          <p className="text-slate-700">Adds mineral nutrients (silicates, iron, magnesium, etc.) and makes the mix compatible with ISRU for long-term missions.</p>
        </Card>
      </section>

      <Card kicker="Context" title="Why this recipe is Mars-first (not Earth)">
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li>On Earth, we have abundant soils, compost, and regulated inputs. Mixed-waste char can contain contaminants that are not appropriate for open agriculture.</li>
          <li>In space, mass and volume dominate design. Converting unavoidable waste into crop substrates closes loops and reduces resupply.</li>
          <li>The goal is resilience on Mars through circular life support, not to replace sustainable terrestrial farming.</li>
        </ul>
      </Card>

      <Card kicker="Summary" title="Trash → Resources → Food">
        <p className="text-slate-700">On long-duration Mars missions, eight astronauts can generate over 12,600 kilos of inorganic waste in just three years. Transporting it back to Earth is impossible, and carrying all the necessary food would require nearly 50 tons—far beyond rocket capacity. Project Metamorph addresses this challenge by transforming waste into resources that sustain life. We combine <strong>char</strong> (a carbon-rich residue from NASA’s Trash-to-Gas systems), <strong>cotton pulp</strong> (derived from discarded textiles), and <strong>Martian regolith simulant</strong> to create a fertile growth medium. This supports microgreens, providing fresh, nutritious food while recycling waste that would otherwise accumulate. The <em>Growth Lab</em> lets you test substrate ratios and care settings virtually before real trials. A sustainable, circular approach: turning trash into treasure and ensuring survival on Mars.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button href={PRESENTATION_URL}>📑 Presentation</Button>
          <Button variant="secondary" href={YOUTUBE_URL}>▶️ YouTube</Button>
          <Button variant="ghost" to="/lab">🧪 Try the Lab</Button>
        </div>
      </Card>
    </div>
  );
}

const clamp = (n, a, b) => Math.min(Math.max(n, a), b);
const pct = (n) => `${n}%`;
function scoreTriangular(value, ideal, tolerance) {
  const d = Math.abs(value - ideal);
  if (d <= tolerance) return 1;
  if (d >= 2 * tolerance) return 0;
  return 1 - (d - tolerance) / tolerance;
}
function weakestKey(obj) {
  return Object.entries(obj).sort((a, b) => a[1] - b[1])[0][0];
}

function PlantGrowthLab() {
  const [charPct, setCharPct] = useState(70);
  const regolithPct = useMemo(() => 100 - charPct, [charPct]);
  const [binderPct, setBinderPct] = useState(10);
  const [water, setWater] = useState(60);
  const [light, setLight] = useState(12);
  const [temp, setTemp] = useState(22);
  const [day, setDay] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  const IDEAL = { char: 70, binder: 10, water: 60, light: 12, temp: 22 };
  const TOL = { char: 10, binder: 5, water: 15, light: 3, temp: 4 };
  const scores = useMemo(() => ({
    char: scoreTriangular(charPct, IDEAL.char, TOL.char),
    binder: scoreTriangular(binderPct, IDEAL.binder, TOL.binder),
    water: scoreTriangular(water, IDEAL.water, TOL.water),
    light: scoreTriangular(light, IDEAL.light, TOL.light),
    temp: scoreTriangular(temp, IDEAL.temp, TOL.temp)
  }), [charPct, binderPct, water, light, temp]);
  const totalScore = useMemo(() => {
    const w = { char: 0.5, binder: 0.1, water: 0.2, light: 0.1, temp: 0.1 };
    const s = scores.char * w.char + scores.binder * w.binder + scores.water * w.water + scores.light * w.light + scores.temp * w.temp;
    return Math.round(s * 100);
  }, [scores]);
  const outcome = useMemo(() => {
    if (totalScore >= 80) return { tag: "thrives", text: "Thrives! Lush and happy.", emoji: "🌿" };
    if (totalScore >= 60) return { tag: "grows", text: "Grows, but a bit weak.", emoji: "🌱" };
    if (totalScore >= 40) return { tag: "struggles", text: "Struggles. Needs help.", emoji: "🥀" };
    return { tag: "fails", text: "Fails to grow. Let's fix it!", emoji: "🥀" };
  }, [totalScore]);
  const weakest = useMemo(() => weakestKey(scores), [scores]);
  const whyMap = {
    char: "Add more char for air spaces so roots can breathe.",
    binder: "A little binder helps hold moisture like a sponge.",
    water: "Too dry or too soggy makes roots unhappy.",
    light: "Plants eat light! Try more hours (but not 24/7).",
    temp: "Make it cozy—not too hot, not too cold."
  };
  useEffect(() => {
    if (!running) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setDay(0);
    timerRef.current = setInterval(() => {
      setDay((d) => {
        if (d >= 7) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 7;
        }
        return d + 1;
      });
    }, 600);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [running]);
  const startSim = () => setRunning(true);
  const stopSim = () => { setRunning(false); setDay(0); };
  const resetBest = () => { setCharPct(70); setBinderPct(10); setWater(60); setLight(12); setTemp(22); };
  const stageEmoji = useMemo(() => {
    if (outcome.tag === "fails" && day >= 3) return "🥀";
    if (outcome.tag === "struggles" && day >= 5) return "🥀";
    if (day < 2) return "🌱";
    if (day < 5) return "🌿";
    return outcome.emoji;
  }, [day, outcome]);
  return (
    <div className="grid gap-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-700">Growth Lab</h1>
          <p className="text-slate-600">Learn by mixing & caring for your 🌱 — simulate a 7‑day grow.</p>
        </div>
        <Button to="/" variant="ghost">← Back to Home</Button>
      </section>
      <section className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3 space-y-4">
          <Card title="Recipe: Char vs. Regolith">
            <div className="space-y-2">
              <div className="text-sm text-slate-700 font-medium">Char: <strong>{charPct}%</strong> · Regolith: <strong>{regolithPct}%</strong></div>
              <input type="range" min={0} max={100} value={charPct} onChange={(e) => setCharPct(clamp(parseInt(e.target.value || "0"), 0, 100))} className="w-full accent-emerald-600" />
              <Tip>Char improves structure and water/nutrient buffering.</Tip>
              <ul className="mt-3 space-y-1 text-sm text-emerald-700">
                <li>🌱 Enhances substrate fertility</li>
                <li>🦠 Supports beneficial microbes</li>
                <li>🪨 Improves structure & aeration</li>
              </ul>
              <Tip>Regolith = minerals; use ISRU on Mars.</Tip>
              <div className="text-sm">Try <strong>70% char</strong> and <strong>30% regolith</strong> for best results!</div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-3">
              <MiniStat label="Char" value={pct(charPct)} />
              <MiniStat label="Regolith" value={pct(regolithPct)} />
              <MiniStat label="Cotton Pulp" value={pct(binderPct)} />
            </div>
          </Card>
          <Card title="Cotton Pulp">
            <div className="space-y-2">
              <div className="text-sm text-slate-700 font-medium">Binder amount: <strong>{binderPct}%</strong></div>
              <input type="range" min={0} max={30} value={binderPct} onChange={(e) => setBinderPct(clamp(parseInt(e.target.value || "0"), 0, 30))} className="w-full accent-amber-600" />
              <Tip>Fluffy cellulose keeps seeds moist and roots breathing.</Tip>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-blue-700">
              <li>💧 Hydrates seeds for germination</li>
              <li>🌬️ Prevents suffocation by adding air spaces</li>
              <li>🌿 Eases root penetration & transplanting</li>
            </ul>
          </Card>
          <Card title="Care Settings">
            <div className="grid md:grid-cols-3 gap-4">
              <Knob label="Water" value={water} min={0} max={100} onChange={setWater} unit="/100" tip="Moist, not soggy!" />
              <Knob label="Light (hrs)" value={light} min={0} max={16} onChange={setLight} unit="h" tip="Plants eat light." />
              <Knob label="Temp (°C)" value={temp} min={10} max={35} onChange={setTemp} unit="°C" tip="Comfy room temp." />
            </div>
            <div className="flex gap-3 pt-3">
              <Button onClick={startSim} variant="primary">▶️ Simulate 7 days</Button>
              <Button onClick={stopSim} variant="ghost">⏹ Stop</Button>
              <Button onClick={resetBest} variant="secondary">🔄 Best Mix</Button>
            </div>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-4">
          <Card title="Your Plant">
            <div className="flex items-center justify-between">
              <div className="text-6xl select-none">{stageEmoji}</div>
              <div className="text-right">
                <div className="text-sm text-slate-600">Day</div>
                <div className="text-2xl font-bold">{day}/7</div>
              </div>
            </div>
            <Progress value={(day / 7) * 100} />
            <div className="mt-3 p-3 rounded-xl bg-slate-50 border text-sm">
              <div className="font-semibold">Outcome: {outcome.text}</div>
              <div className="text-slate-600">Score: <strong>{totalScore}</strong> / 100</div>
            </div>
          </Card>
          <Card title="Why did that happen?">
            <ul className="space-y-2 text-sm">
              <Reason label="Char vs Regolith" value={Math.round(scores.char * 100)} expl="Too much regolith can add salts (e.g., perchlorates). 60–80% char is friendliest." />
              <Reason label="Cotton Pulp" value={Math.round(scores.binder * 100)} expl="A bit of pulp holds water and keeps crumbs together." />
              <Reason label="Water" value={Math.round(scores.water * 100)} expl="Too dry or too soggy = sad roots." />
              <Reason label="Light" value={Math.round(scores.light * 100)} expl="Not enough light = leggy seedlings." />
              <Reason label="Temperature" value={Math.round(scores.temp * 100)} expl="Room‑cozy is best for most microgreens." />
            </ul>
            <div className="mt-3 p-3 rounded-xl bg-amber-50 border text-amber-800 text-sm">Hint: <strong>{whyMap[weakest]}</strong></div>
          </Card>
          <LessonCard />
        </div>
      </section>
    </div>
  );
}

function Tip({ children }) {
  return (
    <div className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
      <span>💡</span>
      {children}
    </div>
  );
}
function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 border p-4 text-center shadow-sm">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-xl font-bold text-slate-800">{value}</div>
    </div>
  );
}
function Knob({ label, value, min, max, onChange, unit, tip }) {
  return (
    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 shadow-sm">
      <div className="text-sm font-semibold mb-1">{label}: <span className="font-bold text-emerald-600">{value}{unit}</span></div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(clamp(parseInt(e.target.value || "0"), min, max))} className="w-full accent-sky-600 cursor-pointer" />
      <div className="text-xs text-slate-600 mt-1">{tip}</div>
    </div>
  );
}
function Reason({ label, value, expl }) {
  return (
    <li className="flex items-center gap-3">
      <div className="w-36 text-slate-700 text-sm font-medium">{label}</div>
      <div className="flex-1"><Progress value={value} /></div>
      <div className="text-xs text-slate-600 w-44">{expl}</div>
    </li>
  );
}
function Progress({ value }) {
  return (
    <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
      <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${clamp(value, 0, 100)}%` }} />
    </div>
  );
}
function LessonCard() {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Mini-Lesson: What do plants need?</h3>
        <button className="text-sm underline" onClick={() => setOpen((o) => !o)}>{open ? "Hide" : "Show"}</button>
      </div>
      {open && (
        <div className="mt-2 grid gap-2 text-sm text-emerald-900">
          <div>• <strong>Nutrients</strong> (from <em>char</em> & supplements) let roots feed.</div>
          <div>• <strong>Cotton pulp</strong> adds air spaces and wicking to keep seeds comfy.</div>
          <div>• <strong>Minerals</strong> (from <em>regolith</em>) provide building blocks.</div>
          <div>• <strong>Water</strong> is the drink; not too little, not too much.</div>
          <div>• <strong>Light</strong> is plant energy (sun or lamps).</div>
          <div>• <strong>Warmth</strong> helps seeds wake up and grow.</div>
          <div className="mt-2">Try the sliders! Can you find a mix that <em>thrives</em>? What happens if char is only 20%?</div>
        </div>
      )}
    </div>
  );
}
