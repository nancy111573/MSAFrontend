import { emojis } from "./emojis";

// export default function handler(req, res) {
//   res.status(200).json(favouriteEmojis);
// }

export default function handler(req, res) {
  res.status(200)
    .json(emojis)
}