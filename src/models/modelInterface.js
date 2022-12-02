'use strict';

class ModelInterface {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    try {
      let record = await this.model.create(json);
      return record;
    } catch(e) {
      console.error('ModelInterface create error', e);
      return e;
    }
  }

  async read(id = null) {
    try {
      let record;
      if(id) {
        record = await this.model.findByPk(id);
      } else {
        record = await this.model.findAll();
      }
      return record;
    } catch(e) {
      console.error('ModelInterface read error', e);
      return e;
    }
  }

  async update(json, id) {
    try {
      await this.model.update(json, { where: { id }});
      return this.read(id);
    } catch(e) {
      console.error('ModelInterface update error', e);
    }
  }

  async delete(id) {
    try {
      await this.model.destroy({ where: { id } });
      return null;
    } catch(e) {
      console.error('ModelInterface delete error', e);
    }
  }
}

module.exports = ModelInterface;