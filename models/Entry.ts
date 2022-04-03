import mongoose, { Model, Schema }  from "mongoose";
import { Entry } from "../interfaces";
export interface IEntry extends Entry {}

const entrySchema = new Schema({
   description: { type: String, required: true },
   createdAt: { type: Number },
   status: {
      type: String,
      enum: {
         values: ["to-do", "in-progress", "completed"],
         message: "{VALUE} is not an allowed state"
      },
      default: "to-do",
   },
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;