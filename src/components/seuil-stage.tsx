import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TABLEAUX } from "@/lib/edition";

type Props = { initialIndex: number };

const PENTA = [261.63, 293.66, 329.63, 392, 440];
const MOTIFS = [
  [0, 2, 4, 2, 0],
  [4, 3, 2, 0, 2],
  [2, 2, 4, 3, 0],
  [0, 0, 1, 0, 3],
  [4, 2, 3, 4, 1],
  [4, 4, 2, 0, 0],
  [4, 2, 0, 2, 4],
];

function cssColor(name: string, fallback: string) {
  if (typeof document === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function drawRidge(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  yBase: number,
  amp: number,
  freq: number,
  seed: number,
  color: string,
  alpha: number,
) {
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let x = 0; x <= w; x += 8) {
    const n =
      Math.sin(x * freq + seed) * amp + Math.sin(x * freq * 2.1 + seed * 1.7) * amp * 0.33;
    ctx.lineTo(x, yBase + n);
  }
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fill();
  ctx.globalAlpha = 1;
}

function traceDancer(
  ctx: CanvasRenderingContext2D,
  pose: { sleeve: number; lean: number; lift: number; bow: number },
) {
  const sleeve = 36 + pose.sleeve * 150;
  const bow = pose.bow * 28;
  const lift = pose.lift * 46;
  ctx.rotate(pose.lean * 0.18);

  ctx.beginPath();
  ctx.moveTo(-16, -8);
  ctx.lineTo(-10, -78 + bow);
  ctx.lineTo(8, -78 + bow);
  ctx.lineTo(14, -6 - lift * 0.1);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-6, -6);
  ctx.lineTo(-18, 0);
  ctx.moveTo(6, -6 - lift * 0.05);
  ctx.lineTo(16 + lift * 0.15, -lift);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-22, -132 + bow);
  ctx.lineTo(-16, -78 + bow);
  ctx.lineTo(16, -78 + bow);
  ctx.lineTo(22, -128 + bow);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, -156 + bow, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-8, -166 + bow);
  ctx.quadraticCurveTo(0, -188 + bow, 10, -164 + bow);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-20, -130 + bow);
  ctx.quadraticCurveTo(-70 - sleeve * 0.2, -110 + bow, -28 - sleeve, -78 + bow);
  ctx.quadraticCurveTo(-sleeve * 0.55, -96 + bow, -16, -112 + bow);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(20, -128 + bow);
  ctx.quadraticCurveTo(60 + sleeve * 0.15, -150 + bow, 24 + sleeve, -96 + bow);
  ctx.quadraticCurveTo(sleeve * 0.4, -120 + bow, 14, -114 + bow);
  ctx.fill();
  ctx.stroke();
}

type LoopState = {
  index: number;
  threshold: number;
  crossed: number;
  calm: boolean;
  time: number;
};

export function SeuilStage({ initialIndex }: Props) {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const kickRef = useRef<() => void>(() => {});
  const audioRef = useRef<AudioContext | null>(null);
  const timers = useRef<number[]>([]);
  const stateRef = useRef<LoopState>({
    index: initialIndex,
    threshold: 0.5,
    crossed: 0,
    calm: false,
    time: 0,
  });

  const [index, setIndex] = useState(initialIndex);
  const [threshold, setThreshold] = useState(0.5);
  const [crossed, setCrossed] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [calm, setCalm] = useState(false);
  const [reduced, setReduced] = useState(false);

  const tableau = TABLEAUX[index];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    stateRef.current.index = index;
    stateRef.current.threshold = threshold;
    stateRef.current.calm = calm || reduced;
    if (calm || reduced) kickRef.current();
  }, [index, threshold, calm, reduced, crossed]);

  useEffect(() => {
    let frame = 0;
    const from = stateRef.current.crossed;
    const to = crossed ? 1 : 0;
    if (calm || reduced) {
      stateRef.current.crossed = to;
      return;
    }
    const start = performance.now();
    const run = (now: number) => {
      const t = Math.min(1, (now - start) / 700);
      const eased = 1 - (1 - t) * (1 - t);
      stateRef.current.crossed = from + (to - from) * eased;
      if (t < 1) frame = requestAnimationFrame(run);
    };
    frame = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame);
  }, [crossed, calm, reduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const paint = (now: number) => {
      const s = stateRef.current;
      s.time = now;
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const ink = cssColor("--color-ink", "#1a1410");
      const paper = cssColor("--color-paper", "#f3ecdf");
      const gold = cssColor("--color-gold", "#8d7040");
      const pine = cssColor("--color-pine", "#1e3330");
      const cinnabar = cssColor("--color-cinnabar", "#8e2f2a");
      const scene = TABLEAUX[s.index];
      const drift = s.calm ? 0 : Math.sin(now / 1400) * 6;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, w, h);

      if (scene.moon) {
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = gold;
        ctx.beginPath();
        ctx.arc(w * 0.78, h * 0.22, Math.min(w, h) * 0.045, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = paper;
        ctx.beginPath();
        ctx.arc(w * 0.78 + 10, h * 0.22 - 4, Math.min(w, h) * 0.038, 0, Math.PI * 2);
        ctx.fill();
      }

      const base = h * (0.58 - scene.ridge * 0.08);
      drawRidge(ctx, w, h, base + drift, 18 + scene.ridge * 26, 0.007, scene.id, pine, 0.28);
      drawRidge(ctx, w, h, base + 36, 22 + scene.ridge * 18, 0.011, scene.id + 2, ink, 0.55);
      drawRidge(ctx, w, h, base + 78, 14, 0.02, scene.id + 4, ink, 0.9);

      if (scene.river) {
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = pine;
        ctx.fillRect(0, h * 0.72, w, h * 0.035);
        ctx.globalAlpha = 1;
      }

      if (scene.earth > 0) {
        ctx.globalAlpha = scene.earth * 0.45;
        ctx.fillStyle = cinnabar;
        ctx.fillRect(0, h * 0.8, w, h * 0.2);
        ctx.globalAlpha = 1;
      }

      if (scene.snow) {
        ctx.fillStyle = paper;
        for (let i = 0; i < 40; i++) {
          const x = ((i * 97) % 100) / 100 * w;
          const y = ((i * 53) % 100) / 100 * h * 0.75;
          ctx.globalAlpha = 0.8;
          ctx.fillRect(x, y, 2, 2);
        }
        ctx.globalAlpha = 1;
      }

      for (let i = 0; i < scene.lanterns; i++) {
        const x = w * (0.18 + (i / Math.max(1, scene.lanterns)) * 0.7);
        const y = h * (0.18 + ((i * 17) % 10) / 80);
        ctx.fillStyle = gold;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      const scale = Math.min(h / 430, w / 340);
      const cx = w * 0.46;
      const cy = h * 0.84;
      const pose = {
        sleeve: scene.sleeve + s.crossed * 0.28,
        lean: scene.lean,
        lift: scene.lift,
        bow: scene.bow * (1 - s.crossed * 0.4),
      };

      const drawBody = (mode: "ink" | "stage") => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(scale, scale);
        ctx.lineWidth = mode === "ink" ? 1.4 : 1.6;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = mode === "ink" ? ink : gold;
        ctx.fillStyle = mode === "ink" ? paper : cinnabar;
        traceDancer(ctx, pose);
        ctx.restore();
      };

      drawBody("ink");

      const cut = w * s.threshold;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, cut, h);
      ctx.clip();
      ctx.fillStyle = pine;
      ctx.globalAlpha = 0.88;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
      const spot = ctx.createRadialGradient(cx, cy - 120 * scale, 20, cx, cy - 80 * scale, 220 * scale);
      spot.addColorStop(0, "rgba(243,236,223,0.28)");
      spot.addColorStop(1, "rgba(243,236,223,0)");
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = gold;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, cy + 8);
      ctx.lineTo(w, cy + 8);
      ctx.stroke();
      ctx.globalAlpha = 1;
      drawBody("stage");
      ctx.restore();

      ctx.strokeStyle = cinnabar;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cut, 0);
      ctx.lineTo(cut, h);
      ctx.stroke();

      if (!s.calm && document.visibilityState === "visible") {
        raf = requestAnimationFrame(paint);
      }
    };

    const kick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    };
    kickRef.current = kick;

    kick();
    const observer = new ResizeObserver(kick);
    observer.observe(wrap);
    const onVis = () => kick();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [calm, reduced]);

  function go(next: number) {
    const clamped = Math.max(0, Math.min(TABLEAUX.length - 1, next));
    setIndex(clamped);
    setCrossed(false);
    void navigate({ to: "/seuil", search: { t: clamped + 1 }, replace: true });
    if (soundOn) playMotif(clamped);
  }

  function playMotif(i: number) {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    const ctx = audioRef.current;
    if (!ctx) return;
    const motif = MOTIFS[i] ?? MOTIFS[0];
    motif.forEach((degree, step) => {
      const id = window.setTimeout(() => tone(ctx, PENTA[degree], 0.22), step * 190);
      timers.current.push(id);
    });
  }

  function tone(ctx: AudioContext, freq: number, dur: number) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const level = 0.0001 + volume * 0.06;
    gain.gain.setValueAtTime(level, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur + 0.02);
  }

  async function toggleSound() {
    if (soundOn) {
      setSoundOn(false);
      timers.current.forEach((id) => window.clearTimeout(id));
      return;
    }
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioRef.current) audioRef.current = new Ctx();
    await audioRef.current.resume();
    setSoundOn(true);
    playMotif(index);
  }

  function onPointer(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" || event.buttons > 0) {
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (event.clientX - rect.left) / rect.width;
      setThreshold(Math.min(0.92, Math.max(0.08, x)));
    }
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(index + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(index - 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setThreshold((v) => Math.min(0.92, v + 0.04));
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setThreshold((v) => Math.max(0.08, v - 0.04));
      } else if (event.key === " ") {
        event.preventDefault();
        setCrossed((v) => !v);
        if (soundOn && audioRef.current) tone(audioRef.current, crossed ? 329.63 : 392, 0.18);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // go closes over index; rebinding is intended
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, soundOn, volume, crossed]);

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      void audioRef.current?.close();
    };
  }, []);

  const calmOn = calm || reduced;

  return (
    <div className="bg-paper">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div
            ref={wrapRef}
            onPointerDown={onPointer}
            onPointerMove={onPointer}
            className="relative min-h-96 touch-none border border-ink/15 bg-paper md:min-h-[36rem]"
          >
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
            <p className="pointer-events-none absolute top-4 right-4 hidden bg-paper/90 px-2 py-1 text-xs text-ink-soft md:block">
              {calmOn ? "Image fixe" : "Le curseur est la frontière"}
            </p>
          </div>

          <div className="mt-4 grid gap-4 border border-ink/15 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 border border-ink/20 px-3 text-sm disabled:opacity-40"
                onClick={() => go(index - 1)}
                disabled={index === 0}
              >
                <ArrowLeft aria-hidden className="size-4" />
                Précédent
              </button>
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 border border-ink/20 px-3 text-sm disabled:opacity-40"
                onClick={() => go(index + 1)}
                disabled={index === TABLEAUX.length - 1}
              >
                Suivant
                <ArrowRight aria-hidden className="size-4" />
              </button>
              <button
                type="button"
                className="inline-flex min-h-11 items-center border border-ink bg-ink px-4 text-sm text-paper hover:bg-cinnabar"
                onClick={() => setCrossed((v) => !v)}
                aria-pressed={crossed}
              >
                {crossed ? "Ramener le geste" : "Franchir"}
              </button>
            </div>

            <label className="block text-sm">
              <span className="mb-2 flex items-center justify-between">
                <span>Position du seuil</span>
                <span className="text-ink-soft">{Math.round(threshold * 100)}</span>
              </span>
              <input
                suppressHydrationWarning
                className="w-full accent-cinnabar"
                type="range"
                min={8}
                max={92}
                value={Math.round(threshold * 100)}
                onChange={(e) => setThreshold(Number(e.target.value) / 100)}
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {TABLEAUX.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  aria-current={i === index}
                  onClick={() => go(i)}
                  className={
                    i === index
                      ? "inline-flex size-11 items-center justify-center border border-cinnabar bg-cinnabar font-display text-lg text-paper"
                      : "inline-flex size-11 items-center justify-center border border-ink/20 font-display text-lg"
                  }
                >
                  <span className="sr-only">{item.title}</span>
                  <span aria-hidden>{item.seal}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 border border-ink/20 px-3 text-sm"
                onClick={() => void toggleSound()}
                aria-pressed={soundOn}
              >
                {soundOn ? <Volume2 aria-hidden className="size-4" /> : <VolumeX aria-hidden className="size-4" />}
                {soundOn ? "Son original coupé" : "Activer un son original"}
              </button>
              <label className="flex min-w-40 flex-1 items-center gap-2 text-sm">
                <span className="sr-only">Volume</span>
                <input
                  suppressHydrationWarning
                  className="w-full accent-cinnabar"
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(volume * 100)}
                  onChange={(e) => setVolume(Number(e.target.value) / 100)}
                  disabled={!soundOn}
                />
              </label>
              <label className="inline-flex min-h-11 items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={calmOn}
                  onChange={(e) => setCalm(e.target.checked)}
                  disabled={reduced}
                />
                {reduced ? "Mouvement réduit par l'appareil" : "Version calme"}
              </label>
            </div>
            <p className="text-sm text-ink-soft">
              Clavier : flèches gauche et droite pour les tableaux, haut et bas pour déplacer le seuil, espace
              pour franchir. Le son est facultatif, original, généré ici — ce n'est pas une musique du spectacle.
            </p>
          </div>
        </div>

        <aside className="flex flex-col gap-4 lg:pt-2">
          <p className="text-xs uppercase tracking-widest text-gold">
            {tableau.act} · tableau {tableau.id} / {TABLEAUX.length} · fiction
          </p>
          <h1 className="font-display text-5xl leading-none">{tableau.title}</h1>
          <p className="font-display text-3xl leading-none text-cinnabar" lang="zh-Hans">
            {tableau.seal}
            <span className="ml-3 font-sans text-sm tracking-normal text-ink-soft">{tableau.sealReading}</span>
          </p>
          <p className="font-display text-2xl leading-snug italic">{tableau.poem}</p>
          <p>{tableau.see}</p>
          <dl className="grid grid-cols-2 gap-3 border-t border-ink/15 pt-4 text-sm">
            <div>
              <dt className="text-ink-soft">Durée fictive</dt>
              <dd>{tableau.duration}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Musique fictive</dt>
              <dd>{tableau.sound}</dd>
            </div>
          </dl>
          <p className="text-sm text-ink-soft" aria-live="polite">
            {crossed
              ? "Le geste a franchi. Les manches s'allongent vers la peinture."
              : "Le geste est retenu du côté où vous placez la frontière."}
          </p>
          <Link
            to="/foyer"
            hash="programmation"
            className="inline-flex min-h-11 items-center text-sm underline decoration-gold underline-offset-4"
          >
            Lire le programme sans explorer
          </Link>
        </aside>
      </div>
    </div>
  );
}
