import { favouriteEmojis } from "./favouriteEmojis";

// export default function handler(req, res) {
//   res.status(200).json(favouriteEmojis);
// }

export default function handler(req, res) {
  const {
    emojiName
  } = req.query
  if (req.method === 'GET') {
    res.status(200)
      .json(favouriteEmojis)
  } else if (req.method === 'POST') {
    const name = req.body.name
    const unicode = req.body.unicode
    const character = req.body.character
    const newBook = {
      name,
      unicode,
      character
    }
    favouriteEmojis.push(newBook)
    res.status(201)
      .json(newBook)
  }
}