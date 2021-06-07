import { createStore } from 'vuex';
import product from './modules/Product';

const Store = createStore({
  modules: {
    product
  },
})

export default Store;
