const app = require('./app');
const sequelize = require('./models');

const PORT = process.env.PORT || 3000;

// Sync database and start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
