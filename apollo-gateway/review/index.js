const { buildSubgraphSchema } = require('@apollo/subgraph');
const { ApolloServer } = require('apollo-server');
const Debug = require('debug');
const { typeDefs } = require('./schema');

const debug = Debug('product');

const reviews = [
  {
    id: '1',
    productId: '1',
    content: 'The best blender',
    rating: 4.5,
    userId: 1,
  },
  {
    id: '2',
    productId: '1',
    content: 'The best best blender',
    rating: 5.0,
    userId: 2,
  },
];

const resolvers = {
  Product: {
    reviews(product) {
      debug(`resolving product reviews by product ${JSON.stringify(product)}`);
      return reviews.filter((review) => review.productId === product.id);
    },
  },
  Review: {
    users(review) {
      return [{ __type: 'user', id: review.userId }]; // return the user object)};
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port: 4002 }).then(() => {
  debug('service started');
});
