const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', options);

export default formatDate;
