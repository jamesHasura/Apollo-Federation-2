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
  },
  {
    id: '2',
    title: 'Coffee Maker',
    description: null,
    price: 1000,
    categoryId: '2',
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
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

server.listen({ port: 4001 }).then(() => {
  debug('service started');
});
