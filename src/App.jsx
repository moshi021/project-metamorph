import React, { useEffect, useMemo, useRef, useState } from "react";

// --- Helpers ---------------------------------------------------------------
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

// --- Main Component --------------------------------------------------------
export default function PlantGrowthLab() {
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

  const scores = useMemo(
    () => ({
      char: scoreTriangular(charPct, IDEAL.char, TOL.char),
      binder: scoreTriangular(binderPct, IDEAL.binder, TOL.binder),
      water: scoreTriangular(water, IDEAL.water, TOL.water),
      light: scoreTriangular(light, IDEAL.light, TOL.light),
      temp: scoreTriangular(temp, IDEAL.temp, TOL.temp),
    }),
    [charPct, binderPct, water, light, temp]
  );

  const totalScore = useMemo(() => {
    const w = { char: 0.5, binder: 0.1, water: 0.2, light: 0.1, temp: 0.1 };
    const s =
      scores.char * w.char +
      scores.binder * w.binder +
      scores.water * w.water +
      scores.light * w.light +
      scores.temp * w.temp;
    return Math.round(s * 100);
  }, [scores]);

  const outcome = useMemo(() => {
    if (totalScore >= 80)
      return { tag: "thrives", text: "Thrives! Lush and happy.", emoji: "🌿" };
    if (totalScore >= 60)
      return { tag: "grows", text: "Grows, but a bit weak.", emoji: "🌱" };
    if (totalScore >= 40)
      return { tag: "struggles", text: "Struggles. Needs help.", emoji: "🥀" };
    return { tag: "fails", text: "Fails to grow. Let's fix it!", emoji: "🥀" };
  }, [totalScore]);

  const weakest = useMemo(() => weakestKey(scores), [scores]);
  const whyMap = {
    char: "Add more Char for air spaces so roots can breathe.",
    binder: "A little binder helps hold moisture like a sponge.",
    water: "Too dry or too soggy makes roots unhappy.",
    light: "Plants eat light! Try more hours (but not 24/7).",
    temp: "Make it cozy—not too hot, not too cold.",
  };

  useEffect(() => {
    if (!running) return;
    timerRef.current && clearInterval(timerRef.current);
    setDay(0);
    timerRef.current = setInterval(() => {
      setDay((d) => {
        if (d >= 7) {
          clearInterval(timerRef.current);
          return 7;
        }
        return d + 1;
      });
    }, 600);
    return () => clearInterval(timerRef.current);
  }, [running]);

  const startSim = () => setRunning(true);
  const stopSim = () => {
    setRunning(false);
    setDay(0);
  };
  const resetBest = () => {
    setCharPct(70);
    setBinderPct(10);
    setWater(60);
    setLight(12);
    setTemp(22);
  };

  const stageEmoji = useMemo(() => {
    if (outcome.tag === "fails" && day >= 3) return "🥀";
    if (outcome.tag === "struggles" && day >= 5) return "🥀";
    if (day < 2) return "🌱";
    if (day < 5) return "🌿";
    return outcome.emoji;
  }, [day, outcome]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 to-white text-slate-900">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-6 grid gap-6 md:grid-cols-5">
        {/* Controls */}
        <section className="md:col-span-3 space-y-4">
          <Card title="Recipe: Char vs Regolith">
            <div className="space-y-2">
              <Label>
                Char: <strong>{charPct}%</strong> · Regolith:{" "}
                <strong>{regolithPct}%</strong>
              </Label>
              <input
                type="range"
                min={0}
                max={100}
                value={charPct}
                onChange={(e) =>
                  setCharPct(clamp(parseInt(e.target.value || "0"), 0, 100))
                }
                className="w-full accent-emerald-600"
              />
              <Tip>
                Char
              </Tip>

                {/* Benefits of Char */}
            <ul className="mt-3 space-y-1 text-sm text-emerald-700">
              <li>🌱 Enhances soil fertility</li>
              <li>🦠 Supports beneficial microbes</li>
              <li>🪨 Improves soil structure</li>
            </ul>

            <Tip>
                Regolith=Minerals,To support ISRU mission
            </Tip>
            
            Try 70% Char and 30% Regolith for best results!

            </div>

            <div className="grid grid-cols-3 gap-4 pt-3">
              <MiniStat label="Char" value={pct(charPct)} />
              <MiniStat label="Regolith" value={pct(regolithPct)} />
              <MiniStat label="Cotton Pulp" value={pct(binderPct)} />
            </div>
          </Card>

          <Card title="Cotton Pulp">
            <div className="space-y-2">
              <Label>
                Binder amount: <strong>{binderPct}%</strong>
              </Label>
              <input
                type="range"
                min={0}
                max={30}
                value={binderPct}
                onChange={(e) =>
                  setBinderPct(clamp(parseInt(e.target.value || "0"), 0, 30))
                }
                className="w-full accent-amber-600"
              />
              <Tip><h2>
                Cotton Pulp </h2>
              </Tip>
            </div>

            {/* Benefits of Cotton Pulp */}
            <ul className="mt-3 space-y-1 text-sm text-blue-700">
              <li>💧 Keeps seeds hydrated for germination</li>
              <li>🌬️ Allows roots to breathe</li>
              <li>🌿 Facilitates root penetration</li>
            </ul>
          </Card>

          <Card title="Care Settings">
            <div className="grid md:grid-cols-3 gap-4">
              <Knob
                label="Water"
                value={water}
                min={0}
                max={100}
                onChange={setWater}
                unit="/100"
                tip="Moist, not soggy!"
              />
              <Knob
                label="Light (hrs)"
                value={light}
                min={0}
                max={16}
                onChange={setLight}
                unit="h"
                tip="Plants eat light."
              />
              <Knob
                label="Temp (°C)"
                value={temp}
                min={10}
                max={35}
                onChange={setTemp}
                unit="°C"
                tip="Comfy room temp."
              />
            </div>
            <div className="flex gap-3 pt-3">
              <Button onClick={startSim} variant="primary">
                ▶️ Simulate 7 days
              </Button>
              <Button onClick={stopSim} variant="ghost">
                ⏹ Stop
              </Button>
              <Button onClick={resetBest} variant="secondary">
                🔄 Best Mix
              </Button>
            </div>
          </Card>
        </section>

        {/* Visualization & Feedback */}
        <section className="md:col-span-2 space-y-4">
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
              <div className="text-slate-600">
                Score: <strong>{totalScore}</strong> / 100
              </div>
            </div>
          </Card>

          <Card title="Why did that happen?">
            <ul className="space-y-2 text-sm">
              <Reason
                label="Char vs Regolith"
                value={Math.round(scores.char * 100)}
                expl="More Regolith means more toxic element perchllorides. 60–80% Char is friendliest."
              />
              <Reason
                label="Cotton Pulp"
                value={Math.round(scores.binder * 100)}
                expl="A bit of pulp holds water and keeps crumbs together."
              />
              <Reason
                label="Water"
                value={Math.round(scores.water * 100)}
                expl="Too dry or too soggy = sad roots."
              />
              <Reason
                label="Light"
                value={Math.round(scores.light * 100)}
                expl="Not enough light = leggy seedlings."
              />
              <Reason
                label="Temperature"
                value={Math.round(scores.temp * 100)}
                expl="Room-cozy is best for most microgreens."
              />
            </ul>
            <div className="mt-3 p-3 rounded-xl bg-amber-50 border text-amber-800 text-sm">
              Hint: <strong>{whyMap[weakest]}</strong>
            </div>
          </Card>

          <LessonCard />
        </section>
      </main>

      <Footer />
    </div>
  );
}

// --- UI Components ---------------------------------------------------------
function Card({ title, children }) {
  return (
    <div className="bg-white border border-slate-200 shadow-md rounded-2xl p-6 transition hover:shadow-lg">
      {title && (
        <h2 className="text-lg font-bold mb-4 text-slate-800">{title}</h2>
      )}
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <div className="text-sm text-slate-700 font-medium">{children}</div>
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
      <div className="text-sm font-semibold mb-1">
        {label}:{" "}
        <span className="font-bold text-emerald-600">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) =>
          onChange(clamp(parseInt(e.target.value || "0"), min, max))
        }
        className="w-full accent-sky-600 cursor-pointer"
      />
      <div className="text-xs text-slate-600 mt-1">{tip}</div>
    </div>
  );
}

function Reason({ label, value, expl }) {
  return (
    <li className="flex items-center gap-3">
      <div className="w-36 text-slate-700 text-sm font-medium">{label}</div>
      <div className="flex-1">
        <Progress value={value} />
      </div>
      <div className="text-xs text-slate-600 w-40">{expl}</div>
    </li>
  );
}

function Progress({ value }) {
  return (
    <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
      <div
        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
        style={{ width: `${clamp(value, 0, 100)}%` }}
      />
    </div>
  );
}

function Button({ children, onClick, variant = "primary" }) {
  const base = "px-4 py-2 rounded-xl font-medium transition";
  const styles = {
    primary: "bg-emerald-500 text-white hover:bg-emerald-600",
    secondary: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    ghost: "border border-slate-300 text-slate-600 hover:bg-slate-100",
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}

function LessonCard() {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Mini-Lesson: What do plants need?</h3>
        <button
          className="text-sm underline"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>
      {open && (
        <div className="mt-2 grid gap-2 text-sm text-emerald-900">
          <div>
            • <strong>Neutreations</strong> (from <em>Char</em>) let roots eat.
          </div>
          <div>
            • <strong>Cotton Pulp</strong> (from <em>Char</em>) let roots breathe and penetrate.
            </div>
          <div>
            • <strong>Minerals</strong> (from <em>Regolith</em>) give building
            blocks.
          </div>
          <div>
            • <strong>Water</strong> is the drink; not too little, not too much.
          </div>
          <div>
            • <strong>Light</strong> is plant food from the sun (or lamps).
          </div>
          <div>
            • <strong>Warmth</strong> helps seeds wake up and grow.
          </div>
          <div className="mt-2">
            Try the sliders! Can you find a mix that <em>thrives</em>? What
            happens if Char is only 20%?
          </div>
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-gradient-to-r from-emerald-100 to-sky-100 border-b border-emerald-200">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center gap-3">
        <div className="text-3xl">🧪</div>
        <h1 className="text-2xl font-bold text-emerald-700">
          Plant Growth Lab
        </h1>
        <span className="ml-auto text-sm text-slate-700 font-sans">
          Learn by mixing & caring for your 🌱
        </span>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-12 bg-gradient-to-r from-sky-50 to-emerald-50 border-t border-slate-200">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-slate-600">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 inline-block">
          🌟 Try a challenge: Can you make your plant{" "}
          <strong>struggle</strong> on purpose, then fix it? Notice what
          changes!
        </div>
        <div className="mt-4 text-xs text-slate-500">
          Build By Team Metamorph (Md. Mashiur Rahman)
        </div>
      </div>
    </footer>
  );
}
