export const adminSeedData = {
    _id: '6669ae07d7e8c75dbf061ff1',
    name: "Saraan Asim",
    email: "saraanofficial@gmail.com",
    password: "asdfasdf",
    isAdmin: true,
    bio: "The admin of everything",
}

export const seedGroups = [
    {
        chatName: 'Group Chat 1',
        isGroup: true,
        groupAdmin: adminSeedData._id
    },
    {
        chatName: 'Group Chat 2',
        isGroup: true,
        groupAdmin: adminSeedData._id
    },
    {
        chatName: 'Group Chat 3',
        isGroup: true,
        groupAdmin: adminSeedData._id
    },
    {
        chatName: 'Group Chat 4',
        isGroup: true,
        groupAdmin: adminSeedData._id
    },
    {
        chatName: 'Group Chat 5',
        isGroup: true,
        groupAdmin: adminSeedData._id
    },
];

