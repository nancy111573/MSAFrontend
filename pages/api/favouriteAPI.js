import { favouriteEmojis } from "./favouriteEmojis";

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
    const newEmoji = {
      name,
      unicode,
      character
    }
    favouriteEmojis.push(newEmoji)
    res.status(201)
      .json(newEmoji)
  }
}