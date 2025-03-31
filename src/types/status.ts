export interface Setting {
  email: string;
  enable: boolean;
  expiryTime: number;
  flow: string;
  id: string;
  reset: number;
  subId: string;
  tgId: string;
  totalGB: number;
}

export interface Stat {
  id: number;
  inboundId: number;
  enable: boolean;
  email: string;
  up: number;
  down: number;
  expiryTime: number;
  total: number;
  totalUsed: number;
  inboundRemark: string;
  online: boolean;
}

export interface FrontEnd {
  expiryTime: string;
  expiryTimeShort: string;
  down: string;
  up: string;
  totalUsed: string;
  total: string;
  trafficRemaining: string;
  email: string;
  status: boolean;
  infoText: string;
}

export interface Result {
  hash: string;
  protocol: string;
  setting: Setting;
  stat: Stat;
  FrontEnd: FrontEnd;
  connect_link: string;
}

export type StatusResponse = {
  ok: true;
  result: Result;
};

export type Status = StatusResponse;
