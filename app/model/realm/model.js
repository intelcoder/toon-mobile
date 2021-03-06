
const Model = (realm) => {
  const state = {
    realm: realm
  };
  return {
    create: create(state),
    bulkCreate: bulkCreate(state),
    getById: getById(state),
  }
};

const create = (state) => {
  return (schemaName, data) => {
      state.realm.write(()=> {
        state.realm.create(schemaName, data);
      });
  }
};

const bulkCreate = (state) => {
  return (schemaName, listOfData) => {
    state.realm.write(()=> {
      listOfData.forEach((list)=> {
        state.realm.create(schemaName, list);
      });
      console.log("Done  bulkCreatebulkCreate")
    })
  }
};

const getById = (state) => {
  return (schemaName, field, id) => {
    return state.realm.objects(schemaName).filtered('$0==$1',field, id)[0]
  }
};

export default Model;