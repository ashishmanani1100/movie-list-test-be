const bcrypt = require('bcryptjs');

module.exports = {
  async up(db) {
    await db.collection('users').insertOne({
      email: 'test@gmail.com',
      password: await bcrypt.hash('Michael@1234', 8),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    });
  },

  async down(db) {
    await db.collection('users').deleteMany({ email: 'test@gmail.com' });
  }
};
