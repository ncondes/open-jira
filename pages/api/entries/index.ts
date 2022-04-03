import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data = 
   | { message: string }
   | IEntry[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   switch (req.method) {
      case "GET":
         return getEntries(res);
      case "POST":
         return createEntry(req, res);

      default:
         return res.status(400).json({ message: "Endpoint does not exist" });
   }
}

const getEntries = async (res: NextApiResponse<Data>) => {
   try {
      await db.connect();
      const entries = await Entry.find().sort({ createdAt: "ascending" });
      await db.disconnect();

      res.status(200).json(entries);
   } catch (err) {
      await db.disconnect();
      console.error(err);

      res.status(500).json({ message: "Something went wrong at getting entries, review server console" });
   }
};

const createEntry = async(req: NextApiRequest, res: NextApiResponse) => {
   const { description = "" } = req.body;

   const newEntry = new Entry({
      description,
      createdAt: Date.now(),
   });

   try {
      await db.connect();
      await newEntry.save();
      await db.disconnect();

      res.status(201).json(newEntry);
   } catch (err) {
      await db.disconnect();
      console.error(err);

      res.status(500).json({ message: "Something went wrong at creating new entry, review server console" });
   }
};

