import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import ProductMock from '../../mocks/ProductMock';
import app from '../../../src/app'; 

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return 201 and the created product', async function () {
    sinon.stub(ProductModel, 'create').resolves(ProductModel.build(ProductMock.validProductDB));

    const response = await chai.request(app).post('/products').send(ProductMock.validProduct);
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(ProductMock.validProductDB);
  });

  it('should return 422 and error message when name is empty', async function () {
    const response = await chai.request(app).post('/products').send(ProductMock.emptyProductName);
   
    expect(response.status).to.be.equal(422);
    expect(response.body).to.be.deep.equal({ message: '"name" is not allowed to be empty' });
  });

  it('should return 400 and error message when name is missing', async function () {
    const response = await chai.request(app).post('/products').send(ProductMock.productSemNome);
   
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: '"name" is required' });
  });
});
