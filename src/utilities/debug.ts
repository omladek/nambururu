const debug = (args: unknown): void => {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(args)
  }
}

export default debug
