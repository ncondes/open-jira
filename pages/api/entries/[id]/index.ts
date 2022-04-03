import type { NextApiRequest, NextApiResponse } from "next";
// import mongoose from "mongoose";
import { Entry, IEntry } from "../../../../models";
import { db } from "../../../../database";

type Data =
   | { message: string }
   | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   // Commented due to validation on middleware.ts

   // const { id } = req.query;

   // if (!mongoose.isValidObjectId(id)) {
   //    return res.status(400).json({ message: "Invalid id" });
   // }

   switch (req.method) {
      case "PUT":
         return updateEntry(req, res);
      case "GET":
         return getEntry(req, res);
      case "DELETE":
         return deleteEntry(req, res);

      default:
         return res.status(400).json({ message: "Endpoint does not exist" });
   }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
   const { id } = req.query;

   try {
      await db.connect();
      const entryToBeUpdated = await Entry.findById(id);

      if (!entryToBeUpdated) {
         await db.disconnect();
         return res.status(400).json({ message: "There is no entry matching the id" });
      }

      const {
         description = entryToBeUpdated.description,
         status = entryToBeUpdated.status,
      } = req.body;

      const updatedEntry = await Entry.findByIdAndUpdate(id, {
         description,
         status
      }, { runValidators: true, new: true });

      await db.disconnect();
      res.status(200).json(updatedEntry);
   } catch (err) {
      await db.disconnect();
      console.error(err);

      res.status(500).json({ message: "Something went wrong at updating an entry, review server console" });
   }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
   const { id } = req.query;

   try {
      await db.connect();
      const entry = await Entry.findById(id);

      if (!entry) {
         await db.disconnect();
         return res.status(400).json({ message: "There is no entry matching the id" });
      }

      await db.disconnect();
      res.status(200).json(entry);
   } catch (err) {
      await db.disconnect();
      console.error(err);

      res.status(500).json({ message: "Something went wrong at updating an entry, review server console" });
   }
};

const deleteEntry = async(req: NextApiRequest, res: NextApiResponse) => {
   const { id } = req.query;

   try {
      await db.connect();
      const deletedEntry = await Entry.findByIdAndDelete(id);

      if (!deleteEntry) {
         await db.disconnect();
         return res.status(400).json({ message: "There is no entry matching the id" });
      }

      await db.disconnect();
      res.status(200).json(deletedEntry);
   } catch (err) {
      await db.disconnect();
      console.error(err);

      res.status(500).json({ message: "Something went wrong at deleting an entry, review server console" });
   }
};