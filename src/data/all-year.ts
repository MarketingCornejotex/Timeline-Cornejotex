export interface LicensorGroup {
  licensor: string
  icon: string
  licenses: string[]
}

export const ALL_YEAR: LicensorGroup[] = [
  { licensor: 'Universal', icon: '🎬', licenses: ['Shrek','Casper','Peanuts','E.T.','Fast & Furious','Jaws','Minions','American Pie','Back to the Future','Monsters','Miami Vice','Felix the Cat','King Kong','Woody Woodpecker',"Where's Waldo?",'Jurassic Park','Jurassic World','Gremlins','Nightmare','Exorcist','Godfather','Beetlejuice'] },
  { licensor: 'DreamWorks', icon: '🎥', licenses: ['Dragon','Kung Fu Panda','Trolls',"Gabby's Dollhouse",'Super Wings','Masha'] },
  { licensor: 'WB / Cartoon Network', icon: '🦸', licenses: ['Game of Thrones','House of the Dragon','Justice League','Powerpuff Girls','Teen Titans','Batwheels','Young Justice','Batman','Looney Tunes','Tom & Jerry','Flintstones','Jetsons','Friends','Big Bang Theory','Animaniacs','Pinky the Brain','Scooby-Doo','ThunderCats','Yogi Bear',"Dexter's Laboratory",'CatDog','Cow & Chicken',"Foster's Home",'Courage','Mortal Kombat','Avatar','Conjuring','Annabelle','IT','The Nun','Beetlejuice','Godfather','Freddy vs Jason',"Where's Waldo?",'Chowder'] },
  { licensor: 'Nickelodeon', icon: '🟠', licenses: ['Dora','TMNT','SpongeBob','Rugrats','Hey Arnold!','Angry Beavers','CatDog','Ren & Stimpy','Garfield','Wild Thornberrys','Rocket Power','Saved by the Bell','Legend of Korra','Real Monsters','Jimmy Neutron',"Gabby's Dollhouse",'South Park','Avatar'] },
  { licensor: 'Toei Animation', icon: '🐉', licenses: ['Dragon Ball','Dragon Ball Z','Dragon Ball Super','Dragon Ball Daima','Digimon'] },
  { licensor: 'Mattel', icon: '🎪', licenses: ['Barbie','Hot Wheels','Masters of the Universe'] },
  { licensor: 'Sanrio', icon: '🎀', licenses: ['Hello Kitty','Cinnamoroll','Kuromi','My Melody','Badtz-Maru','Chococat','Pompompurin','Keroppi','Pochacco','Little Twin Stars'] },
  { licensor: 'Smiley / Dick Bruna', icon: '😊', licenses: ['Smiley World','Miffy','Pusheen'] },
  { licensor: 'Peanuts', icon: '🥜', licenses: ['Peanuts'] },
  { licensor: 'Pitufos', icon: '🔵', licenses: ['Pitufos'] },
  { licensor: 'Chespirito', icon: '🇲🇽', licenses: ['Chespirito','El Chavo'] },
  { licensor: 'SEGA', icon: '🎮', licenses: ['Sonic'] },
  { licensor: 'BBC / Ludo Studio', icon: '🐕', licenses: ['Bluey'] },
  { licensor: 'Harvard', icon: '🎓', licenses: ['Harvard'] },
  { licensor: 'Mafalda', icon: '📰', licenses: ['Mafalda'] },
  { licensor: 'Warner Music Group', icon: '🎵', licenses: ['Ed Sheeran','MTV','Deep Purple','Frank Sinatra','Gorillaz','Twenty One Pilots','Green Day'] },
  { licensor: 'King Features', icon: '👑', licenses: ['Popeye','Olive Oyl','Flash Gordon','Phantom'] },
  { licensor: 'Alpha Group', icon: '✈️', licenses: ['Super Wings'] },
  { licensor: 'DC / WB', icon: '🦸', licenses: ['Superman','Supergirl','Batman','Wonder Woman','Justice League','Teen Titans','Aquaman','Flash','Cyborg','Batwheels','Young Justice','League of Superpets','Black Adam'] },
]
