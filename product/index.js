const { buildSubgraphSchema } = require('@apollo/subgraph');
const { ApolloServer } = require('apollo-server');
const Debug = require('debug');
const { typeDefs } = require('./schema');

const debug = Debug('product');

const products = [
  {
    id: '1',
    title: 'Blender',
    description: null,
    price: 40,
    categoryId: '2',
    userId: 1,
  },
];

const categories = [
  {
    id: '2',
    title: 'Kitchen tools',
  },
];

const resolvers = {
  Query: {
    product: (_, { id }) => {
      debug(`resolving product by id '${id}'`);
      return products.find((product) => product.id === id);
    },
  },
  Product: {
    category(product) {
      debug(
        `resolving product category for product '${JSON.stringify(product)}'`
      );
      return categories.find((category) => category.id === product.categoryId);
    },
    user(product) {
      debug(`resolving product user for product '${JSON.stringify(product)}'`);
      return { __typename: 'user', id: product.userId };
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port: 4001 }).then(() => {
  debug('service started');
});
