module.exports = {
    SELECT_USER_BY_KEY: (params) => {
        return `SELECT * FROM user WHERE (uid="${params.uid}")`
    },
}
