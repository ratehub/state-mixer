const combinationsWithoutZero = require('combinations');


const combinations = actions =>
  actions.length > 0
    ? [[]].concat(combinationsWithoutZero(actions))
    : [[]];


module.exports = function stateMixer(create, options = {}) {
  const createArgs = options.createArgs || [[]];
  const actionSequences = combinations(options.actions || []);

  const states = [];

  createArgs.forEach(args => {
    actionSequences.forEach(sequence => {
      const init = create.apply(null, args);
      const final = sequence.reduce(
        (state, action) => action(state),
        init);
      states.push(final);
    });
  });

  return states;
};
