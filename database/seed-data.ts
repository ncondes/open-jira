interface SeedData {
   entries: SeedEntry[];
}

interface SeedEntry {
   description: string;
   status: string;
   createdAt: number;
}

export const seedData: SeedData = {
   entries: [
      {
         description: "TO-DO: Ullamco adipisicing Lorem est anim ut commodo ad ea magna aute.",
         status: "to-do",
         createdAt: Date.now(),
      },
      {
         description: "IN-PROGRESS: Proident laboris ad officia culpa aliqua nisi culpa aliquip sunt ea cillum.",
         status: "in-progress",
         createdAt: Date.now() - 1000000,
      },
      {
         description: "COMPLETED: Labore officia sit commodo deserunt irure dolor ullamco fugiat.",
         status: "completed",
         createdAt: Date.now() - 100000,
      },
   ]
};