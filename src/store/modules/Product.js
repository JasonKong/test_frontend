import axios from 'axios';

// initial state
const state = () => ({
    categories: [],
    products: [],
    product: null,
    isCreating: false,
    createdData: null,
    isUpdating: false,
    updatedData: null,
    isDeleting: false,
})

// getters
const getters = {
    categories: state => state.categories,
    productList: state => state.products,
    product: state => state.product,
    isCreating: state => state.isCreating,
    isUpdating: state => state.isUpdating,
    createdData: state => state.createdData,
    updatedData: state => state.updatedData,
    isDeleting: state => state.isDeleting,
};

// actions
const actions = {

    async fetchAllCategories({commit}) {
        const query = '{ categories{id,name} }'
        await axios.post(
            process.env.VUE_APP_BACKEND_API_URL, {
                query: query
            })
            .then(res => {
                const categories = res.data.data.categories;
                commit('setCategories', categories);
            }).catch(err => {
                    console.log('error', err);
                }
            );
    },

    async fetchAllProducts({commit}, filter = null) {
        let search = '';
        if (filter !== null) {
            search = filter.search;
        }

        let query = ''
        if (search !== '') {
            query = '{ products(category_id:' + search +
                '){id,category_id,name,description,category{name}} }'
        } else {
            query = '{ products{id,category_id,name,description,category{name}} }'
        }

        await axios.post(
            process.env.VUE_APP_BACKEND_API_URL, {
                query: query
            })
            .then(res => {
                const products = res.data.data.products;
                commit('setProducts', products);
            }).catch(err => {
                    console.log('error', err);
                }
            );
    },

    async fetchDetailProduct({commit}, id) {

        await axios.post(`${process.env.VUE_APP_BACKEND_API_URL}`, {
            query: '{ product(id:' + id + '){id,category_id,name,description} }'
        })
            .then(res => {
                commit('setProductDetail', res.data.data.product);
            }).catch(err => {
                console.log('error', err);
            });
    },

    async storeProduct({commit}, product) {
        commit('setProductIsCreating', true);

        let query = 'mutation {createProduct(category_id:' + product.category_id + ',name:"' + product.name +
            '",description:"' + product.description + '") { id,category_id,name,description,category{name}}}';

        await axios.post(
            `${process.env.VUE_APP_BACKEND_API_URL}`,
            {query: query})
            .then(res => {
                commit('saveNewProducts', res.data.data.createProduct);
                commit('setProductIsCreating', false);
            }).catch(err => {
                console.log('error', err);
                commit('setProductIsCreating', false);
            });
    },

    async updateProduct({commit}, product) {
        commit('setProductIsUpdating', true);

        let query = 'mutation {updateProduct(id:' + product.id + 'category_id:' + product.category_id + ',name:"' + product.name +
            '",description:"' + product.description + '") { id,category_id,name,description,category{name}}}';

        await axios.post(`${process.env.VUE_APP_BACKEND_API_URL}`, {
            query: query
        })
            .then(res => {
                commit('saveUpdatedProduct', res.data.data.updateProduct);
                commit('setProductIsUpdating', false);
            }).catch(err => {
                console.log('error', err);
                commit('setProductIsUpdating', false);
            });
    },


    async deleteProduct({commit}, id) {
        commit('setProductIsDeleting', true);

        let query = 'mutation {deleteProduct(id:' + id + ') }';

        await axios.post(`${process.env.VUE_APP_BACKEND_API_URL}`, {
            query: query
        })
            .then(() => {
                commit('setDeleteProduct', id);
                commit('setProductIsDeleting', false);
            }).catch(err => {
                console.log('error', err);
                commit('setProductIsDeleting', false);
            });
    },

    updateProductInput({commit}, e) {
        commit('setProductDetailInput', e);
    }
}

// mutations
const mutations = {

    setCategories: (state, categories) => {
        state.categories = categories
    },

    setProducts: (state, products) => {
        state.products = products
    },

    setProductDetail: (state, product) => {
        state.product = product
    },

    setDeleteProduct: (state, id) => {
        state.products.filter(x => x.id !== id);
    },

    setProductDetailInput: (state, e) => {
        let product = state.product;
        product[e.target.name] = e.target.value;
        state.product = product
    },

    saveNewProducts: (state, product) => {
        state.products.unshift(product)
        state.createdData = product;
    },

    saveUpdatedProduct: (state, product) => {
        state.products.unshift(product)
        state.updatedData = product;
    },

    setProductIsCreating(state, isCreating) {
        state.isCreating = isCreating
    },

    setProductIsUpdating(state, isUpdating) {
        state.isUpdating = isUpdating
    },

    setProductIsDeleting(state, isDeleting) {
        state.isDeleting = isDeleting
    },

}

export default {
    // namespaced: true,
    state,
    getters,
    actions,
    mutations
}
