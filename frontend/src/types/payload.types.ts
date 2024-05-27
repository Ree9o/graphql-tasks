export type Payload = {
  email: string;
  sub: number;
  iat: number; //tokenが作成されたタイムスタンプ
  exp: number; // tokenの有効期限
};
