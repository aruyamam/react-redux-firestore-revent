import sampleData from './sampleData';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchSampleData = () => delay(1000).then(() => Promise.resolve(sampleData));

export default fetchSampleData;
