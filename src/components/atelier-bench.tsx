import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { FILS, PIECES, readAtelier, type Fil, type Piece } from "@/lib/edition";

const STORAGE_KEY = "seuil-carnet";

type Note = {
  id: string;
  bpm: number;
  choice: Record<Piece, Fil>;
  tableau: string;
  sentence: string;
};

const EMPTY: Record<Piece, Fil> = {
  coiffe: "encre",
  col: "encre",
  manches: "cinabre",
  ceinture: "or",
};

const FIL_CLASS: Record<Fil, string> = {
  encre: "bg-ink",
  cinabre: "bg-cinnabar",
  or: "bg-gold",
};

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Note[];
    return Array.isArray(parsed) ? parsed.slice(0, 8) : [];
  } catch {
    return [];
  }
}

export function AtelierBench() {
  const [choice, setChoice] = useState<Record<Piece, Fil>>(EMPTY);
  const [bpm, setBpm] = useState(76);
  const [taps, setTaps] = useState(0);
  const [notes, setNotes] = useState<Note[]>([]);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const tapTimes = useRef<number[]>([]);

  useEffect(() => {
    setNotes(loadNotes());
    setReady(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes, ready]);

  const reading = readAtelier(choice, bpm);
  const swing = reduced ? undefined : `${Math.max(0.45, 60 / bpm)}s`;

  function tapTempo() {
    const now = performance.now();
    const recent = tapTimes.current.filter((t) => now - t < 2400);
    recent.push(now);
    tapTimes.current = recent;
    setTaps(recent.length);
    if (recent.length < 2) return;
    const intervals: number[] = [];
    for (let i = 1; i < recent.length; i++) intervals.push(recent[i] - recent[i - 1]);
    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const next = Math.round(60000 / avg);
    setBpm(Math.min(168, Math.max(48, next)));
  }

  function pin() {
    const note: Note = {
      id: `${Date.now()}`,
      bpm,
      choice: { ...choice },
      tableau: reading.tableau.title,
      sentence: reading.sentence,
    };
    setNotes((prev) => [note, ...prev].slice(0, 8));
  }

  function onKey(event: React.KeyboardEvent) {
    if (event.key === " ") {
      event.preventDefault();
      tapTempo();
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 md:px-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div>
        <p className="text-xs uppercase tracking-widest text-gold">Deuxième parcours · l'atelier</p>
        <h1 className="mt-2 font-display text-5xl leading-none md:text-6xl">Couper les manches</h1>
        <p className="mt-4 max-w-xl text-lg">
          Ici, on ne traverse pas le décor. On prépare un costume fictif et on lui donne un tempo. La manche
          répond à votre cadence — ce n'est pas la scène, c'est la répétition d'avant.
        </p>

        <div
          className="mt-8 grid items-center gap-8 border border-ink/15 p-4 md:grid-cols-[16rem_minmax(0,1fr)] md:p-8"
          onKeyDown={onKey}
        >
          <div className="mx-auto flex h-96 max-w-xs flex-col items-center justify-center" aria-hidden>
            <div className={`h-3 w-16 ${FIL_CLASS[choice.coiffe]}`} />
            <div className="mt-2 size-10 rounded-full border border-ink bg-paper-deep" />
            <div className={`mt-2 h-5 w-12 ${FIL_CLASS[choice.col]}`} />
            <div className="mt-1 flex items-start justify-center">
              <div
                className={`sleeve-swing mt-6 h-4 ${FIL_CLASS[choice.manches]}`}
                style={{
                  width: `${2.75 + bpm / 48}rem`,
                  transformOrigin: "right center",
                  animationDuration: swing,
                }}
              />
              <div
                className={`relative mx-1 h-52 w-24 ${FIL_CLASS[choice.manches]}`}
                style={{ clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0 100%)" }}
              >
                <div className={`absolute top-16 left-1/2 h-3 w-28 -translate-x-1/2 ${FIL_CLASS[choice.ceinture]}`} />
              </div>
              <div
                className={`sleeve-swing mt-6 h-4 ${FIL_CLASS[choice.manches]}`}
                style={{
                  width: `${2.75 + bpm / 48}rem`,
                  transformOrigin: "left center",
                  animationDuration: swing,
                  animationDelay: "-0.35s",
                }}
              />
            </div>
            <div className="h-8 w-px bg-ink" />
            <div className="h-px w-24 bg-ink" />
          </div>

          <div className="flex flex-col gap-5">
            {PIECES.map((piece) => (
              <fieldset key={piece.id}>
                <legend className="text-sm">
                  {piece.label}
                  <span className="ml-2 text-ink-soft">{piece.hint}</span>
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {FILS.map((fil) => {
                    const on = choice[piece.id] === fil.id;
                    return (
                      <button
                        key={fil.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setChoice((prev) => ({ ...prev, [piece.id]: fil.id }))}
                        className={
                          on
                            ? "inline-flex min-h-11 items-center border border-ink bg-ink px-4 text-sm text-paper"
                            : "inline-flex min-h-11 items-center border border-ink/20 px-4 text-sm"
                        }
                      >
                        {fil.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <div className="border-t border-ink/15 pt-4">
              <p className="text-sm text-ink-soft">
                Tapez le temps, au moins deux fois. Espace fonctionne quand cette zone a le focus.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={tapTempo}
                  className="inline-flex min-h-11 items-center border border-cinnabar bg-cinnabar px-4 text-sm text-paper"
                >
                  Poser le temps
                </button>
                <label className="text-sm">
                  Tempo
                  <input
                    className="ml-2 w-20 border border-ink/20 bg-paper px-2 py-2"
                    type="number"
                    min={48}
                    max={168}
                    value={bpm}
                    onChange={(e) => setBpm(Math.min(168, Math.max(48, Number(e.target.value) || 48)))}
                  />
                  <span className="ml-1">bpm</span>
                </label>
                <span className="text-sm text-ink-soft">{taps < 2 ? "En attente d'un second tap." : "Tempo pris."}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="flex flex-col gap-4 border border-ink bg-ink p-6 text-paper">
        <p className="text-xs uppercase tracking-widest text-gold">Lecture d'atelier · fiction</p>
        <h2 className="font-display text-4xl leading-none">{reading.tableau.title}</h2>
        <p className="font-display text-xl italic">{reading.sentence}</p>
        <p className="text-sm text-paper/80">
          Cette association est une règle inventée pour le prototype : elle ne décrit pas un costume réel de
          Shen Yun. Tempo actuel : {bpm} bpm.
        </p>
        <button
          type="button"
          onClick={pin}
          className="inline-flex min-h-11 items-center justify-center border border-paper px-4 text-sm hover:bg-paper hover:text-ink"
        >
          Épingler dans le carnet (cet appareil)
        </button>
        <Link
          to="/seuil"
          search={{ t: reading.tableau.id }}
          className="inline-flex min-h-11 items-center text-sm underline decoration-gold underline-offset-4"
        >
          Voir ce tableau sur la scène
        </Link>

        <div className="mt-2 border-t border-paper/20 pt-4">
          <h3 className="font-display text-2xl">Carnet local</h3>
          <p className="mt-1 text-sm text-paper/80">
            Resté dans ce navigateur. Rien n'est envoyé. Vous pouvez effacer chaque note.
          </p>
          {notes.length === 0 ? (
            <p className="mt-3 text-sm">Aucune note encore.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-3">
              {notes.map((note) => (
                <li key={note.id} className="border border-paper/20 p-3 text-sm">
                  <p className="font-display text-xl text-paper">{note.tableau}</p>
                  <p className="mt-1">{note.sentence}</p>
                  <p className="mt-1 text-paper/70">{note.bpm} bpm</p>
                  <button
                    type="button"
                    className="mt-2 min-h-11 underline decoration-gold underline-offset-4"
                    onClick={() => setNotes((prev) => prev.filter((item) => item.id !== note.id))}
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
