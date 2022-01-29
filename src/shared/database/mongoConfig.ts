const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE, MONGO_PASS, MONGO_USER } = process.env;

const uri = `mongodb://${MONGO_USER}:${encodeURIComponent(MONGO_PASS)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`;


export default {
  uri
}
