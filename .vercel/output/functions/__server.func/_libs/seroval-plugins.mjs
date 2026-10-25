import { c as createPlugin } from "./seroval.mjs";
const READABLE_STREAM_FACTORY = {};
const READABLE_STREAM_FACTORY_CONSTRUCTOR = (stream) => new ReadableStream({ start(controller) {
  stream.on({
    next(value) {
      try {
        controller.enqueue(value);
      } catch (_error) {
      }
    },
    throw(value) {
      controller.error(value);
    },
    return() {
      try {
        controller.close();
      } catch (_error) {
      }
    }
  });
} });
const ReadableStreamFactoryPlugin = /* @__PURE__ */ createPlugin({
  tag: "seroval-plugins/web/ReadableStreamFactory",
  test(value) {
    return value === READABLE_STREAM_FACTORY;
  },
  parse: {
    sync() {
      return READABLE_STREAM_FACTORY;
    },
    async async() {
      return await Promise.resolve(READABLE_STREAM_FACTORY);
    },
    stream() {
      return READABLE_STREAM_FACTORY;
    }
  },
  serialize() {
    return READABLE_STREAM_FACTORY_CONSTRUCTOR.toString();
  },
  deserialize() {
    return READABLE_STREAM_FACTORY;
  }
});
function toAsyncIterable(value) {
  return { [Symbol.asyncIterator]() {
    const reader = value.getReader();
    let active = true;
    let reading = false;
    const release = () => {
      try {
        reader.releaseLock();
      } catch {
      }
    };
    return {
      async next() {
        if (!active) return {
          done: true,
          value: void 0
        };
        reading = true;
        let result;
        try {
          result = await reader.read();
        } catch (error) {
          reading = false;
          release();
          if (!active) return {
            done: true,
            value: void 0
          };
          active = false;
          throw error;
        }
        reading = false;
        if (!active || result.done) {
          active = false;
          release();
          return {
            done: true,
            value: void 0
          };
        }
        return result;
      },
      return(reason) {
        if (active) {
          active = false;
          try {
            reader.cancel(reason).catch(() => {
            });
          } catch {
          }
          if (!reading) release();
        }
        return Promise.resolve({
          done: true,
          value: void 0
        });
      }
    };
  } };
}
const ReadableStreamPlugin = /* @__PURE__ */ createPlugin({
  tag: "seroval/plugins/web/ReadableStream",
  extends: [ReadableStreamFactoryPlugin],
  skipPlainObjects: true,
  test(value) {
    if (typeof ReadableStream === "undefined") return false;
    return value instanceof ReadableStream;
  },
  parse: {
    async async(value, ctx) {
      return {
        factory: await ctx.parse(READABLE_STREAM_FACTORY),
        stream: await ctx.parseStreamSource(toAsyncIterable(value))
      };
    },
    stream(value, ctx) {
      return {
        factory: ctx.parse(READABLE_STREAM_FACTORY),
        stream: ctx.parseStreamSource(toAsyncIterable(value))
      };
    }
  },
  serialize(node, ctx) {
    return "(" + ctx.serialize(node.factory) + ")(" + ctx.serialize(node.stream) + ")";
  },
  deserialize(node, ctx) {
    const stream = ctx.deserialize(node.stream);
    return READABLE_STREAM_FACTORY_CONSTRUCTOR(stream);
  }
});
export {
  ReadableStreamPlugin as R
};
