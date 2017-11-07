let users = []
let count = 0
users.pushUser = (name)=> {
    users.push({
        name: name,
        id: count,
    });
    count++;
}