export class OwnEvent {
  id: number;
  title = '';
  start = '';
  end = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
