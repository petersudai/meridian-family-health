// Curated Unsplash imagery, verified live during research.
// Helper builds a right-sized, compressed URL for any usage.
export function img(id: string, w = 1600, q = 80): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const IMAGES = {
  heroPortrait: "1550831107-1553da8c8464",
  heroConsultAlt: "1576765974257-b414b9ea0051",
  clinicInterior: "1777269749032-d8d458ae594d",
  clinicInteriorAlt: "1762625570087-6d98fca29531",
  waitingRoom: "1732376800645-c066f9e283e8",
  reception: "1764727291644-5dcb0b1a0375",
  teamMeeting: "1579684385127-1ef15d508118",
  familyOutdoors: "1601758064955-a4a16da74a86",
  familyOutdoorsAlt: "1685580388390-576100ae9ce3",
  pediatricVisit: "1632053002928-1919605ee6f7",
  pediatricVisitAlt: "1708687045030-26702e62fc65",

  doctorFemale1: "1559839734-2b71ea197ec2",
  doctorMale1: "1612349317150-e413f6a5b16d",
  doctorFemale2: "1623854767648-e7bb8009f0db",
  doctorMale2: "1622253694238-3b22139576c6",
  nurse1: "1484863137850-59afcfe05386",

  patientAvatar1: "1580489944761-15a19d654956",
  patientAvatar2: "1625241152315-4a698f74ceb7",
  patientAvatar3: "1662850886700-4ec19bd30d11",
  patientAvatar4: "1611695434369-a8f5d76ceb7b",
  patientAvatar5: "1564564244660-5d73c057f2d2",
  patientAvatar6: "1607378119679-1b10e82b3704",

  telehealth: "1652876343973-bef0c8c1b014",
};
