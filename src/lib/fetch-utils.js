const checkStatus = res => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    const error = new Error(res.statusText);
    error.res = res;
    throw error;
  }
};

const parseJSON = res => res.json();

module.exports = {
  checkStatus,
  parseJSON
};
