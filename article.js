const { distance, closest } = require('fastest-levenshtein');

async function getClosestString(event) {
  const { input, list_cmp } = event;
  // We get the closest string
  const closest_string = closest(input, list_cmp);
  return {
    input,
    closest_string,
    distance: distance(input, closest_string), // We return the distance to the closest string
  };
}

exports.handler = async function handler(event) {
  // We wrap the results in an object stating if the everything went as expected
  if (!event.input || !event.list_cmp) {
    return {
      success: false,
      message: 'You must provide `input` and `list_cmp` parameters',
    };
  }
  return {
    success: true,
    data: await getClosestString(event),
  };
};

// The code below allows you to check what your function returns
(async () => {
  console.log(await getClosestString({
    input: 'Yep',
    list_cmp: ['Yes', 'No'],
  }));
})();
