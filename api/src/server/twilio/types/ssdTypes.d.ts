type ssdNext = {
  state?: string;
  process?: string;
};

type ssdProcess = {
  validation?: ValidationChain;
  prompt?: Function;
  action?: Function;
  next?: ssdNext;
};

type ssdState = {
  [k: string]: ssdProcess;
};

type ssdStates = {
  [k: string]: ssdState;
};
