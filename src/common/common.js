
const postOption = (body, method = 'post') => {
  return {
    method,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  }
};

export {postOption};
