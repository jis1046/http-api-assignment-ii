const users = {

};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with header
  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users: Object.values(users),
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getUserMeta = (request, response) => respondJSONMeta(request, response, 200);

const addUser = (request, response, body) => {
  // default json message
  const responseJSON = {
    message: 'Name and age are both required',
    id: 'missingParams',
  };

  if (!body.name || !body.age) {
    respondJSON.id = 'missingParams';
    // 400 status code if the request is missing a name, age, or both
    return respondJSON(request, response, 400, responseJSON);
  }
  // status code if user updated
  let responseCode = 204;

  if (!users[body.name]) {
    // status code if adding new user
    responseCode = 201;
    users[body.name] = {};
  }

  // add or update fields for this user
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  // 204 status code
  return respondJSONMeta(request, response, responseCode);
};

/* const updateUser = (request, response) => {
  users[newUser.createdAt] = newUser;

  return respondJSON(request, response, 201, newUser);
}; */

const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  // return 404 status code with error message
  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  getUsers,
  getUserMeta,
  addUser,
  notFound,
  notFoundMeta,
};
