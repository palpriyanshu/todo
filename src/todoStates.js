const DUE = 'due';
const DOING = 'doing';
const DONE = 'done';

const getNextStatus = function (currentStatus) {
  const nextStatus = {
    [DUE]: DOING,
    [DOING]: DONE,
    [DONE]: DUE,
  };

  return nextStatus[currentStatus];
};

const getDefaultStatus = () => DUE;

module.exports = { getNextStatus, getDefaultStatus };
