import { useState } from "react";
import { CITIES, SHOW, TABLEAUX, ZONES } from "@/lib/edition";

const CHECKS = [
  { id: "heure", label: "Arriver quarante minutes avant — règle de cette fiction, pas une consigne officielle." },
  { id: "silence", label: "Téléphone en silencieux. Conseil de salle, général." },
  { id: "flash", label: "Pas de flash pendant les tableaux. Règle inventée pour Le Seuil." },
  { id: "tambour", label: "Le tableau Tambour de terre est le plus sonore. Prévoir de quoi atténuer si besoin." },
  { id: "texte", label: "Lire le programme du foyer si vous préférez ne pas passer par la scène interactive." },
];

function code() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 4; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `SEUIL-2027-${out}`;
}

export function FoyerGuide() {
  const [city, setCity] = useState(CITIES[0].id);
  const [zone, setZone] = useState<(typeof ZONES)[number]["id"]>("corbeille");
  const [qty, setQty] = useState(1);
  const [ticket, setTicket] = useState<string | null>(null);
  const [pack, setPack] = useState<Record<string, boolean>>({});

  const selectedCity = CITIES.find((item) => item.id === city) ?? CITIES[0];
  const selectedZone = ZONES.find((item) => item.id === zone) ?? ZONES[1];
  const total = selectedZone.price * qty;

  return (
    <div>
      <header className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <p className="text-xs uppercase tracking-widest text-gold">Troisième parcours · accès direct</p>
        <h1 className="mt-2 max-w-3xl font-display text-5xl leading-none md:text-7xl">Le foyer, sans détour</h1>
        <p className="mt-4 max-w-2xl text-lg">
          Tout ce qu'il faut pour comprendre l'édition fictive, sans traverser la scène ni couper un costume.
          Chaque date, chaque prix, chaque salle est inventé.
        </p>
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Sections du foyer">
          {[
            ["edition", "Édition"],
            ["programmation", "Tableaux"],
            ["tournee", "Tournée"],
            ["preparer", "Préparer"],
            ["acces", "Accès"],
            ["accessibilite", "Accessibilité"],
            ["faq", "FAQ"],
            ["billet", "Billet simulé"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="inline-flex min-h-11 items-center border border-ink/20 px-3 text-sm hover:border-ink"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section id="edition" className="scroll-mt-24 border-t border-ink/15">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-12 md:px-6">
          <div className="md:col-span-4">
            <h2 className="font-display text-4xl">L'édition</h2>
          </div>
          <div className="flex flex-col gap-4 md:col-span-8">
            <p>
              <strong className="font-medium">Le Seuil</strong> est une soirée inventée pour 2027. Elle ne
              célèbre pas un chiffre officiel. Elle imagine une tournée où le décor peint et le danseur
              échangent leur place, le temps d'un prologue et de sept tableaux.
            </p>
            <p>
              Shen Yun Performing Arts est une compagnie réelle, fondée à New York en 2006, qui présente
              chaque année un nouveau spectacle de danse classique chinoise avec chanteurs et orchestre. Leur
              site parlait, lors de la consultation, d'une célébration de vingt ans. Le Seuil n'est pas cette
              saison, ni une annonce de la compagnie.
            </p>
            <dl className="grid grid-cols-2 gap-4 border border-ink/15 p-4 text-sm md:grid-cols-4">
              <div>
                <dt className="text-ink-soft">Durée fictive</dt>
                <dd className="font-display text-2xl">{SHOW.duration}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Entracte fictif</dt>
                <dd className="font-display text-2xl">{SHOW.entracte}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Actes</dt>
                <dd className="font-display text-2xl">{SHOW.acts}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Tableaux</dt>
                <dd className="font-display text-2xl">{SHOW.tableaux}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="programmation" className="scroll-mt-24 border-t border-ink/15 bg-pine text-paper">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="font-display text-4xl">Sept tableaux fictifs</h2>
          <p className="mt-3 max-w-2xl text-paper/80">
            Aucun de ces titres n'est un numéro du répertoire réel. L'ordre inventé forme la soirée Le Seuil.
          </p>
          <ol className="mt-8 divide-y divide-paper/20">
            {TABLEAUX.map((item) => (
              <li key={item.id} className="grid gap-2 py-5 md:grid-cols-12 md:items-baseline">
                <p className="font-display text-3xl md:col-span-1">{item.seal}</p>
                <div className="md:col-span-4">
                  <p className="text-xs uppercase tracking-widest text-gold">{item.act}</p>
                  <h3 className="font-display text-3xl">{item.title}</h3>
                </div>
                <p className="md:col-span-5">{item.poem}</p>
                <p className="text-sm text-paper/70 md:col-span-2 md:text-right">{item.duration}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="tournee" className="scroll-mt-24 border-t border-ink/15">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="font-display text-4xl">Tournée fictive</h2>
          <p className="mt-3 max-w-2xl">
            Villes réelles, salles inventées, dates inventées. Ne cherchez pas ces lieux : ils n'accueillent
            pas Shen Yun, ni qui que ce soit.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {CITIES.map((item) => (
              <li key={item.id} className="border border-ink/15 p-4">
                <p className="text-xs uppercase tracking-widest text-cinnabar">Fiction</p>
                <h3 className="mt-1 font-display text-3xl">
                  {item.city}
                  <span className="ml-2 font-sans text-base text-ink-soft">{item.region}</span>
                </h3>
                <p className="mt-1">{item.venue}</p>
                <p className="font-medium">{item.dates}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="preparer" className="scroll-mt-24 border-t border-ink/15">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="font-display text-4xl">Préparer la soirée</h2>
            <p className="mt-3">
              La compagnie réelle décrit un spectacle de danse, de chant et d'orchestre, sans que cette page
              prétende connaître le déroulé d'une saison officielle. Ce qui suit mélange un conseil général et
              des règles propres à la fiction.
            </p>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {CHECKS.map((item) => (
                <li key={item.id}>
                  <label className="flex min-h-11 items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 size-4 accent-cinnabar"
                      checked={Boolean(pack[item.id])}
                      onChange={() => setPack((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                    />
                    <span>{item.label}</span>
                  </label>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-soft">Ces cases restent dans la page. Elles ne sont pas enregistrées.</p>
          </div>
          <div className="border border-ink/15 p-5">
            <h3 className="font-display text-3xl">Ce que la soirée fictive n'est pas</h3>
            <ul className="mt-3 flex list-disc flex-col gap-2 pl-5">
              <li>Pas un festival, pas de camping, pas de plusieurs scènes simultanées.</li>
              <li>Pas une vente. Le billet plus bas est une simulation.</li>
              <li>Pas une déclaration de la compagnie, d'un théâtre ou d'un artiste nommé.</li>
              <li>Pas une reproduction de costumes, d'affiches ou de musiques existants.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="acces" className="scroll-mt-24 border-t border-ink/15">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <h2 className="font-display text-4xl">Accès</h2>
          <p className="mt-3 max-w-2xl">
            Les transports cités comme « repères » existent dans ces villes. Ils ne desservent pas les salles
            de cette édition, puisque ces salles n'existent pas.
          </p>
          <ul className="mt-6 flex flex-col gap-4">
            {CITIES.map((item) => (
              <li key={item.id} className="grid gap-1 border-b border-ink/10 pb-4 md:grid-cols-4">
                <p className="font-medium">
                  {item.city} · {item.venue}
                </p>
                <p className="text-sm text-ink-soft md:col-span-3">{item.transit}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="accessibilite" className="scroll-mt-24 border-t border-ink/15">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="font-display text-4xl">Accessibilité du site</h2>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5">
              <li>Navigation au clavier, focus visible, lien d'évitement.</li>
              <li>Le son de la scène est coupé par défaut, avec un volume.</li>
              <li>Une version calme fige le décor. Si l'appareil demande moins de mouvement, elle s'active.</li>
              <li>Les textes des tableaux restent lisibles sans la toile.</li>
              <li>Pas de compte, pas de formulaire de données personnelles.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-4xl">Accessibilité des salles fictives</h2>
            <p className="mt-4">
              Nous n'avons pas inspecté de théâtre réel pour cette édition, et nous n'inventons pas de rampe,
              de boucle magnétique ou de place PMR comme si elles existaient. Dans la fiction, chaque salle
              annoncerait ses accès sur place — cette phrase est le seul engagement honnête possible.
            </p>
            <p className="mt-3">
              Sensible : le quatrième tableau est pensé comme le plus percussif. Le site lui-même ne clignote
              pas.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-ink/15">
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
          <h2 className="font-display text-4xl">Questions</h2>
          <div className="mt-6 flex flex-col gap-3">
            <details className="border border-ink/15 p-4" open>
              <summary className="min-h-11 cursor-pointer font-medium">Est-ce le site de Shen Yun ?</summary>
              <p className="mt-2">
                Non. Concept indépendant et non officiel. L'édition 2027 présentée ici est entièrement fictive.
                Le site officiel est{" "}
                <a className="underline decoration-gold underline-offset-4" href="https://www.shenyun.com" rel="noreferrer noopener" target="_blank">
                  shenyun.com
                </a>
                .
              </p>
            </details>
            <details className="border border-ink/15 p-4">
              <summary className="min-h-11 cursor-pointer font-medium">Y a-t-il un anniversaire officiel en 2027 ?</summary>
              <p className="mt-2">
                Lors de la consultation, le site de la compagnie mettait en avant vingt ans d'existence depuis
                2006. Le Seuil n'utilise pas ce chiffre et ne se présente pas comme leur saison.
              </p>
            </details>
            <details className="border border-ink/15 p-4">
              <summary className="min-h-11 cursor-pointer font-medium">Puis-je réserver vraiment ?</summary>
              <p className="mt-2">
                Non. La simulation fabrique un code dans votre navigateur. Aucun paiement, aucun nom, aucun
                envoi.
              </p>
            </details>
            <details className="border border-ink/15 p-4">
              <summary className="min-h-11 cursor-pointer font-medium">D'où viennent les idéogrammes ?</summary>
              <p className="mt-2">
                Ce sont des caractères courants liés au titre de chaque tableau fictif (encre, manche, pont,
                tambour, palais, neige, seuil), avec leur lecture en pinyin. Ils ne sont pas un slogan de la
                compagnie.
              </p>
            </details>
            <details className="border border-ink/15 p-4">
              <summary className="min-h-11 cursor-pointer font-medium">Le son est-il celui du spectacle ?</summary>
              <p className="mt-2">
                Non. Cinq notes générées sur place, facultatives. Aucun enregistrement, aucun thème existant.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section id="billet" className="scroll-mt-24 border-t border-ink/15 bg-paper-deep">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-cinnabar">Simulation · pas une vente</p>
            <h2 className="mt-2 font-display text-4xl">Billet fictif</h2>
            <p className="mt-3">
              Choisissez une ville inventée, une zone et un nombre de places. Le total est un chiffre
              d'exercice, en euros fictifs, y compris pour Montréal.
            </p>
            <form
              className="mt-6 flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                setTicket(code());
              }}
            >
              <label className="flex flex-col gap-1 text-sm">
                Ville fictive
                <select
                  className="min-h-11 border border-ink/20 bg-paper px-2"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setTicket(null);
                  }}
                >
                  {CITIES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.city} — {item.venue}
                    </option>
                  ))}
                </select>
              </label>
              <fieldset>
                <legend className="text-sm">Zone fictive</legend>
                <div className="mt-2 flex flex-col gap-2">
                  {ZONES.map((item) => (
                    <label key={item.id} className="flex min-h-11 items-center gap-3 border border-ink/15 bg-paper px-3">
                      <input
                        type="radio"
                        name="zone"
                        value={item.id}
                        checked={zone === item.id}
                        onChange={() => {
                          setZone(item.id);
                          setTicket(null);
                        }}
                      />
                      <span>
                        {item.label} — {item.price} € fictifs
                        <span className="block text-ink-soft">{item.note}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="flex flex-col gap-1 text-sm">
                Places (2 maximum)
                <input
                  className="min-h-11 w-24 border border-ink/20 bg-paper px-2"
                  type="number"
                  min={1}
                  max={2}
                  value={qty}
                  onChange={(e) => {
                    setQty(Math.min(2, Math.max(1, Number(e.target.value) || 1)));
                    setTicket(null);
                  }}
                />
              </label>
              <p className="font-display text-4xl">{total} € fictifs</p>
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center bg-ink px-4 text-sm text-paper hover:bg-cinnabar"
              >
                Simuler ce billet
              </button>
            </form>
          </div>
          <div className="relative flex min-h-80 flex-col justify-between border border-ink bg-paper p-6">
            <p className="pointer-events-none absolute top-8 right-6 rotate-12 font-display text-5xl text-cinnabar/40">
              Simulation
            </p>
            {ticket ? (
              <>
                <div>
                  <p className="text-xs uppercase tracking-widest text-cinnabar">Aucune place n'est tenue</p>
                  <h3 className="mt-2 font-display text-4xl">Le Seuil</h3>
                  <p className="mt-4">
                    {selectedCity.city} · {selectedCity.venue}
                  </p>
                  <p>{selectedCity.dates}</p>
                  <p className="mt-2">
                    {qty} × {selectedZone.label} — {total} € fictifs
                  </p>
                  <p className="mt-4 font-medium">{ticket}</p>
                </div>
                <p className="text-sm text-ink-soft">
                  Code fabriqué dans cette page. Rechargez : il ne vaut rien. Pour une saison réelle, quittez
                  cette fiction et ouvrez le site officiel.
                </p>
              </>
            ) : (
              <p className="max-w-sm text-lg">
                Le reçu simulé apparaîtra ici. Il ne confirme rien d'autre que le fonctionnement de la
                démonstration.
              </p>
            )}
            <a
              className="mt-6 inline-flex min-h-11 items-center underline decoration-gold underline-offset-4"
              href="https://www.shenyun.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              Site officiel Shen Yun — autre site, autre objet
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
