const bcrypt = require('bcryptjs');

module.exports = {
  async up(db) {
    await db.collection('users').insertOne({
      email: 'dummyuser1@gmail.com',
      password: await bcrypt.hash('Test@1234', 8),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
    await db.collection('users').insertOne({
      email: 'dummyuser2@gmail.com',
      password: await bcrypt.hash('Test@1234', 8),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
  },

  async down(db) {
    await db.collection('users').deleteMany({ email: 'dummyuser1@gmail.com' });
    await db.collection('users').deleteMany({ email: 'dummyuser2@gmail.com' });
  },
};
