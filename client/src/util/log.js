const log = (txt, data = null) => {
  if (import.meta.env.DEV) {
    console.log(txt, data);
  }
};

export default log;
