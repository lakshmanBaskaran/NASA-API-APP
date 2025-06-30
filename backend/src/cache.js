import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 * 30 }); // 30 min
export default cache;
