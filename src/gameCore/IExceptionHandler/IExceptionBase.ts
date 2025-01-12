export interface IExceptionBase {
  readonly type: string;
  readonly key: string;
  readonly msg: string;
}
