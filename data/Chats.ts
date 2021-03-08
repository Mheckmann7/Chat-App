export default {
    id: '1',
    users: [{
        id: 'u1',
        name: 'User One',
        imageUri: 'TestImg',
    }, {
        id: 'u2',
        name: 'User Two',
        imageUri: 'TestImg2',
    }],
    messages: [{
        id: 'm1',
        content: 'How are you?',
        createdAt: '2020-11-05T08:15:30-05:00',
        user: {
            id: 'u1',
            name: 'User One',
        },
    }, {
        id: 'm2',
        content: 'How are you?',
        createdAt: '2020-11-05T08:15:30-05:00',
        user: {
            id: 'u2',
            name: 'User Two',
        },
    }]
}