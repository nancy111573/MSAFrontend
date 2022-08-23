import { favouriteEmojis } from "../favouriteEmojis";

export default function handler(req, res) {
    const {
        emojiName
    } = req.query
    if (req.method === 'GET') {
        const book = favouriteEmojis.find(book => book.name === emojiName.toString())
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        res.status(200)
            .json(book)
    } else if (req.method === 'DELETE') {
        const deletedbook = favouriteEmojis.find(
            book => book.name === emojiName.toString()
        )
        const index = favouriteEmojis.findIndex(
            book => book.name === emojiName.toString()
        )
        favouriteEmojis.splice(index, 1)
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        res.status(200)
            .json(deletedbook)
    }
}