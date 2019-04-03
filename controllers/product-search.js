const algoliasearch = require('algoliasearch')
const client = algoliasearch('0NMEYF15P1', '712fb0c14159120f0ecba8c1a60bf686')
const index = client.initIndex('shop')


exports.search = (req, res) => {
    if (req.query.query) {
        index.search({
            query: req.query.query,
            page: req.query.page
        }, (err, content) => {
            if (err) return err

            return res.status(200).json({
                success: true,
                content: content,
                search_result: req.query.query
            })
        })
    }
}