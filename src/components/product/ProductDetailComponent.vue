<template>
    <div class="row border-1 p-2">
        <div class="col-2 text-left">{{ product.category.name }}</div>
        <div class="col-2 text-left">{{ product.subCategory.name }}</div>
        <div class="col-2 text-left">{{ product.name }}</div>
        <div class="col-4 text-left">{{ product.description }}</div>
        <div class="col-2">
            <router-link
                    :to="{ name: 'ProductEdit', params: { id: product.id } }"
                    class="btn btn-primary"
                    title="Edit Product"
            >
                <i class="fa fa-pencil"></i>
            </router-link>
            <button class="btn btn-danger mx-2" @click="deleteProductModal(product.id)" title="Delete Product">
                <i class="fa fa-trash"></i>
            </button>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "ProductDetail",
        props: {
            product: {
                type: Object,
            },
        },

        computed: {...mapGetters(["isDeleting"])},

        methods: {
            ...mapActions(["deleteProduct", "fetchAllProducts"]),
            deleteProductModal(id) {
                this.$swal
                    .fire({
                        text: "Are you sure to delete the product ?",
                        icon: "error",
                        cancelButtonText: "Cancel",
                        confirmButtonText: "Yes, Confirm Delete",
                        showCancelButton: true,
                    })
                    .then((result) => {
                        if (result["isConfirmed"]) {
                            // Put delete logic
                            this.deleteProduct(id);
                            this.fetchAllProducts();
                            this.$swal.fire({
                                text: "Success, Product has been deleted.",
                                icon: "success",
                                position: 'center',
                                timer: 2000,
                            });
                        }
                    });
            },
        },
    };
</script>
