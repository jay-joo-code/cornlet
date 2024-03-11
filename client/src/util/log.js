const log = (txt, data = null) => {
  if (import.meta.env.NODE_ENV === 'development') {
    console.log(txt, data);
  }
};

export default log;
