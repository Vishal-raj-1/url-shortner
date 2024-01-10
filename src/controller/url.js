import URL from "../model/url.js"
import { nanoid } from 'nanoid';

export const handleRedirectShortId = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (result) {
        result.visitedHistory.push();
        const entry = await URL.findOneAndUpdate({ shortId }, {
            $push: {
                visitedHistory: {
                    timestamp: Date.now()
                }
            }
        })
        res.redirect(entry.url);
    }
};

export const handlePostURL = async (req, res) => {
    if (!req.body.url) {
        return res.status(400);
    }

    const shortId = nanoid(8);
    const result = await URL.create({ shortId, url: req.body.url });
    return res.render("home", {
        shortId: result.shortId
    })
}

export const handleGetURL = async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls
    });
}
