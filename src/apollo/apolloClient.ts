import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_KEY;

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${supabaseUrl}/graphql/v1`,
    headers: {
      apikey: supabaseAnonKey,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
