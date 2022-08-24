const datacontroller = require('../controller/dataController');

module.exports = (app) => {
  app.get('/config-data', datacontroller.getAllData);
  app.get('/update/:id', datacontroller.getData);
  app.post('/update', datacontroller.updateData);
  app.delete('/delete/:id', datacontroller.deleteData);
}