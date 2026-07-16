import { A, N, B, H, M, type SegmentKey, type LicenseType } from './segments'

export interface LicenseDef {
  name: string
  type: LicenseType
  segs: SegmentKey[]
  licensor: string
}

export interface MonthDef {
  id: string
  name: string
  dates: string[]
  licenses: LicenseDef[]
}

export interface QuarterDef {
  label: string
  months: MonthDef[]
}

export const QUARTERS: Record<string, QuarterDef> = {
  Q1: {
    label: 'Q1 · 2026',
    months: [
      {
        id: 'ENE', name: 'Enero',
        dates: ['Summer Vibes 🌞'],
        licenses: [
          { name: 'Yogi Bear',          type: 'ann', segs: [A,N,M],       licensor: 'Warner Bros' },
          { name: 'Flash Gordon',        type: 'ann', segs: [A,H,M],       licensor: 'King Features' },
          { name: "Gabby's Dollhouse",   type: 'ann', segs: [N,B],         licensor: 'Nickelodeon' },
          { name: 'Bi Bil n Billy',      type: 'ann', segs: [A,N],         licensor: 'Warner Bros' },
          { name: 'ThunderCats',         type: 'ann', segs: [A,N,M],       licensor: 'Warner Bros' },
          { name: 'Chespirito',          type: 'new', segs: [A,N,H,M],     licensor: 'Chespirito' },
          { name: 'Sonic',              type: 'new', segs: [A,N,H,M],     licensor: 'SEGA' },
        ]
      },
      {
        id: 'FEB', name: 'Febrero',
        dates: ["Valentine's Day 💝"],
        licenses: [
          { name: 'Courage',            type: 'ann', segs: [A,N,M],       licensor: 'Warner Bros' },
          { name: 'Legend of Korra',    type: 'ann', segs: [A,N],         licensor: 'Nickelodeon' },
          { name: 'Smiley World',       type: 'ann', segs: [A,N,B,H],     licensor: 'Smiley World' },
          { name: 'Phantom',            type: 'ann', segs: [A,M],         licensor: 'King Features' },
        ]
      },
      {
        id: 'MAR', name: 'Marzo',
        dates: ["Happy Women's Day 👩"],
        licenses: [
          { name: 'Dragon',             type: 'ann', segs: [A,N,H],       licensor: 'DreamWorks' },
          { name: 'Barbie',             type: 'new', segs: [A,N,B,H],     licensor: 'Mattel' },
          { name: 'Hot Wheels',         type: 'new', segs: [A,N,H],       licensor: 'Mattel' },
        ]
      }
    ]
  },
  Q2: {
    label: 'Q2 · 2026',
    months: [
      {
        id: 'ABR', name: 'Abril',
        dates: ['Pascua 🐣', 'Spring 🌸'],
        licenses: [
          { name: 'Dragon Ball',           type: 'ann', segs: [A,N,H,M], licensor: 'Toei Animations' },
          { name: 'Game of Thrones',       type: 'ann', segs: [A,H,M],   licensor: 'Warner Bros' },
          { name: 'Angry Beavers',         type: 'ann', segs: [A,N,M],   licensor: 'Nickelodeon' },
          { name: 'CatDog',               type: 'ann', segs: [A,N,M],   licensor: 'Nickelodeon' },
          { name: "Dexter's Laboratory",   type: 'ann', segs: [A,N],     licensor: 'Warner Bros' },
        ]
      },
      {
        id: 'MAY', name: 'Mayo',
        dates: ['Día de la Madre 🌷', 'Back to School 📚'],
        licenses: [
          { name: 'Casper',     type: 'ann', segs: [A,N,H,M], licensor: 'Universal Studios' },
          { name: 'Pusheen',    type: 'ann', segs: [A,N,H,M], licensor: 'Pusheen Corp' },
          { name: 'TMNT',       type: 'ann', segs: [A,N,H,M], licensor: 'Nickelodeon' },
          { name: 'Ed Sheeran', type: 'ev',  segs: [A],        licensor: 'Warner Music Group' },
        ]
      },
      {
        id: 'JUN', name: 'Junio',
        dates: ['Día del Padre 👔', 'Día del Niño 🧒', 'FIFA 2026 ⚽', 'Spring 🌿'],
        licenses: [
          { name: 'E.T.',                    type: 'ann', segs: [A,N,H,M], licensor: 'Universal Studios' },
          { name: 'Fast & Furious',          type: 'ann', segs: [A,H,M],   licensor: 'Universal Studios' },
          { name: 'Jaws',                    type: 'ann', segs: [A,H,M],   licensor: 'Universal Studios' },
          { name: 'Jurassic World',          type: 'ann', segs: [A,N,H,M], licensor: 'Universal Studios' },
          { name: 'Jurassic Park',           type: 'ann', segs: [A,N,H,M], licensor: 'Universal Studios' },
          { name: 'Garfield',               type: 'ann', segs: [A,N,H,M], licensor: 'Nickelodeon' },
          { name: 'Wild Thornberrys',        type: 'ann', segs: [A,N,M],   licensor: 'Nickelodeon' },
          { name: 'Kung Fu Panda',           type: 'ann', segs: [A,N,H,M], licensor: 'DreamWorks' },
          { name: "Where's Waldo?",          type: 'ann', segs: [A,N,H,M], licensor: 'Warner Bros' },
          { name: 'Miffy',                   type: 'ann', segs: [A,N,B,H], licensor: 'Dick Bruna' },
          { name: 'Supergirl',              type: 'ev',  segs: [A,N,H,M], licensor: 'DC/WB' },
          { name: 'Masters of the Universe', type: 'ev', segs: [A,N],     licensor: 'Mattel' },
          { name: 'Gremlins',               type: 'ann', segs: [A,H,M],   licensor: 'Warner Bros' },
        ]
      }
    ]
  },
  Q3: {
    label: 'Q3 · 2026',
    months: [
      {
        id: 'JUL', name: 'Julio',
        dates: ['Summer ☀️', 'FIFA 2026 ⚽'],
        licenses: [
          { name: 'Cow & Chicken',       type: 'ann', segs: [A,N,M],   licensor: 'Warner Bros' },
          { name: 'Dragon Ball Super',   type: 'ann', segs: [A,N,H,M], licensor: 'Toei Animations' },
          { name: 'American Pie',        type: 'ann', segs: [A],        licensor: 'Universal Studios' },
          { name: 'League of Superpets', type: 'ann', segs: [A,N,M],   licensor: 'Warner Bros' },
          { name: 'Back to the Future',  type: 'ann', segs: [A,H,M],   licensor: 'Universal Studios' },
          { name: 'Teen Titans',         type: 'ann', segs: [A,N,M],   licensor: 'DC/WB' },
          { name: 'Super Wings',         type: 'new', segs: [N,B],     licensor: 'Alpha Group' },
          { name: 'Minions 3',           type: 'ev',  segs: [A,N,B,H], licensor: 'Universal Studios' },
        ]
      },
      {
        id: 'AGO', name: 'Agosto',
        dates: ['Summer ☀️', 'Back to School 📚'],
        licenses: [
          { name: "Foster's Home",      type: 'ann', segs: [A,N,M],   licensor: 'Warner Bros' },
          { name: 'Ren & Stimpy',       type: 'ann', segs: [A,N,M],   licensor: 'Nickelodeon' },
          { name: 'MTV',                type: 'ann', segs: [A],        licensor: 'Warner Music Group' },
          { name: 'Dora',               type: 'ann', segs: [N,B,H,M], licensor: 'Nickelodeon' },
          { name: 'Big Mama',           type: 'ann', segs: [A,N,M],   licensor: 'Warner Bros' },
          { name: 'Saved by the Bell',  type: 'ann', segs: [A],        licensor: 'Nickelodeon' },
          { name: 'South Park',         type: 'ann', segs: [A,H,M],   licensor: 'Viacom' },
          { name: 'Rocket Power',       type: 'ann', segs: [A,N,M],   licensor: 'Nickelodeon' },
          { name: 'House of the Dragon',type: 'ann', segs: [A,H,M],   licensor: 'Warner Bros' },
          { name: 'Rugrats',            type: 'ann', segs: [A,N,M],   licensor: 'Nickelodeon' },
        ]
      },
      {
        id: 'SEP', name: 'Septiembre',
        dates: ['Autumn 🍂', 'Back to School 📚'],
        licenses: [
          { name: 'Flintstones',    type: 'ann', segs: [A,N,H,M], licensor: 'Warner Bros' },
          { name: 'Jetsons',        type: 'ann', segs: [A,N,H,M], licensor: 'Warner Bros' },
          { name: 'Miami Vice',     type: 'ann', segs: [A],        licensor: 'Universal Studios' },
          { name: 'Big Bang Theory',type: 'ann', segs: [A,H,M],   licensor: 'Warner Bros' },
          { name: 'Friends',        type: 'ann', segs: [A,B,H,M], licensor: 'Warner Bros' },
          { name: 'Animaniacs',     type: 'ann', segs: [A,N,M],   licensor: 'Warner Bros' },
          { name: 'Mafalda',        type: 'ann', segs: [A,N],     licensor: 'Mafalda' },
          { name: 'Batwheels',      type: 'ann', segs: [N,B,H,M], licensor: 'DC/WB' },
          { name: 'Pinky the Brain',type: 'ann', segs: [A,N,M],   licensor: 'Warner Bros' },
        ]
      }
    ]
  },
  Q4: {
    label: 'Q4 · 2026',
    months: [
      {
        id: 'OCT', name: 'Octubre',
        dates: ['Halloween 🎃', 'Autumn 🍂'],
        licenses: [
          { name: 'Bluey',              type: 'ann', segs: [N,B,H,M],   licensor: 'BBC' },
          { name: 'Pitufos',            type: 'ann', segs: [A,N,B,H,M], licensor: 'Pitufos' },
          { name: 'Dragon Ball',        type: 'ann', segs: [A,N,H,M],   licensor: 'Toei Animations' },
          { name: 'Real Monsters',      type: 'ann', segs: [A,N,M],     licensor: 'Nickelodeon' },
          { name: 'Mortal Kombat',      type: 'ann', segs: [A,H,M],     licensor: 'Warner Bros' },
          { name: 'Emily in Paris',     type: 'ann', segs: [A,H,M],     licensor: 'Universal Studios' },
          { name: 'Peanuts',            type: 'ann', segs: [A,N,B,H],   licensor: 'Peanuts' },
          { name: 'Conjuring',          type: 'opp', segs: [A,M],       licensor: 'Warner Bros' },
          { name: 'Freddy vs Jason',    type: 'opp', segs: [A,M],       licensor: 'Warner Bros' },
          { name: 'Annabelle',          type: 'opp', segs: [A,M],       licensor: 'Warner Bros' },
          { name: 'Nightmare',          type: 'opp', segs: [A,M],       licensor: 'Universal Studios' },
          { name: 'IT',                 type: 'opp', segs: [A,M],       licensor: 'Warner Bros' },
          { name: 'Monsters',           type: 'opp', segs: [A,M],       licensor: 'Universal Studios' },
          { name: 'Exorcist',           type: 'opp', segs: [A,M],       licensor: 'Universal Studios' },
          { name: 'Beetlejuice',        type: 'opp', segs: [A,M],       licensor: 'Warner Bros' },
          { name: 'Godfather',          type: 'opp', segs: [A,M],       licensor: 'Universal Studios' },
          { name: 'The Nun',            type: 'opp', segs: [A,M],       licensor: 'Warner Bros' },
          { name: 'Avatar',             type: 'ann', segs: [A,N,H,M],   licensor: 'Nickelodeon' },
        ]
      },
      {
        id: 'NOV', name: 'Noviembre',
        dates: ['Winter ❄️'],
        licenses: [
          { name: 'Chowder',           type: 'ann', segs: [A,N,M],   licensor: 'Warner Bros' },
          { name: 'Felix the Cat',     type: 'ann', segs: [A,N,M],   licensor: 'King Features' },
          { name: 'Justice League',    type: 'ann', segs: [A,N,H,M], licensor: 'DC/WB' },
          { name: 'Powerpuff Girls',   type: 'ann', segs: [A,N,B,M], licensor: 'Warner Bros' },
          { name: 'Woody Woodpecker',  type: 'ann', segs: [A,N,H,M], licensor: 'Universal Studios' },
          { name: 'Trolls',            type: 'ann', segs: [A,N,B,H], licensor: 'DreamWorks' },
          { name: 'Young Justice',     type: 'ann', segs: [A,N,M],   licensor: 'DC/WB' },
        ]
      },
      {
        id: 'DIC', name: 'Diciembre',
        dates: ['Navidad 🎄'],
        licenses: [
          { name: 'Jimmy Neutron', type: 'ann', segs: [A,N,M], licensor: 'Nickelodeon' },
        ]
      }
    ]
  }
}

export const QUARTERS_ORDER = ['Q1', 'Q2', 'Q3', 'Q4'] as const
export type QuarterKey = typeof QUARTERS_ORDER[number]
