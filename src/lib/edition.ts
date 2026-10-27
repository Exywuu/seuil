export type Tableau = {
  id: number;
  seal: string;
  sealReading: string;
  title: string;
  poem: string;
  see: string;
  duration: string;
  act: "Acte I" | "Acte II";
  sound: string;
  sleeve: number;
  lean: number;
  lift: number;
  bow: number;
  moon: boolean;
  river: boolean;
  snow: boolean;
  lanterns: number;
  earth: number;
  ridge: number;
};

export const TABLEAUX: Tableau[] = [
  {
    id: 1,
    seal: "墨",
    sealReading: "mò · encre",
    title: "Encre première",
    poem: "Avant le geste, le papier décide.",
    see: "Une seule crête d'encre, presque immobile. Le corps est encore un trait, manches courtes, tête légèrement inclinée.",
    duration: "6 min",
    act: "Acte I",
    sound: "Flûte seule, cinq notes, sans thème répété.",
    sleeve: 0.12,
    lean: 0.04,
    lift: 0.02,
    bow: 0.18,
    moon: false,
    river: false,
    snow: false,
    lanterns: 0,
    earth: 0.05,
    ridge: 0.35,
  },
  {
    id: 2,
    seal: "袖",
    sealReading: "xiù · manche",
    title: "Manches d'eau",
    poem: "La manche part plus loin que le bras.",
    see: "Un fleuve horizontal coupe les collines. Les manches d'eau s'allongent jusqu'à franchir la frontière entre scène et peinture.",
    duration: "8 min",
    act: "Acte I",
    sound: "Cordes pincées, motif en aller-retour.",
    sleeve: 1,
    lean: 0.28,
    lift: 0.12,
    bow: 0.02,
    moon: false,
    river: true,
    snow: false,
    lanterns: 0,
    earth: 0.08,
    ridge: 0.55,
  },
  {
    id: 3,
    seal: "桥",
    sealReading: "qiáo · pont",
    title: "Pont de brume",
    poem: "Le pont n'existe que pendant le pas.",
    see: "Deux massifs séparés par un vide blanc. Le danseur se tient sur une jambe, comme si le pas posait la planche.",
    duration: "7 min",
    act: "Acte I",
    sound: "Nappe tenue, presque sans attaque.",
    sleeve: 0.42,
    lean: 0,
    lift: 0.72,
    bow: 0.04,
    moon: false,
    river: false,
    snow: false,
    lanterns: 0,
    earth: 0.02,
    ridge: 0.85,
  },
  {
    id: 4,
    seal: "鼓",
    sealReading: "gǔ · tambour",
    title: "Tambour de terre",
    poem: "Le sol répond avant la salle.",
    see: "Le bas du décor rougit. Le buste se baisse, le genou se plie : un coup, pas une marche.",
    duration: "5 min",
    act: "Acte I",
    sound: "Percussion sèche. Le passage le plus fort de la soirée fictive.",
    sleeve: 0.22,
    lean: -0.18,
    lift: 0.08,
    bow: 0.48,
    moon: false,
    river: false,
    snow: false,
    lanterns: 0,
    earth: 0.72,
    ridge: 0.4,
  },
  {
    id: 5,
    seal: "宫",
    sealReading: "gōng · palais",
    title: "Cour d'or",
    poem: "Les lanternes comptent les silences.",
    see: "La nuit de cour est suggérée par quelques points d'or, pas par un décor de palais copié. Le geste reste retenu.",
    duration: "9 min",
    act: "Acte II",
    sound: "Orchestre élargi, cuivres très en retrait, une voix soliste sans paroles inventées ici.",
    sleeve: 0.55,
    lean: 0.1,
    lift: 0,
    bow: 0.2,
    moon: true,
    river: false,
    snow: false,
    lanterns: 7,
    earth: 0.12,
    ridge: 0.5,
  },
  {
    id: 6,
    seal: "雪",
    sealReading: "xuě · neige",
    title: "Neige qui écoute",
    poem: "Rien ne tombe. Tout entend.",
    see: "Le papier reprend presque toute la place. Quelques points clairs. Le danseur s'immobilise, tête basse.",
    duration: "7 min",
    act: "Acte II",
    sound: "Silence noté, puis une seule note.",
    sleeve: 0.18,
    lean: 0,
    lift: 0,
    bow: 0.32,
    moon: true,
    river: false,
    snow: true,
    lanterns: 0,
    earth: 0,
    ridge: 0.22,
  },
  {
    id: 7,
    seal: "阈",
    sealReading: "yù · seuil",
    title: "Retour au seuil",
    poem: "Ce qui franchit ne revient pas identique.",
    see: "La ligne rouge est le sujet. Corps et peinture occupent la même verticale. Fin de l'édition fictive.",
    duration: "8 min",
    act: "Acte II",
    sound: "Reprise des cinq notes du premier tableau, dans l'ordre inverse.",
    sleeve: 0.74,
    lean: 0.06,
    lift: 0.16,
    bow: 0,
    moon: true,
    river: true,
    snow: false,
    lanterns: 3,
    earth: 0.15,
    ridge: 0.66,
  },
];

export type City = {
  id: string;
  city: string;
  region: string;
  venue: string;
  dates: string;
  transit: string;
};

export const CITIES: City[] = [
  {
    id: "lyon",
    city: "Lyon",
    region: "France",
    venue: "Nef des Berges",
    dates: "6 et 7 mars 2027",
    transit:
      "Repère urbain réel : gare Part-Dieu et métro lyonnais existent. La Nef des Berges, elle, n'existe pas — aucun itinéraire ne peut y mener.",
  },
  {
    id: "lille",
    city: "Lille",
    region: "France",
    venue: "Halle du Fil",
    dates: "13 et 14 mars 2027",
    transit:
      "Repère urbain réel : gare Lille-Flandres et métro. La Halle du Fil est un nom inventé pour cette fiction.",
  },
  {
    id: "paris",
    city: "Paris",
    region: "France",
    venue: "Pavillon du Seuil",
    dates: "21 au 24 mars 2027",
    transit:
      "Repère urbain réel : réseau RER et métro. Le Pavillon du Seuil n'est pas une salle réelle et n'a pas d'adresse.",
  },
  {
    id: "strasbourg",
    city: "Strasbourg",
    region: "France",
    venue: "Dock des Lanternes",
    dates: "2 et 3 avril 2027",
    transit:
      "Repère urbain réel : tram de Strasbourg, gare centrale. Le Dock des Lanternes est fictif.",
  },
  {
    id: "toulouse",
    city: "Toulouse",
    region: "France",
    venue: "Cour des Platanes",
    dates: "10 et 11 avril 2027",
    transit:
      "Repère urbain réel : métro toulousain, gare Matabiau. La Cour des Platanes est fictive.",
  },
  {
    id: "montreal",
    city: "Montréal",
    region: "Canada",
    venue: "Bassin des Soieries",
    dates: "24 au 27 avril 2027",
    transit:
      "Repère urbain réel : métro de Montréal. Le Bassin des Soieries est un lieu inventé. Les prix affichés restent en euros fictifs, sans change.",
  },
];

export const ZONES = [
  {
    id: "orchestre",
    label: "Orchestre",
    price: 86,
    note: "Au plus près de la ligne. Placement fictif, sans plan réel.",
  },
  {
    id: "corbeille",
    label: "Corbeille",
    price: 64,
    note: "Hauteur moyenne. Placement fictif.",
  },
  {
    id: "balcon",
    label: "Second balcon",
    price: 42,
    note: "Plus loin, même spectacle. Placement fictif.",
  },
] as const;

export type Fil = "encre" | "cinabre" | "or";
export type Piece = "col" | "manches" | "ceinture" | "coiffe";

export const PIECES: { id: Piece; label: string; hint: string }[] = [
  { id: "coiffe", label: "Coiffe", hint: "Ce qui tient la tête dans l'axe." },
  { id: "col", label: "Col", hint: "Le premier cadre du visage." },
  { id: "manches", label: "Manches", hint: "La longueur du geste, pas du bras." },
  { id: "ceinture", label: "Ceinture", hint: "Là où le tempo se noue." },
];

export const FILS: { id: Fil; label: string }[] = [
  { id: "encre", label: "Encre" },
  { id: "cinabre", label: "Cinabre" },
  { id: "or", label: "Or" },
];

const READING: Record<Fil, string[]> = {
  encre: [
    "L'encre demande un départ presque immobile.",
    "Les manches restent proches du corps : le fleuve est suggéré, pas montré.",
    "Le pont se tient mieux quand rien ne brille.",
    "Le tambour se fait sec, sans éclat.",
    "La cour refuse l'or visible — seulement l'ombre des lanternes.",
    "La neige est déjà dans le tissu.",
    "Le retour se fait par effacement.",
  ],
  cinabre: [
    "Le cinabre réchauffe un tableau qui devait rester blanc.",
    "La manche rouge avance avant le danseur.",
    "Le pont prend une planche de laque.",
    "C'est la coupe du tambour : le sol et le costume parlent ensemble.",
    "La cour accepte une seule ligne rouge, pas davantage.",
    "La neige garde une couture vive, pour ne pas disparaître.",
    "Le seuil se marque, il ne se franchit pas en silence.",
  ],
  or: [
    "L'or est trop tôt pour le premier trait. On le réserve au bord.",
    "La manche devient fil, pas eau.",
    "Le pont accroche une lumière qui n'appartient pas à la brume.",
    "Le tambour prend un cercle métallique — plus rite que coup.",
    "C'est la coupe juste de la cour : l'or reste un point, pas une armure.",
    "La neige et l'or ne s'accordent que si le geste reste lent.",
    "Le dernier tableau peut porter l'or, à condition que la ligne rouge demeure.",
  ],
};

export function readAtelier(choice: Record<Piece, Fil>, bpm: number) {
  const weights: Record<Fil, number> = { encre: 0, cinabre: 1, or: 2 };
  const order: Piece[] = ["col", "manches", "ceinture", "coiffe"];
  let score = 0;
  order.forEach((piece, i) => {
    score += weights[choice[piece]] * (i + 1);
  });
  const tempo = bpm < 72 ? 0 : bpm < 108 ? 2 : 4;
  const index = (score + tempo) % TABLEAUX.length;
  const tableau = TABLEAUX[index];
  const sentence = READING[choice.manches][index];
  return { tableau, sentence };
}

export const SHOW = {
  title: "Le Seuil",
  year: 2027,
  duration: "2 h 10",
  entracte: "20 min",
  acts: 2,
  tableaux: TABLEAUX.length,
};
