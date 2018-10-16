export class NgxsEntityStateModel<T> {
  public ids: number[];
  public entities: { [id: number]: T };
  public selected: number | null;

  static initialState() {
    return {
      ids: [],
      entities: {},
      selected: null
    };
  }
}
