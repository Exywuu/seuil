import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/chrome";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [{ title: "Sources et choix — Le Seuil 2027" }],
  }),
  component: SourcesPage,
});

function SourcesPage() {
  return (
    <Shell>
      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        <p className="text-xs uppercase tracking-widest text-gold">Transparence</p>
        <h1 className="mt-2 font-display text-5xl leading-none">Pourquoi Shen Yun, et qu'est-ce qui est vrai</h1>
        <p className="mt-4">
          Concept indépendant et non officiel. Édition anniversaire 2027 entièrement fictive. Cette page sépare
          ce qui a été lu, ce qui est déduit, et ce qui n'a pas été vu.
        </p>

        <h2 className="mt-10 font-display text-3xl">Comparaison brève</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink">
                <th className="py-2 pr-3 font-medium">Organisation</th>
                <th className="py-2 pr-3 font-medium">Ce qui a été lu</th>
                <th className="py-2 font-medium">Pourquoi pas elle</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink/15 align-top">
                <th className="py-3 pr-3 font-medium">Shen Yun</th>
                <td className="py-3 pr-3">
                  Compagnie de danse classique chinoise, New York, fondée en 2006. Danse, chant, orchestre,
                  tournée annuelle. Le site célébrait vingt ans.
                </td>
                <td className="py-3">Retenue. L'édition Le Seuil est une fiction à côté de cette histoire réelle.</td>
              </tr>
              <tr className="border-b border-ink/15 align-top">
                <th className="py-3 pr-3 font-medium">Hellfest</th>
                <td className="py-3 pr-3">
                  Festival metal à Clisson depuis 2006. Le site annonçait un vrai Hellfest 2027, « XXth
                  Anniversary », du 17 au 20 juin 2027.
                </td>
                <td className="py-3">
                  Une fiction d'anniversaire collerait à une édition officielle déjà publique. Le terrain
                  scénique est un festival, pas le geste d'un seul corps.
                </td>
              </tr>
              <tr className="border-b border-ink/15 align-top">
                <th className="py-3 pr-3 font-medium">Cirque du Soleil</th>
                <td className="py-3 pr-3">
                  Un communiqué annonçait Finding Utopia, création chapiteau, première à Montréal le 22 avril
                  2027. D'autres spectacles (OVO, Alegría…) étaient listés.
                </td>
                <td className="py-3">
                  2027 est déjà occupé par une création réelle. L'univers est immense, mais moins une
                  découverte qu'une reprise d'un langage très connu.
                </td>
              </tr>
              <tr className="border-b border-ink/15 align-top">
                <th className="py-3 pr-3 font-medium">Country Jam</th>
                <td className="py-3 pr-3">
                  Festival country à Grand Junction, Colorado. La page d'accueil insistait sur les pass, le
                  placement et l'activation de bracelets.
                </td>
                <td className="py-3">
                  Le besoin visible est transactionnel. Moins de matière pour une expérience qui ne soit pas un
                  catalogue de billets.
                </td>
              </tr>
              <tr className="align-top">
                <th className="py-3 pr-3 font-medium">Lollapalooza Stockholm</th>
                <td className="py-3 pr-3">
                  La page d'accueil n'a pas renvoyé de contenu exploitable. Ticketmaster ne listait pas de date
                  à venir au moment de la recherche.
                </td>
                <td className="py-3">Trop peu vu pour bâtir sans inventer des faits.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 font-display text-3xl">Le choix</h2>
        <p className="mt-3">
          Shen Yun n'est pas un festival : c'est une compagnie itinérante, un soir, une scène, un orchestre.
          Le public qui arrive par la publicité a souvent besoin de comprendre la soirée avant de la réserver.
          Les sites consultés orientent vers les billets et le récit de la compagnie. Ils ne font pas
          manipuler la frontière entre danseur et paysage — alors que cette frontière est, dans la
          réputation publique du spectacle, son image la plus singulière.
        </p>
        <p className="mt-3">
          Cette dernière phrase est une interprétation : les extraits lus ce jour-là décrivent la danse, les
          chanteurs et l'orchestre, pas explicitement les toiles numériques. Le site part de cette
          interprétation et la nomme comme telle. Il ne copie ni logo, ni affiche, ni costume photographié.
        </p>

        <h2 className="mt-10 font-display text-3xl">Vérifié dans les pages ouvertes</h2>
        <ul className="mt-3 flex list-disc flex-col gap-2 pl-5">
          <li>
            Shen Yun Performing Arts, basée à New York, créée en 2006 par des artistes chinois. Première
            représentation le 19 décembre 2006 au Beacon Theater (Holiday Wonders). Première tournée mondiale
            en 2007. Organisation à but non lucratif. Source : pages shenyunperformingarts.org consultées
            (histoire, vingtième anniversaire, factsheet).
          </li>
          <li>
            La compagnie se présente comme un spectacle de danse classique chinoise, avec chanteurs et
            orchestre, une production nouvelle chaque année, et un projet de « revival » de la culture
            chinoise d'avant le communisme. Elle relie explicitement son origine à la pratique du Falun Gong.
            Elle indique ne pas pouvoir se produire en Chine.
          </li>
          <li>
            Chiffres donnés par leur factsheet (non audités ici) : plusieurs compagnies, une tournée
            internationale large, un public se comptant en millions. Attribués à la compagnie, pas repris
            comme des mesures indépendantes.
          </li>
          <li>
            Hellfest : 17–20 juin 2027, Clisson, « XXth Anniversary », pass 4 jours annoncé à 389 € puis
            marqué sold out sur la page lue, revente officielle sur tickets.hellfest.fr. Communauté nommée
            Hellbangers. Scènes citées sur la page Experience : Mainstages, Warzone, Valley, Altar, et d'autres
            non toutes extraites.
          </li>
          <li>
            Cirque du Soleil : communiqué Finding Utopia, Michel Laprise, Old Port de Montréal à partir du 22
            avril 2027, Gatineau à partir du 5 septembre 2027.
          </li>
        </ul>

        <h2 className="mt-10 font-display text-3xl">Interprétations</h2>
        <ul className="mt-3 flex list-disc flex-col gap-2 pl-5">
          <li>Le public novice a besoin d'une porte d'entrée sensible, pas seulement d'une ville et d'un prix.</li>
          <li>
            Le rapport entre corps et décor peint est le meilleur matériau interactif de cet univers, même si
            les extraits du jour ne le détaillaient pas.
          </li>
          <li>
            Un accès calme, lisible, sans parcours forcé, manque souvent aux sites de spectacle très
            promotionnels. C'est le rôle du foyer.
          </li>
        </ul>

        <h2 className="mt-10 font-display text-3xl">Non consulté</h2>
        <ul className="mt-3 flex list-disc flex-col gap-2 pl-5">
          <li>Pas d'inspection visuelle desktop ou mobile des cinq sites officiels dans un navigateur.</li>
          <li>shenyun.com et lollastockholm.com n'ont pas renvoyé de contenu utilisable via l'outil de lecture.</li>
          <li>Aucun parcours d'achat réel, aucune vidéo, aucun visuel protégé ouvert pour être copié.</li>
          <li>Pas de vérification de la saison Shen Yun effectivement annoncée pour 2027 au-delà des pages d'histoire.</li>
        </ul>

        <h2 className="mt-10 font-display text-3xl">Ce qui est fictif dans le prototype</h2>
        <p className="mt-3">
          Le nom Le Seuil, les sept tableaux, les poèmes, les durées, les six salles, les dates de mars et
          avril 2027, les prix, les zones, les règles de maison, les lectures d'atelier, le son généré. Les
          villes, elles, existent. Les transports mentionnés comme repères aussi. Les salles, non.
        </p>

        <p className="mt-8 text-sm text-ink-soft">
          Liens officiels, hors fiction :{" "}
          <a className="text-ink underline decoration-gold underline-offset-4" href="https://www.shenyun.com" rel="noreferrer noopener" target="_blank">
            shenyun.com
          </a>
          {" · "}
          <a className="text-ink underline decoration-gold underline-offset-4" href="https://www.shenyunperformingarts.org/" rel="noreferrer noopener" target="_blank">
            shenyunperformingarts.org
          </a>
        </p>
      </article>
    </Shell>
  );
}
