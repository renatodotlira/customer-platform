import sequelize from './infrastructure/database';
import app from './infrastructure/express';

const PORT = process.env.PORT || 3000;
console.log(`Server is starting`);
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

