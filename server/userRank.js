// business logic for counting chattiest user

const userRank = (content) => {
    let usersObject = {}; //to count their chat words
    let currentUser = "undefine user";
    content.split(/\s+/g).forEach((word) => {
        word.match(/<\S+>/g)
            ? (currentUser = word.slice(1, -1))
            : (usersObject[currentUser] =
                  (usersObject[currentUser] || 0) + (word !== "" && 1));
    });

    let sortable = [];
    for (var user in usersObject) {
        sortable.push({
            id: Math.floor(Math.random() * 100000),
            user,
            count: usersObject[user],
        });
    }
    sortable.sort((a, b) => {
        return b.count - a.count;
    });
    return sortable;
};

module.exports = { userRank };
