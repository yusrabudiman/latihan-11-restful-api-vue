<template>
    <div>
        <div class="field">
            <label class="label">Product Name</label>
            <div class="control">
                <input type="text" class="input" placeholder="Product Name" v-model="productName"/>
            </div>
        </div>
        <div class="field">
            <label class="label">Product Price</label>
            <div class="control">
                <input type="text" class="input" placeholder="Price" v-model="productPrice"/>
            </div>
        </div>
        <div class="control">
            <button class="button is-warning" @click="updateProduct">UPDATE</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "ProductEdit",
    data() {
        return {
            productName: "",
            productPrice: "",
        };
    },
    created: function () {
        this.getProductById();
    },
    methods: {
        async getProductById() {
            try {
                const response = await axios.get(`http://localhost:3000/api/products/${this.$route.params.id}`);
                this.productName = response.data.response[0].product_name;
                this.productPrice = response.data.response[0].product_price;
            } catch (err) {
                console.log(err);
            }
        },
        async updateProduct() {
            try {
                await axios.put(`http://localhost:3000/api/products/${this.$route.params.id}`,{
                    product_name: this.productName,
                    product_price: this.productPrice,
                });
                this.productName = "";
                this.productPrice = "";
                this.$router.push("/");
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>

<style>
</style>