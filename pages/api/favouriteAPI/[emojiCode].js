import { favouriteEmojis } from "../favouriteEmojis";

export default function handler(req, res) {
    const {
        emojiCode
    } = req.query
    if (req.method === 'GET') {
        const emoji = favouriteEmojis.find(emoji => emoji.unicode === emojiCode)
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        res.status(200)
            .json(emoji)
    } else if (req.method === 'DELETE') {
        const deletedemoji = favouriteEmojis.find(
            emoji => emoji.unicode === emojiCode
        )
        if (deletedemoji !== null) {
            const index = favouriteEmojis.findIndex(
                emoji => emoji.unicode === emojiCode
            )
            favouriteEmojis.splice(index, 1)
        }
        res.status(200)
        .json(deletedemoji);
    }
}