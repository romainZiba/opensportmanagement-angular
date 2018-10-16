export class NgxsEntityAdapter {
  static addAll(collection: any[], context, keyField = "id") {
    const entities = collection.reduce((object, item) => {
      object[item[keyField]] = item;
      return object;
    }, {});
    const ids = collection.map(item => item[keyField]);

    context.patchState({
      ...context.getState(),
      entities,
      ids
    });
  }

  static addOne(entity: any, context, keyField = "id") {
    context.patchState({
      ...context.getState(),
      entities: {
        ...context.getState().entities,
        [entity[keyField]]: entity
      }
    });
  }

  static updateOne(entity: any, context, keyField = "id") {
    context.patchState({
      entities: {
        ...context.getState().entities,
        [entity[keyField]]: {
          ...entity
        }
      }
    });
  }

  static removeOne(entity: any, context, keyField = "id") {
    const entityCloned = Object.assign({}, context.getState().entities);
    delete entityCloned[entity[keyField]];

    context.patchState({
      ...context.getState(),
      entities: {
        ...entityCloned
      }
    });
  }

  static select(entity: any, context) {
    context.patchState({
      selected: entity
    });
  }

  static startLoading(context) {
    context.patchState({
      isLoading: true
    });
  }

  static stopLoading(context) {
    context.patchState({
      isLoading: false
    });
  }

  static getItemsFromEntities(entities: any) {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
}
