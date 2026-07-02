export const createServerFn = ({ method }: any) => {
  let v: any = undefined;
  const instance = {
    validator: (validatorFn: any) => {
      v = validatorFn;
      return instance;
    },
    handler: (handlerFn: any) => {
      return async (args: any) => {
        let parsed = args;
        if (v && args && args.data) {
          parsed = { data: await v(args.data) };
        } else if (v) {
          parsed = { data: await v(args) };
        }
        return handlerFn(parsed || {});
      };
    }
  };
  return instance;
};

export const useServerFn = (fn: any) => fn;

export const createMiddleware = () => ({
  server: (cb: any) => cb,
  client: (cb: any) => cb,
});

export const getRequest = () => new Request("http://localhost/");

export const createStart = () => null;
