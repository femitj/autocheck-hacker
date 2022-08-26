export interface Item {
  readonly by: String;
  readonly descendants: String;
  readonly kids: Number[];
  readonly id: BigInteger;
  readonly score: Number;
  readonly time: Date;
  readonly title: String;
  readonly type: String;
  readonly url: String;
}
