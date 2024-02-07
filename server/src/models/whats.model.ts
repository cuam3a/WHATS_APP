import { Schema, model } from "mongoose";
import { Whats } from "../../../types/types";

const WhatsSchema = new Schema<Whats>(
  {
    total: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: {
      currentTime: () => {
        let date = new Date();
        let newDate = new Date(
          date.getTime() + date.getTimezoneOffset() * 60 * 1000 * -1
        );
        return newDate;
      },
    },
  }
);

const WhatsModel = model("whats", WhatsSchema);
export default WhatsModel;
