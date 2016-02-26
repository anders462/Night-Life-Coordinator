var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);



describe('API/BARS', function() {

  it('should respond with 200 ok', function(done) {
  chai.request(server)
    .get('/api/bars')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    })
});

    it('should respond with 401 unauthorized', function(done) {
    chai.request(server)
      .post('/api/bars')
      .end(function(err, res){
        res.should.have.status(401);
        done();
      })
});

});
